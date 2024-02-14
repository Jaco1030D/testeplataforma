import React from 'react'
import './style.css'
import FormArchive from '../FormArchive'

const LeftContainerMain = () => {
  return (
    <div className='main_left'>
      <div className="texts_left">
        <h2 className='title_left_container'>Plataforma de Tradução <span>Online</span> </h2>

        <p className='subtitle_left_container'>Orçamento em 5 segundos, preencha as 3 informações abaixo.</p>
      </div>
      <FormArchive />
    </div>
  )
}

export default LeftContainerMain