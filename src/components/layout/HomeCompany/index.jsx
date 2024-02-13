import React from 'react'
import LeftContainerCompany from '../../others/LeftContainerCompany'
import './style.css'
import RigthContainerCompany from '../../others/RigthContainerCompany'

const HomeCompany = ({text}) => {
  return (
    <section className='homeCompany-container '>
        <div className='homeCompany-content '>
            <LeftContainerCompany text={text.leftContent} />
            <RigthContainerCompany img={text.img} />
        </div>
    </section>
  )
}

export default HomeCompany