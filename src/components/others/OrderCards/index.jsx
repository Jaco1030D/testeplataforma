import React, { useEffect, useState } from 'react'
import { useUpdateDocument } from '../../../hooks/useUpdateDocument'
import axios from 'axios'
import { useMainContext } from '../../../context/MainContext'

const apiUrl = 'https://api.stripe.com/v1/checkout/sessions/'

const token = 'sk_test_51OF205HR5yfE4YaFBUT1a4yatFHaX5PYhlFa4mpqRSadaqYngNuWDm9lBqQSgTykKZx519Xb4fMcFn1dZthlKgrK00AwSyXZQx'

const OrdersCards = ({orders, admin = false}) => {
  const [state] = useMainContext()
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

  
  const calculateDates = (days, hours) => {

    const date = new Date();

    const initialDate = new Date(date)

    const finalDate = new Date(date)

    finalDate.setDate(finalDate.getDate() + days)

    finalDate.setHours(finalDate.getHours() + hours)

    return {initialDate: initialDate.toLocaleString(), finalDate: finalDate.toLocaleString()}
  }

  useEffect(() => {
    if (orders.paymentInfos.statusURL === 'open') {
      fetch(apiUrl+orders.paymentInfos.id_payment, {
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
          const {initialDate, finalDate} = calculateDates(orders.deadline?.days, orders.deadline?.hours)
          if (payment_status === 'paid') {
            // const teste = {paymentInfos: {...orders.paymentInfos, statusPayment: payment_status, statusURL: status, url: null, datePayment: initialDate, dateDelivery: finalDate}}
            updateDocument(orders.id, {paymentInfos: {...orders.paymentInfos, statusPayment: payment_status, statusURL: status, url: null, datePayment: initialDate, dateDelivery: finalDate}})
            axios.post("/.netlify/functions/sendEmail", {
                name: state.user.displayName,
                email: state.user.email,
                order: orders,
                fromUser: true,
                finalized: false
            })
            axios.post("/.netlify/functions/sendEmail", {
                name: state.user.displayName,
                email: state.user.email,
                order: orders,
                fromUser: false,
                finalized: false
            })

            // updateDocument(orders.id, {statusPayment: payment_status, status, initialDate: initialDate.toLocaleString(), finalDate: finalDate.toLocaleString() })
            
          } else {
            // updateDocument(orders.id, {statusPayment: payment_status, status })

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
    <h2>#Tradução profissional {orders.numOrder}</h2>
    <hr />
    De
    <p>{orders.languageSetings.origin}</p>
    para
    <div>{orders.languageSetings.translation.map((language, index) => (
      <p key={index} >{language}</p>
    ))}</div>
    <hr />
    <p>{orders.numWords}</p>
    <p>{orders.numPages}</p>
    <p>Prazo: {orders.deadline?.days} dias {orders.deadline?.hours ? `e ${orders.deadline?.hours} horas` : ''}</p>
    {orders.paymentInfos.datePayment && <p>Data pagamento: {orders.paymentInfos.datePayment}</p>}
    {orders.paymentInfos.dateDelivery && <p>Data entrega: {orders.paymentInfos.dateDelivery}</p>} 
    <p>Arquivos para tradução:</p>
    {orders.archivesURL.map((item, index) => (

    <p key={index} onClick={() => handleClick(item.downloadArchive, item.fileName)} style={{cursor: 'pointer', color: 'blue'}}>{item.fileName}</p>
    ))}
    {orders.paymentInfos.statusPayment !== "paid" ? <p>Ainda não pago</p> : <p>Ja pago</p>}
    {!admin && orders.paymentInfos.statusPayment !== "paid" && orders.paymentInfos.statusURL !== "expired" && <button><a href={orders.paymentInfos.url}>Pagar</a></button>}
    {orders.archivesTranslated && <p>Arquivos ja Traduzidos:</p>}
    {orders?.archivesTranslated && orders.archivesTranslated.map(item => (
      <>
      <p style={{cursor: 'pointer', color: 'blue'}} onClick={() => handleClick(item.downloadArchive, item.fileName)}>{item.fileName.slice(0, 10)}</p>
      <br />
      </>
    ))}
    </div>
  )
}

export default OrdersCards