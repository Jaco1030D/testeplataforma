import React, { useEffect, useState } from 'react'
import { useMainContext } from '../../context/MainContext'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useInsertDocuments } from '../../hooks/useInsertDocuments'
import { useFetchDocuments } from '../../hooks/useFetchDocuments'

const Checkout = () => {
  const [state, actions] = useMainContext()
  const [textLoading, setTextLoading] = useState(0)
  const [loading, setLoading] = useState(false)
  const {insertDocument, insertFiles} = useInsertDocuments("archives")
  const [archivesURL, setArchivesURL] = useState()
  const {documents: last_order} = useFetchDocuments("archives", null, null, false, true)


  console.log(archivesURL);

  const navigate = useNavigate()
  const cartInitial = state.cart

  const cart = {
    ...cartInitial,
    user: state.user
  }
  const uploadMultipleArchives = async (files) => {
    const arrayArchive = []

    for (let index = 0; index < files.length; index++) {

        const downloadArchive = await insertFiles(files[index])

        arrayArchive.push({downloadArchive, fileName: files[index].name})
        
    }

    return arrayArchive
  }

  const handleClick = async () => {
    try {
      setLoading(true)
      setTextLoading(0)
      const response = await axios.post("/.netlify/functions/api", {
        email: state.user.email,
        items: [
          {
            name: cart.names,
            numWords: cart.numWords,
            numPages: cart.numPages,
            value: Math.round(cart.value * 100),
            deadlines: state.deadlines,
            origin: state.selectValues.origin,
            translation: state.selectValues.translation.join(", "),
            quantity: 1,
          },
        ],

      });

      // setTextLoading(30)

      const newDocument = {
        ...cart, 
        numOrder: last_order[0]?.numOrder ? last_order[0].numOrder + 1 : 2963,
        paymentInfos: {
          id_payment: response?.data.sessionId,
          statusURL: response?.data.status,
          statusPayment: response?.data.paymentStatus,
          url: response?.data.url
        },
        uid: cart.user.uid ,
        finalized: false,
        archivesURL
      }

      await insertDocument(newDocument)

      // setTextLoading(80)

      // await insertDocument({
      //   id_payment: response?.data.sessionId,
      //   file: file.name,
      //   numWords,
      //   numPages,
      //   language_origin: cart.selectValues.origin,
      //   language_translation: cart.selectValues.translation,
      //   deadline,
      //   value,
      //   archiveType: state.archiveTypeSelected,
      //   archivelink:downloadArchive,
      //   status: response?.data.status,
      //   numOrder: last_order[0]?.numOrder ? last_order[0].numOrder + 1 : 2963,
      //   statusPayment: response?.data.paymentStatus,
      //   uid: state.user.uid
      // })

      const { url } = response.data;

      console.log(url);
      
      window.location = url;

      // setTextLoading(100)

    } catch (error) {
      console.log(error);
    }  
  }

  useEffect(() => {
    uploadMultipleArchives(state.filePending).then(res =>
      setArchivesURL(res)
      )
  },[state.filePending])

  return (
    <div>
      <h2>Detalhes do Carrinho</h2>
      <button onClick={() => navigate('/')}>Editar Pedido</button>
      <ul>
        <li><strong>Nomes:</strong> {cart.names}</li>
        <li><strong>Numero de arquivos:</strong> {cart.names.length}</li>
        <li><strong>Número de Palavras:</strong> {cart.numWords}</li>
        <li><strong>Número de Páginas:</strong> {cart.numPages}</li>
        <li><strong>Tipo de Serviço:</strong> {cart.typeService}</li>
        <li><strong>Prazo:</strong> {cart.deadline.days} dias e {cart.deadline.hours} horas</li>
        <li><strong>Caso pagamento seja feito agora:</strong> {cart.finalDate}h</li>
        <li><strong>Configurações de Idioma:</strong> {cart.languageSetings.origin}</li>
        <li><strong>Valor:</strong> {cart.value}</li>
      </ul>
      <button onClick={handleClick}>Pagar</button>
    </div>
  )
}

export default Checkout