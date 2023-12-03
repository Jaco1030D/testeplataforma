import { pdfjs } from 'react-pdf';
import { DOMParser } from "@xmldom/xmldom";
import pdfjsWorker from 'pdfjs-dist/build/pdf.worker.entry';
import PizZip from 'pizzip';

pdfjs.GlobalWorkerOptions.workerSrc = pdfjsWorker;

export const useCalculateValue = () => {

    const getTextFromPDF = async (FilePDF) => {
        return new Promise((resolve, reject) => {

            const reader = new FileReader();
        
            reader.onloadend = async function () {

              try {

                const typedArray = new Uint8Array(reader.result);

                const pdf = await pdfjs.getDocument(typedArray).promise;

                let fullText = '';

                const numPages = pdf.numPages
        
                for (let i = 1; i <= numPages; i++) {

                  const page = await pdf.getPage(i);

                  const content = await page.getTextContent();

                  fullText += content.items.map((s) => s.str).join(' ');

                }
                
                console.log(fullText);
                resolve({fullText, numPages});

              } catch (error) {

                reject(error);

              }

            };
        
            reader.readAsArrayBuffer(FilePDF);

          });

    }

    function str2xml(str) {
      if (str.charCodeAt(0) === 65279) {
        str = str.substr(1);
      }
      return new DOMParser().parseFromString(str, "text/xml");
    }

    const getTextFromDocx = async (FileDOCX) => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onloadend = async function (e) {
          try {
            const zip = new PizZip(e.target.result);
            const xml = str2xml(zip.files["word/document.xml"].asText());
            const numPages = xml.getElementsByTagName('w:lastRenderedPageBreak').length + 1;

            const paragraphsXml = xml.getElementsByTagName("w:p");
            const paragraphs = [];
            for (let i = 0, len = paragraphsXml.length; i < len; i++) {
              let fullText = "";
              const textsXml = paragraphsXml[i].getElementsByTagName("w:t");
              for (let j = 0, len2 = textsXml.length; j < len2; j++) {
                const textXml = textsXml[j];
                if (textXml.childNodes) {
                  fullText += textXml.childNodes[0].nodeValue;
                }
              }
              if (fullText) {
                paragraphs.push(fullText);
              }
            }

            const fullText = paragraphs.join(' ')

            resolve({fullText, numPages})
          } catch (error) {
            reject(error)
          }
        }

        reader.readAsArrayBuffer(FileDOCX);
      })
    }

    const getCountWord = (text) => {

      const textWithoutPunctuation = text.replace(/[^a-zA-Z ]/g, "");

      let countWords = textWithoutPunctuation.trim().split(/\s+/).length;

      return countWords

    }    

    const getNumWordsDOCX = async (FileDOCX) => {
      const {fullText, numPages} = await getTextFromDocx(FileDOCX)

      const numWords = await getCountWord(fullText)

      return {numWords, numPages}
    }
    const getNumWordsPDF = async (FilePDF) => {
      const {fullText, numPages} = await getTextFromPDF(FilePDF)

      const numWords = await getCountWord(fullText)

      return {numWords, numPages}
    }
    const calculateValues = (numWords, originLanguage, languagesTarget) => {
      let value = 0

      languagesTarget.forEach(element => {

        // const valueTranslation = getValueTranslation(originLanguage, element, languages, valueWords)

        const valueFinally = calculateValue(numWords, 0.11)

        value += valueFinally
      
      });
      
      return value
    }

    const getValueTranslation = (origin, translated, languagesArray, value) => {
      for (const subArray of languagesArray) {
        for (const obj of subArray) {
          if (obj.origin === origin && obj.translated === translated) {
            return obj.value || value;
          }
        }
      }
    }

    const calculateValue = (numWords, valueWord) => {
      return numWords * valueWord
    }

    const getExtension = (file) => {
      const name = file.name

      const fileNameParts = name.split('.');

      const extension = fileNameParts[fileNameParts.length - 1]

      const nameWithout = fileNameParts[0]

      return {nameWithout, extension}
    }
    return {
        getCountWord,
        getTextFromPDF,
        getNumWordsPDF,
        getTextFromDocx,
        getNumWordsDOCX,
        calculateValues,
        getExtension
    }
}