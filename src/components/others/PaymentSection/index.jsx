import React from 'react'
import './style.css'
import { Teste } from '../../../templates/teste'
import padlock from './padlock.svg'
import padlockbuy from './padlock-buy.svg'
import pci from './pci.svg'
import { useParams } from 'react-router-dom'

const PaymentSection = ({value, setDocument, handleClick, archivesURL, setArchivesURL}) => {
  return (
    <div className='container-payment-section'>
        <h2 className='title-paymant-section'>Pagamento do projeto</h2>
      <Teste value={parseFloat(value)} setDocument={setDocument} handleClick={handleClick} archivesURL={archivesURL} setArchivesURL={setArchivesURL}/>

      <div className="texts">
        <div className="pad-lock">
          <img src={padlock} alt="" />
          <p>O 3D Secure 2 está ativado para o processamento de cartões de crédito. Seu emissor de cartão pode entrar em contato para confirmar seu pedido. Em caso de dúvidas, contate-nos pelo suporte@magmatranslation.com.</p>
        </div>
        <div className="pad-lock-buy">
          <img src={padlockbuy} alt="" />
          <div className="pad-lock-buy-texts">
            <span>Você esta seguro</span>
            <p>Esta é uma plataforma compatível com PCI</p>
          </div>
          <img src={pci} alt="" />
        </div>
      </div>
    </div>
  )
}

export default PaymentSection