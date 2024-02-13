import React from 'react'
import elipse from './elipse.svg'
import './style.css'

const RigthContainerCompany = ({img}) => {
  return (
    <div className='rigthContainerCompany-container'>
        <img src={img} alt="img" />
        <img className='serviceOffered-elipse' src={elipse} alt="img" />
    </div>
  )
}

export default RigthContainerCompany