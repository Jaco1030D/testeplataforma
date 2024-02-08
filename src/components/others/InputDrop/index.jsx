import React, { useEffect, useRef, useState } from 'react'
import upload from './upload.svg'
import './style.css'
import button from './Button.svg'
import { useMainContext } from '../../../context/MainContext'
import { getNumWordsArchive, getNumWordsPDF } from '../../../hooks/useCalculateValue'
import { useInsertDocuments } from '../../../hooks/useInsertDocuments'
import FileCardUpload from '../FileCardUpload'

const InputDrop = ({handleClose}) => {
    const [state, actions] = useMainContext()
    const [numArchives, setNumArchives] = useState(0)
    const [messageError, setMessageError] = useState()
    const {insertFiles} = useInsertDocuments('archives')
    const [numWords, setNumWords] = useState()
    const input = useRef()
  const [functionsExecuted, setFunctionsExecuted] = useState(false);
    const [percent, setPercent] = useState(0.8)
    const progressCallback = (value) => {
      setNumWords(parseInt( value ))
    } 
    // function progressCallback(params) {
    //   console.log(params);
    // }
    const handleFileChange = async (e) => {
        const files = e.target.files
        // if (files[0]) {
        //   setPercent(0.8)
        //   setNumWords(0)
          
        //   insertFiles(files[0]).then(res => {
        //     console.log(res);
        //     setPercent(1)
        //   })
          
        //   const {numPages, numWords} = await getNumWordsArchive(files[0], progressCallback)

        //   console.log(numWords);
        // }
        actions.changeFiles(files)
    }
    const handleDrop = (e) => {
      e.preventDefault()
      setMessageError('')
      if (e.dataTransfer.files.length > 0) {
        const acceptedFiles = Array.from(e.dataTransfer.files).filter(file =>
          file.name.toLowerCase().endsWith('.pdf') || file.name.toLowerCase().endsWith('.docx')
        );
      
        if (acceptedFiles.length > 0) {
          const newFileList = new DataTransfer();
          acceptedFiles.forEach(file => newFileList.items.add(file));
      
          input.current.files = newFileList.files;
          e.target.files = newFileList.files;
      
          actions.changeFiles(acceptedFiles);

        } else {
          setMessageError('Apenas arquivos .pdf ou .docx são permitidos.');
        }
      }
    }
    const handleReset = () => {
        actions.changeFiles([])
    }
    useEffect(() => {
      setNumArchives(state.filePending.length)
    },[state.filePending])
    console.log(state.filePending);

  return (
    <div className="destinoidiomas">
      <div className="div">
      <div className="content-div">

        {state.filePending.length > 0 && Array.from(state.filePending).map((file) => (
            <FileCardUpload functionsExecuted={functionsExecuted} setFunctionsExecuted={setFunctionsExecuted} file={file} />
          ))}

        <div className="itens-div" onDragOver={(e) => e.preventDefault()} onDrop={handleDrop}>
          
            <label htmlFor='file' className='pointer'> 
                <p>Busque no computador ou arraste e solte arquivos aqui</p>

                <img src={upload} alt="upload-img" className='img-upload' />
            </label>
            Adicionados: {state.filePending.length}
            <input ref={input} style={{display: 'none'}} onDragOver={(e) => e.preventDefault()} type="file" id='file' name='archive8' onDrop={handleDrop} onChange={handleFileChange} multiple accept=".pdf, .docx"/>
        </div>
      </div>
      <div className="busca">
        <img className="img pointer" alt="Button" onClick={handleClose} src={button} />
      </div>
      
      <div className="botoes">
          <div className="botaoresetar">
            <div className="text-wrapper pointer" onClick={handleReset}>Resetar</div>
          </div>
          <div className="button pointer" onClick={handleClose}>
            <div className="text-wrapper-2 drop" >Concluido</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default InputDrop