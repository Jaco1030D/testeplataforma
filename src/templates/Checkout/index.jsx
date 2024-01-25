import React, { useEffect, useState } from 'react'
import { useMainContext } from '../../context/MainContext'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useInsertDocuments } from '../../hooks/useInsertDocuments'
import { useFetchDocuments } from '../../hooks/useFetchDocuments'
import OrderResume from '../../components/others/OrderResume'
import './style.css'
import PaymentSection from '../../components/others/PaymentSection'

const Checkout = ({name}) => {
  const [state, actions] = useMainContext()
  const [textLoading, setTextLoading] = useState(0)
  const [loading, setLoading] = useState(false)
  const {insertDocument, insertFiles} = useInsertDocuments("archives")
  const [archivesURL, setArchivesURL] = useState()
  const [newDocument, setNewDocument] = useState()
  const {documents: last_order} = useFetchDocuments("archives", null, null, false, true)

  console.log(archivesURL);


  const navigate = useNavigate()
  const cartInitial = state.cart

  const cart = {
    ...cartInitial,
    user: {...state.user, displayName: state.user.displayName || name}
  }
  console.log(cart);
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

      // setTextLoading(30)

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
      //   archivelink:downloadArchi ve,
      //   status: response?.data.status,
      //   numOrder: last_order[0]?.numOrder ? last_order[0].numOrder + 1 : 2963,
      //   statusPayment: response?.data.paymentStatus,
      //   uid: state.user.uid
      // })

      // setTextLoading(100)

    } catch (error) {
      console.log(error);
    }  
  }

  // useEffect(() => {
  //   uploadMultipleArchives(state.filePending).then(res =>
  //     setArchivesURL(res)
  //     )
  // },[state.filePending])

  return (
    <div>
      {/* <h2>Detalhes do Carrinho</h2>
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
      <button onClick={handleClick}>Pagar</button> */}
      <div className="checkout-main">
        <PaymentSection value={cart.value} archivesURL={archivesURL} setArchivesURL={setArchivesURL} setDocument={setNewDocument} handleClick={handleClick} />

        <OrderResume archiveURL={archivesURL} handleSubmitValues={handleClick} deadline={cart.deadline} arrayValues={cart.arrayValuesLanguage} archiveType={state.archiveTypeSelected.name} numWords={cart.numWords} typeService={cart.typeService} finalDate={cart.finalDate} translation={cart.languageSetings.translation} origin={cart.languageSetings.origin} value={cart.value} />
      </div>
      <div className="checkout-footer">
        <p>2008 - 2024 Magma Translation<span>TM</span> Todos os Direitos Reservados </p>
      </div>
    </div>
  )
}

export default Checkout