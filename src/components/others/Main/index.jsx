import React, { useState } from 'react'
import LeftContainerMain from '../LeftContainerMain'
import RigthContainerMain from '../RigthContainerMain'
import OrdersPreview from '../OrdersPreview'
import { useMainContext } from '../../../context/MainContext'
import OrdersContainer from '../ordersContainer'
import './style.css'

const Main = () => {
    const [state, actions] = useMainContext()

  return (
    <div className='main_hero'>
        <div className="hero-section">
        <LeftContainerMain />
        <RigthContainerMain />
        </div>
        {
        state.showValues &&
        state.archiveTypeSelected.name !== 'Área certificada' &&
        <OrdersContainer /> 
        }
        {
          state.archiveTypeSelected.name === 'Área certificada' && <p>Não trabalhamos com essa conteudo ainda</p>
        }
    </div>
  )
}

export default Main