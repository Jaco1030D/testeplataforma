import React, { useEffect, useRef, useState } from 'react'
import upload from './upload.svg'
import './style.css'
import button from './Button.svg'
import { useMainContext } from '../../../context/MainContext'

const InputDrop = ({handleClose}) => {
    const [state, actions] = useMainContext()
    const [numArchives, setNumArchives] = useState(0)
    const [messageError, setMessageError] = useState()
    const input = useRef()
    const handleFileChange = (e) => {
        const files = e.target.files
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

  return (
    <div className="destinoidiomas">
      <div className="div">
      <div className="content-div">
        <div className="itens-div">

            <label htmlFor='file' className='pointer'> 
                <p>Busque no computador ou arraste e solte arquivos aqui</p>

                <img src={upload} alt="upload-img" className='img-upload' />
            </label>
            Adicionados: {numArchives}
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