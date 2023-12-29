import React, { useEffect, useState } from 'react'
import { calculateValues, getNumWordsArchive } from '../../../hooks/useCalculateValue'
import { useMainContext } from '../../../context/MainContext'
import Button from '../Button'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useInsertDocuments } from '../../../hooks/useInsertDocuments'
import { useFetchDocuments } from '../../../hooks/useFetchDocuments'

const FileCard = () => {
    const [state] = useMainContext()
    const file = state.filePending[0]
    const [nameFile, setNameFile] = useState()
    const [numWords, setNumWords] = useState()
    const [numPages, setNumPages] = useState()
    const [loading, setLoading] = useState(false)
    const [textLoading, setTextLoading] = useState(0)
    const [value, setValue] = useState()
    const [messageError, setMessageError] = useState('')
    const navigate = useNavigate()
    const {insertDocument, insertFiles} = useInsertDocuments("archives")
    const {documents: last_order} = useFetchDocuments("archives", null, null, false, true)

    const handleClick = async () => {
        try {
          setLoading(true)
          setTextLoading(0)
          const response = await axios.post("/.netlify/functions/api", {
            email: state.user.email,
            items: [
              {
                name: nameFile,
                numWords,
                numPages,
                value: Math.round(value * 100),
                deadlines: state.deadlines,
                origin: state.selectValues.origin,
                translation: state.selectValues.translation.join(", "),
                quantity: 1,
              },
            ],

          });

          setTextLoading(30)
          
          const downloadArchive = await insertFiles(file)

          setTextLoading(80)

          await insertDocument({
            id_payment: response?.data.sessionId,
            file: file.name,
            numWords,
            numPages,
            language_origin: state.selectValues.origin,
            language_translation: state.selectValues.translation,
            deadlines: state.deadlines,
            value,
            archiveType: state.archiveTypeSelected,
            archivelink:downloadArchive,
            status: response?.data.status,
            numOrder: last_order[0]?.numOrder ? last_order[0].numOrder + 1 : 1,
            statusPayment: response?.data.paymentStatus,
            uid: state.user.uid
          })

          const { url } = response.data;
          
          window.location = url;

          setTextLoading(100)

        } catch (error) {
          setMessageError("Ocorreu um erro, tente novamente mais tarde")
        }
    }

    useEffect(() => {
        getNumWordsArchive(file).then(res => {
            setNameFile(res.nameWithout)
            setNumWords(res.numWords)
            setNumPages(res.numPages)
        })
    },[file])

    useEffect(() => {

      const value = calculateValues(numWords, state.selectValues.origin, state.selectValues.translation)

      setValue(value)

    },[numWords, state.selectValues])

  return (
    <div className="archive-conatiner">
      {loading && <h2>Carregando...</h2>}
      {loading && <h3>{textLoading}%</h3>}
      <p>{file.name}</p>
      <p>{numWords}</p>
      <p>{numPages}</p>
      <p>{state.archiveTypeSelected}</p>
      <p>{state.deadlines}</p>
      <p>{state.selectValues.origin}</p>
      <p>{state.selectValues.translation}</p>
      <p>{value}&euro;</p>
      {state.user === null ? (
        <Button handleClick={() => navigate('/register')} text={'se cadastre para continuar'}/>
      ) : (
      <button onClick={handleClick}>Pagar</button>
      )}
      {messageError && <h2>{messageError}</h2>}
      
    </div>
  )
}

export default FileCard