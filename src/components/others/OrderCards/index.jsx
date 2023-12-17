import React, { useEffect, useState } from 'react'
import { useUpdateDocument } from '../../../hooks/useUpdateDocument'

const apiUrl = 'https://api.stripe.com/v1/checkout/sessions/'

const token = 'sk_test_51OF205HR5yfE4YaFBUT1a4yatFHaX5PYhlFa4mpqRSadaqYngNuWDm9lBqQSgTykKZx519Xb4fMcFn1dZthlKgrK00AwSyXZQx'

const OrdersCards = ({orders, admin = false}) => {
  const {updateDocument} = useUpdateDocument("archives")
  const [url, setUrl] = useState("")

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
          const {url, payment_status, status} = data
          updateDocument(orders.id, {statusPayment: payment_status, status })
          
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
    <a href={orders.archivelink}>arquivo selecionado</a>
    {orders.statusPayment !== "paid" ? <p>Ainda não pago</p> : <p>Ja pago</p>}
    {!admin && orders.statusPayment !== "paid" && orders.status !== "expired" && <button><a href={url}>Pagar</a></button>}
    </div>
  )
}

export default OrdersCards