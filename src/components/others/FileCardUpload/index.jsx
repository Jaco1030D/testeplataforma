import React, { useEffect, useState } from 'react'
import './style.css'
import { useInsertDocuments } from '../../../hooks/useInsertDocuments'
import { getNumWordsArchive } from '../../../hooks/useCalculateValue'
import { useMainContext } from '../../../context/MainContext'

const FileCardUpload = ({file, functionsExecuted, setFunctionsExecuted}) => {
  const name = file.name
  const [state, action] = useMainContext()
  const [progressBar, setProgressBar] = useState(0)
  const [numWords, setNumWords] = useState()
  const [numPages, setNumPages] = useState()
  const [downloadArchive, setDownloadArchive] = useState()
  const {insertFiles} = useInsertDocuments('archives')
  const [multipler, setMultipler] = useState(0.8)
  const progressCallback = (value) => {
    setProgressBar(parseInt(value))
  }
  useEffect(() => {
    
    const isFileUpload = state.fileUpload.find(files => files.name === file.name)

    console.log(isFileUpload);
    if (isFileUpload && state.fileUpload.length === state.filePending.length) {
      setMultipler(1)
      setProgressBar(100)
      setNumWords(isFileUpload.numWords)
      return
    } else {
      setMultipler(0.8)
      setProgressBar(0)
      action.resetUploadFiles()
    }

    getNumWordsArchive(file, progressCallback).then(res => {
      setNumWords(res.numWords)
      setNumPages(res.numPages)
    })

    insertFiles(file).then(res => {
      setMultipler(1)
      setDownloadArchive(res)
    })

    setFunctionsExecuted(true)
    
    
  }, [file])

  useEffect(() => {
    const isFileUpload = state.fileUpload.find(files => files.name === file.name)
    if (isFileUpload) {
      return
    }

    if (downloadArchive && numWords) {
      action.changeUploadFiles({
        downloadArchive,
        name: file.name,
        numWords,
        numPages
      })
    }

  }, [numWords, downloadArchive])

  return (
    // <div className='fileCardUpload'>
    //   <p>{numWords}</p>
    //     <span>{file.name}</span>
    //     <progress value={progressBar * multipler} max={100} ></progress>
    // </div>
    <section className='progress-area'>
      <li className="row">
        <i className="fas fa-file-alt"></i>
        <div className="content">
          <div className="details">
            <span className="name">{name.length > 30 ? `${name.substring(0, 30)}...` : name}</span>
            <span className="percent">{parseInt(progressBar * multipler)}%</span>
          </div>
          <div className="progress-bar">
            <div className="progress" style={{width: `${parseInt(progressBar * multipler)}%`}}></div>
          </div>
          {progressBar * multipler === 100 && <span>Palavras {numWords}</span>}
          
        </div>
      </li>
    </section>
  )
}

export default FileCardUpload