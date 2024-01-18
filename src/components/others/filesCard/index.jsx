import React, { useEffect, useState } from 'react'
import { getDeadLine, getNumWordsArchive } from '../../../hooks/useCalculateValue'
import { useMainContext } from '../../../context/MainContext'
import Button from '../Button'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useInsertDocuments } from '../../../hooks/useInsertDocuments'
import { useFetchDocuments } from '../../../hooks/useFetchDocuments'
import { calculateValues } from '../../../utils'

const FileCard = () => {
    const [state] = useMainContext()
    const file = state.filePending[0]
    const [nameFile, setNameFile] = useState()
    const [numWords, setNumWords] = useState(1000)
    const [numPages, setNumPages] = useState(10)
    const [deadline, setDeadline] = useState()
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
            deadline,
            value,
            archiveType: state.archiveTypeSelected,
            archivelink:downloadArchive,
            status: response?.data.status,
            numOrder: last_order[0]?.numOrder ? last_order[0].numOrder + 1 : 2963,
            statusPayment: response?.data.paymentStatus,
            uid: state.user.uid
          })

          const { url } = response.data;
          
          window.location = url;

          setTextLoading(100)

        } catch (error) {
          console.log(error);
          setMessageError("Ocorreu um erro, tente novamente mais tarde")
        }
    }

    useEffect(() => {
      if (file) {
        
        getNumWordsArchive(file).then(res => {
            setNameFile(res.nameWithout)
            setNumWords(res.numWords)
            setNumPages(res.numPages)
        })
      } else {
        setNumWords(1000)
        setNumPages(10)
      }
    },[file])

    useEffect(() => {

      const deadline = getDeadLine(state.deadlines?.baseDeadline, state.deadlines?.numWords, state.deadlines?.numHours, numWords)

      setDeadline(deadline)

    },[state.deadlines, numWords])

    useEffect(() => {

      const value = calculateValues(numWords, state.selectValues, state.defaultValue, state.languageCombinations, state.archiveTypeSelected)

      console.log(value);

      setValue(value)

    },[numWords, state.selectValues, state.languageCombinations, state.defaultValue, state.archiveTypeSelected])

  return (
    <div className="archive-conatiner">
      {loading && <h2>Carregando...</h2>}
      {loading && <h3>{textLoading}%</h3>}
      <p>{file ? file.name : 'Trad'}</p>
      <p>{numWords}</p>
      <p>{numPages}</p>
      <p>{state.archiveTypeSelected.name}</p>
      <p>{deadline?.days} dias {deadline?.hours ? `e ${deadline?.hours} horas` : ''}</p>
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