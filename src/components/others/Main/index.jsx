import React, { useState } from 'react'
import LeftContainerMain from '../LeftContainerMain'
import RigthContainerMain from '../RigthContainerMain'
import OrdersPreview from '../OrdersPreview'
import { useMainContext } from '../../../context/MainContext'
import OrdersContainer from '../ordersContainer'
import './style.css'
import axios from 'axios'

const Main = () => {
    const [state, actions] = useMainContext()
    let currentDate = new Date();

    currentDate.setMinutes(currentDate.getMinutes() + 5);

    const handleClcik = () => {
      axios.post("/.netlify/functions/deleteFile", {
        next_run: currentDate
      })
    }

  return (
    <div className='main_hero'>
        <div className="hero-section">
        <button onClick={handleClcik}>Teste apagar</button>
        <LeftContainerMain />
        <RigthContainerMain />
        </div>
        {
        state.showValues &&
        state.archiveTypeSelected.name !== 'Juramentada /Certificada' &&
        state.filePending.length !== 0 &&
        state.archiveTypeSelected?.name &&
        <OrdersContainer /> 
        }
    </div>
  )
}

export default Main