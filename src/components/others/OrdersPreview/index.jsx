import React from 'react'
import Button from '../Button'
import { useInsertDocuments } from '../../../hooks/useInsertDocuments'
import { useMainContext } from '../../../context/MainContext'
import { useNavigate } from 'react-router-dom'

const OrdersPreview = ({name, numWords, numPages, value, multipler, deadline}) => {
  const [state, actions] = useMainContext()
  const navigate = useNavigate()
  const valueResult = value * multipler
  const {insertFiles} = useInsertDocuments("archives")


  const handleClick = async () => {
    const files = state.filePending
    const names = []

    for (let index = 0; index < files.length; index++) {
      const file = files[index];
      names.push(file.name)
    }

    const cartItems = {
      names,
      numWords,
      numPages,
      typeService: name,
      deadline,
      languageSetings: state.selectValues,
      value: valueResult.toFixed(2),
      user: state.user,
      paymentInfos: {
        id_payment: '',
        statusURL: '',
        statusPayment: '', 
      }
    }

    await actions.changeCartItems(cartItems)

    navigate('/checkout')
  }

  return (
    <div className='order-card-preview'>
        <h2>{name}</h2>
        <p>Diferencial:</p>
        <p>Prazo de entrega:</p>
        {deadline?.days} dia e {deadline?.hours} horas
        <p>Numero de palavras:{numWords} </p>
        <span>Valor da tradução: {valueResult.toFixed(2)} &euro;</span>
        {state.filePending.length === 0 && 'adicione um arquivo para fazer o pedido'}
        {state.filePending.length !== 0 && <Button handleClick={handleClick} text={'Pedido'}/> }
    </div>
  )
}

export default OrdersPreview