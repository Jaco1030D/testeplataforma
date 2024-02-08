import { pdfjs } from 'react-pdf';
import { DOMParser } from "@xmldom/xmldom";
import pdfjsWorker from 'pdfjs-dist/build/pdf.worker.entry';
import PizZip from 'pizzip';
import axios from 'axios';
import * as XLSX from 'xlsx';


pdfjs.GlobalWorkerOptions.workerSrc = pdfjsWorker;

const getTextFromPDF = (FilePDF, progressCallback) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onloadend = async function () {
      try {
        const typedArray = new Uint8Array(reader.result);
        const pdf = await pdfjs.getDocument(typedArray).promise;
        let fullText = '';
        const numPages = pdf.numPages;

        let currentPage = 1;

        const processNextPage = async () => {
          if (currentPage <= numPages) {
            const page = await pdf.getPage(currentPage);
            const content = await page.getTextContent();
            fullText += content.items.map((s) => s.str).join(' ');

            const progress = (currentPage / numPages) * 100;
            progressCallback(progress);

            currentPage++;
            // Chama a próxima página na próxima iteração
            setTimeout(processNextPage, 0);
          } else {
            // Todas as páginas foram processadas, resolve a Promise
            resolve({ fullText, numPages });
          }
        };

        // Inicia o processamento da primeira página
        processNextPage();
      } catch (error) {
        reject(error);
      }
    };

    reader.readAsArrayBuffer(FilePDF);
  });
};

// const getTextFromPDF = (FilePDF, progressCallback) => {

//     return new Promise((resolve, reject) => {

//         const reader = new FileReader();
    
//         reader.onloadend = async function () {

//           try {

//             const typedArray = new Uint8Array(reader.result);

//             const pdf = await pdfjs.getDocument(typedArray).promise;

//             let fullText = '';

//             const numPages = pdf.numPages
    
//             for (let i = 1; i <= numPages; i++) {

//               const page = await pdf.getPage(i);

//               const content = await page.getTextContent();

//               fullText += content.items.map((s) => s.str).join(' ');

//               const progress = (i / numPages) * 100;

//               progressCallback(progress)

//               // console.log(progress + ' progresso 1');

//             }
            
//             // console.log(fullText);
//             resolve({fullText, numPages});

//           } catch (error) {

//             reject(error);

//           }

//         };

//         reader.addEventListener('progress', (event) => {
//           if (event.lengthComputable) {
//             const percentage = (event.loaded / event.total) * 100;
//             progressCallback(percentage);
//           }
//         });
    
//         reader.readAsArrayBuffer(FilePDF);

//       });

// }

function str2xml(str) {
  if (str.charCodeAt(0) === 65279) {
    str = str.substr(1);
  }
  return new DOMParser().parseFromString(str, "text/xml");
}

// const getTextFromDocx = async (FileDOCX) => {
//   return new Promise((resolve, reject) => {
//     const reader = new FileReader();

//     reader.onloadend = async function (e) {
//       try {
//         const zip = new PizZip(e.target.result);
//         const xml = str2xml(zip.files["word/document.xml"].asText());
//         const numPages = xml.getElementsByTagName('w:lastRenderedPageBreak').length + 1;

//         const paragraphsXml = xml.getElementsByTagName("w:p");
//         const paragraphs = [];
//         for (let i = 0, len = paragraphsXml.length; i < len; i++) {
//           let fullText = "";
//           const textsXml = paragraphsXml[i].getElementsByTagName("w:t");
//           for (let j = 0, len2 = textsXml.length; j < len2; j++) {
//             const textXml = textsXml[j];
//             if (textXml.childNodes) {
//               fullText += textXml.childNodes[0].nodeValue;
//             }
//           }
//           if (fullText) {
//             paragraphs.push(fullText);
//           }
//         }

//         const fullText = paragraphs.join(' ')

//         resolve({fullText, numPages})
//       } catch (error) {
//         reject(error)
//       }
//     }

//     reader.readAsArrayBuffer(FileDOCX);
//   })
// }

const getTextFromDocx = async (FileDOCX, progressCallback) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onloadend = async function (e) {
      try {
        const zip = new PizZip(e.target.result);
        const xml = str2xml(zip.files["word/document.xml"].asText());
        const numPages = xml.getElementsByTagName('w:lastRenderedPageBreak').length + 1;

        const paragraphsXml = xml.getElementsByTagName("w:p");
        const paragraphs = [];

        let currentParagraphIndex = 0;

        const processNextParagraph = async () => {
          if (currentParagraphIndex < paragraphsXml.length) {
            const paragraphXml = paragraphsXml[currentParagraphIndex];
            let fullText = "";
            const textsXml = paragraphXml.getElementsByTagName("w:t");
            for (let j = 0, len2 = textsXml.length; j < len2; j++) {
              const textXml = textsXml[j];
              if (textXml.childNodes) {
                fullText += textXml.childNodes[0].nodeValue;
              }
            }
            if (fullText) {
              paragraphs.push(fullText);
            }
            currentParagraphIndex++;
            const progress = (currentParagraphIndex / paragraphsXml.length) * 100;
            progressCallback(progress);
            // Chama o próximo parágrafo na próxima iteração
            setTimeout(processNextParagraph, 0);
          } else {
            const fullText = paragraphs.join(' ');
            resolve({ fullText, numPages });
          }
        };

        // Inicia o processamento do primeiro parágrafo
        processNextParagraph();
      } catch (error) {
        reject(error);
      }
    };

    reader.readAsArrayBuffer(FileDOCX);
  });
};

