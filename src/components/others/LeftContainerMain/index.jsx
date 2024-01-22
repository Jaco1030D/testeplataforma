import React from 'react'
import './style.css'
import FormArchive from '../FormArchive'

const LeftContainerMain = () => {
  return (
    <div className='main_left'>
      <div className="texts_left">
        <h2 className='title_left_container'>Plataforma de tradução <span>online</span> </h2>

        <p className='subtitle_left_container'>Antes de mergulharmos nos pormenores, conte-nos um pouco sobre o seu projeto</p>
      </div>
      <FormArchive />
    </div>
  )
}

export default LeftContainerMain