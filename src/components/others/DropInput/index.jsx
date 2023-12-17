import React, { useEffect, useRef, useState } from 'react'
import { AiOutlineCloudUpload } from 'react-icons/ai';
import './styles.css';
import { useMainContext } from '../../../context/MainContext';

const DropIntput = ({ inputsValue}) => {
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
    useEffect(() => {
      setNumArchives(state.filePending.length)
    },[state.filePending])
  return (
    <div className="input file fileDrop" onDragOver={(e) => e.preventDefault()} onDrop={handleDrop}>
        <label htmlFor='file'>
        <AiOutlineCloudUpload id='icon' />
        Adicione seus arquivos:
        </label>
        Adicionados: {numArchives}
        <input ref={input} onDragOver={(e) => e.preventDefault()} type="file" id='file' name='archive8' onDrop={handleDrop} onChange={handleFileChange} accept=".pdf, .docx"/>
        {state.selectValues.origin === "" && <p>Selecione o idima de origem</p>}
        {state.selectValues.translation.length === 0 && <p>Selecione o idioma da tradução</p>}
        {messageError && <div>{messageError}</div>}
    </div>
  )
}

export default DropIntput