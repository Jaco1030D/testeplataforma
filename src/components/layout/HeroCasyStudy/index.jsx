import React from 'react'
import LeftContainerCasy from '../../others/LeftContainerCasy'
import RightContainerCasy from '../../others/RightContainerCasy'

const HeroCasyStudy = ({text}) => {
  return (
    <section className='HeroCase-container '>
        <div className='HeroCase-content '>
            <LeftContainerCasy text={text} />
            <RightContainerCasy img={text?.img} />
        </div>
    </section>
  )
}

export default HeroCasyStudy