function countWordsInXLSX(file, progressCallback) {
  return new Promise((resolve, reject) => {
    const CHUNK_SIZE = 1024 * 1024; // 1MB
    const reader = new FileReader();
    let wordCount = 0;
    let bytesRead = 0;

    reader.onload = function(event) {
      const data = event.target.result;
      const workbook = XLSX.read(data, { type: 'binary' });

      workbook.SheetNames.forEach(sheetName => {
        const worksheet = workbook.Sheets[sheetName];
        const range = XLSX.utils.decode_range(worksheet['!ref']);

        for (let R = range.s.r; R <= range.e.r; ++R) {
          for (let C = range.s.c; C <= range.e.c; ++C) {
            const cellAddress = { r: R, c: C };
            const cellRef = XLSX.utils.encode_cell(cellAddress);
            const cell = worksheet[cellRef];

            if (cell && cell.t === 's') {
              const words = cell.v.split(/\s+/);
              wordCount += words.length;
            }
          }
        }

        if (reader.readyState === FileReader.DONE) {
          resolve({numWords: wordCount, numPages: 0});
        }
      });
    };

    reader.onerror = function(error) {
      reject(error);
    };

    reader.onprogress = function(event) {
      if (event.lengthComputable) {
        bytesRead = event.loaded;
        const progress = Math.min(100, Math.round((bytesRead / file.size) * 100));
        progressCallback(progress);
      }
    };

    reader.readAsBinaryString(file.slice(0, CHUNK_SIZE));
  });
}

const getCountWord = (text) => {

  const textWithoutPunctuation = text.replace(/[^a-zA-Z ]/g, "");

  let countWords = textWithoutPunctuation.trim().split(/\s+/).length;

  return countWords

}    

const getNumWordsDOCX = async (FileDOCX, progressCallback) => {
  const {fullText, numPages} = await getTextFromDocx(FileDOCX, progressCallback)

  console.log(numPages);

  const numWords = await getCountWord(fullText)

  return {numWords, numPages}
}

const getNumWordsPDF = async (FilePDF, funcao) => {
  const {fullText, numPages} = await getTextFromPDF(FilePDF, funcao)

  const numWords = await getCountWord(fullText)

  return {numWords, numPages}
}

const calculateValues = (numWords, originLanguage, languagesTarget) => {
  let value = 0

  languagesTarget.forEach(element => {

    // const valueTranslation = getValueTranslation(originLanguage, element, languages, valueWords)

    const valueFinally = numWords * 0.11

    value += valueFinally
  
  });
  
  return value.toFixed(2)
}

const getExtension = (file) => {
  const name = file.name

  const fileNameParts = name.split('.');

  const extension = fileNameParts[fileNameParts.length - 1]

  const nameWithout = fileNameParts[0]

  return {nameWithout, extension}
}
const getInfos = async (file, originLanguage, languagesTarget) => {

  const {nameWithout, extension} = getExtension(file)

  const {numWords, numPages} = extension === "pdf" ? await getNumWordsPDF(file) : extension === "docx" ? await getNumWordsDOCX(file) : await countWordsInXLSX(file)

  const value = calculateValues(numWords, originLanguage, languagesTarget)

  console.log(value);

  return {nameWithout, numWords, numPages, value}

}
const getNumWordsArchive = async (file, progressCallback) => {

  const {nameWithout, extension} = getExtension(file)

  const {numWords, numPages} = extension === "pdf" ? await getNumWordsPDF(file, progressCallback) : extension === "docx" ? await getNumWordsDOCX(file, progressCallback) : await countWordsInXLSX(file, progressCallback)

  return {nameWithout, numWords, numPages}
}

const getUser = async (uid) => {

  const response = await axios.post("/.netlify/functions/getUser", {
    uid
  })

  return response
}

const downloadPdf = async (downloadURL, name) => {
  const response = await axios.get(downloadURL, { responseType: 'blob' })

    console.log(response);

    const blobUrl = URL.createObjectURL(response.data);

    const link = document.createElement('a');

    link.href = blobUrl;

    link.download = name + '.pdf';

    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);
}

const getDeadLine = (baseDeadLine, numWords, numHours, numWordsArchive) => {

  const hoursCalculated = parseInt(numWordsArchive / numWords) * numHours

  const hoursTotal = hoursCalculated + parseInt(baseDeadLine)

  const days = Math.trunc(hoursTotal / 24)

  const hours = hoursTotal % 24

  return {days, hours}
}

export {
    getNumWordsArchive,
    getTextFromDocx,
    getNumWordsDOCX,
    calculateValues,
    getTextFromPDF,
    getNumWordsPDF,
    getCountWord,
    getExtension,
    getDeadLine,
    getInfos,
    getUser,
}