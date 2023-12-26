import React, { useEffect, useState } from 'react'
import { useUpdateDocument } from '../../../hooks/useUpdateDocument'
import axios from 'axios'

const apiUrl = 'https://api.stripe.com/v1/checkout/sessions/'

const token = 'sk_test_51OF205HR5yfE4YaFBUT1a4yatFHaX5PYhlFa4mpqRSadaqYngNuWDm9lBqQSgTykKZx519Xb4fMcFn1dZthlKgrK00AwSyXZQx'

const OrdersCards = ({orders, admin = false}) => {
  const {updateDocument} = useUpdateDocument("archives")
  const [url, setUrl] = useState("")

  const handleClick = async (downloadURL, fileName) => {
    const response = await axios.get(downloadURL, { responseType: 'blob' })

    console.log(response);

    const blobUrl = URL.createObjectURL(response.data);

    const link = document.createElement('a');

    link.href = blobUrl;

    link.download = fileName || orders.file;

    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);
  }

  useEffect(() => {
    if (orders.status === 'open') {
      fetch(apiUrl+orders.id_payment, {
        method: 'GET', 
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      })
        .then(response => {
          if (!response.ok) {
            throw new Error(`Erro na requisição: ${response.status} - ${response.statusText}`);
          }
          return response.json();
        })
        .then(data => {
          let deadlines = orders.deadlines === "option1" ? 2 : orders.deadlines === "option2" ? 5 : 9 
          const {url, payment_status, status} = data
          const date = new Date();
          const initialDate = new Date(date)
          const finalDate = new Date(date)
          finalDate.setDate(finalDate.getDate() + deadlines)
          if (payment_status === 'paid') {
            updateDocument(orders.id, {statusPayment: payment_status, status, initialDate: initialDate.toLocaleString(), finalDate: finalDate.toLocaleString() })
            
          } else {
            updateDocument(orders.id, {statusPayment: payment_status, status })

          }
          
          setUrl(url)
        })
        .catch(error => {
          console.error('Erro na requisição:', error);
        });
    }
    
  },[orders])
  return (
    <div>
    <h2>{orders.file}</h2>
    Prazo
    <p>{orders.numOrder}</p>
    <p>{orders.deadlines}</p>
    <hr />
    De
    <p>{orders.language_origin}</p>
    para
    <div>{orders.language_translation.map((language, index) => (
      <p key={index} >{language}</p>
    ))}</div>
    <hr />
    <p>{orders.numWords}</p>
    <p>{orders.numPages}</p>
    <p onClick={() => handleClick(orders.archivelink)} style={{cursor: 'pointer'}}>download arquivo</p>
    {orders.statusPayment !== "paid" ? <p>Ainda não pago</p> : <p>Ja pago</p>}
    {!admin && orders.statusPayment !== "paid" && orders.status !== "expired" && <button><a href={url}>Pagar</a></button>}
    {orders.archivesTranslated && <p>Arquivos ja Traduzidos:</p>}
    {orders?.archivesTranslated && orders.archivesTranslated.map(item => (
      <>
      <p style={{cursor: 'pointer'}} onClick={() => handleClick(item.downloadArchive, item.fileName)}>{item.fileName}</p>
      <br />
      </>
    ))}
    </div>
  )
}

export default OrdersCards