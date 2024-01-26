import React from 'react'
import './style.css'
import { useNavigate, useParams } from 'react-router-dom'

const OrderResume = ({deadline, translation, origin, value, finalDate, typeService, numWords, archiveType, arrayValues, handleSubmitValues, archiveURL}) => {
  const {id} = useParams()
  const navigate = useNavigate()

  const handleClick = async () => {
    if (!id) {
      await handleSubmitValues()
    }
    navigate('/')
  }
  return (
    <div className='checkout-rigth'>
        <div className="content-checkout-rigth">
        <h2 className='title-rigth-container'>Resumo do pedido</h2>

<div className="languages-resume">
  <div className="item-resume title-item-resume">Idiomas</div>
  <div className="item-resume">De {origin} para:</div>
  {translation.map((item, index) => (

  <div key={item} className="item-resume"><p className='language-item'>{item}</p> <p>{arrayValues[index].toFixed(2)}</p></div>
  ))}
  <div className="item-resume"><p className='total-item-resume'>TOTAL</p> <p>{value}</p></div>

</div>

<div className="deadline">
  <div className="item-resume">
    <p className='title-item-resume' >Prazo</p> <p>{finalDate}h</p>
  </div>
</div>

<div className="data-documents">
  <div className="item-resume title-item-resume">Dados</div>
  <div className="item-resume"><p>Modalidade</p> <p className='title-item-resume' >{typeService}</p></div>
  <div className="item-resume"><p>Número de palavras</p> <p>{numWords}</p></div>
  <div className="item-resume"><p>Area do arquivo</p> <p>{archiveType}</p></div>
</div>

<button className='btn-back' onClick={handleClick} disabled={!archiveURL && !id}>Retornar para etapa anterior</button>
        </div>
    </div>
  )
}

export default OrderResume