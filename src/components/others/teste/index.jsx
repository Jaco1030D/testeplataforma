import React, { useEffect, useState } from "react";
import "./style.css";
import { calculateValues, getCountWord, getExtension, getNumWordsDOCX, getNumWordsPDF, getTextFromDocx, getTextFromPDF } from '../../../hooks/useCalculateValue';
import { useMainContext } from '../../../context/MainContext';
import Button from '../Button';
import { useNavigate } from 'react-router-dom';
import StripeCheckout from 'react-stripe-checkout';
import { useInsertDocuments } from '../../../hooks/useInsertDocuments';
import axios from 'axios';
// import { getInfos } from '../../../utils';

export const Box = ({file, origin, translated}) => {
  const [state] = useMainContext()
    const [numWords, setNumWords] = useState('Calculando...')
    const [value, setValue] = useState([])
    const [numPages, setNumPages] = useState(0)
    const {nameWithout, extension} = getExtension(file)
    const navigate = useNavigate()
    const {insertDocument, insertFiles} = useInsertDocuments("archives")

    const handleClick = async () => {
        // fetch("/.netlify/functions/api", {
        //   method: "POST",
        //   headers: {
        //     "Content-Type": "application/json",
        //   },
        //   body: JSON.stringify({
        //     items: [
        //       { 
        //         name: file.name, 
        //         numWords, 
        //         numPages, 
        //         value: Math.round(value * 100),
        //         deadlines: state.deadlines, 
        //         origin: state.selectValues.origin,
        //         translation: state.selectValues.translation.join(", "),
        //         quantity: 1
        //       },
        //     ],
        //   }),
        // })
        //   .then(res => {
        //     if (res.ok) return res.json()
            
        //     return res.json().then(json => Promise.reject(json))
        //   })
        //   .then(({ url }) => {
        //     window.location = url
        //   })
        //   .catch(e => {
        //     console.error(e.error)
        //   })
        try {
          const response = await axios.post("/.netlify/functions/api", {
            items: [
              {
                name: file.name,
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
          console.log(response.data);
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
            statusPayment: response.data.paymentStatus,
            uid: state.user.uid
          })
    
          

          const { url } = response.data;
          window.location = url;
        } catch (error) {
          console.error(error.response.data.error || error.message);
        }
    }
    

    const handleToken = (token) => {
      const {id: id_payment} = token

      insertDocument({
        id_payment,
        file: file.name,
        numWords,
        numPages,
        language_origin: state.selectValues.origin,
        language_translation: state.selectValues.translation,
        deadlines: state.deadlines,
        value,
        uid: state.user.uid
      })

      insertFiles(file)

      navigate('/order')
    };
  
    useEffect(() => {
      if (extension === "pdf") {
        getNumWordsPDF(file)
          .then((res) => {
            setNumWords(res.numWords);
            const value = calculateValues(res.numWords, origin, translated);
            setValue(value);
            setNumPages(res.numPages)
          })
          .catch((err) => {
            setNumWords(0);
          });
        } else {

          getNumWordsDOCX(file)
          .then((res) => {
            setNumWords(res.numWords);
            console.log('filho renderizou');
            const value = calculateValues(res.numWords, origin, translated);
            setValue(value);
            setNumPages(res.numPages)
          })
          .catch((err) => {
            setNumWords(0);
          });
      }
    }, [file, origin, translated]);
    useEffect(() => {

    },[])
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
  );
};