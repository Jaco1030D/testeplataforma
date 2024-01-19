import React, { useState } from 'react'
import LeftContainerMain from '../LeftContainerMain'
import RigthContainerMain from '../RigthContainerMain'
import OrdersPreview from '../OrdersPreview'
import { useMainContext } from '../../../context/MainContext'
import OrdersContainer from '../ordersContainer'

const Main = () => {
    const [state, actions] = useMainContext()
    


  return (
    <div>
        <div className="hero-section">
        <LeftContainerMain />
        <RigthContainerMain />
        </div>
        {
        state.showValues &&
        <OrdersContainer /> 
        }
    </div>
  )
}

export default Main