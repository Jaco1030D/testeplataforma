import React, { useEffect, useState } from 'react'
import { getInfos } from '../../../hooks/useCalculateValue'
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
    const [value, setValue] = useState()
    const navigate = useNavigate()
    const {insertDocument, insertFiles} = useInsertDocuments("archives")
    const {documents: last_order} = useFetchDocuments("archives", null, null, false, true)



    const handleClick = async () => {
        try {

          const response = await axios.post("/.netlify/functions/api", {

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
          
          const downloadArchive = await insertFiles(file)

          await insertDocument({
            id_payment: response.data.sessionId,
            file: file.name,
            numWords,
            numPages,
            language_origin: state.selectValues.origin,
            language_translation: state.selectValues.translation,
            deadlines: state.deadlines,
            value,
            archivelink:downloadArchive,
            status: response.data.status,
            numOrder: last_order[0].numOrder ? last_order[0].numOrder + 1 : 1,
            statusPayment: response.data.paymentStatus,
            uid: state.user.uid
          })
    
          const { url } = response.data;
          window.location = url;

        } catch (error) {
          console.error(error.response.data.error || error.message);
        }
    }

    useEffect(() => {
        getInfos(file, state.selectValues.origin, state.selectValues.translation).then(res => {
            setNameFile(res.nameWithout)
            setNumWords(res.numWords)
            setNumPages(res.numPages)
            setValue(res.value)
        })
    },[state, file])

  return (
    <div className="archive-conatiner">
      <p>{file.name}</p>
      <p>{numWords}</p>
      <p>{numPages}</p>
      <p>{state.selectValues.origin}</p>
      <p>{state.selectValues.translation}</p>
      <p>{value}</p>
      {state.user === null ? (
        <Button handleClick={() => navigate('/register')} text={'se cadastre para continuar'}/>
      ) : (
      <button onClick={handleClick}>Pagar</button>
      )}
    </div>
  )
}

export default FileCard