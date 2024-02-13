import React from 'react'
import './style.css'
import Button from '../Button'

const ExampleTraduction = ({text}) => {
  return (
    <section className='exampleTraduction-container'>
        <div className="exampleTraduction_texts">
            <h2>{text.title}</h2>
            <p>{text.subtitle}</p>
        </div>
        <div className="exampleTraduction-content">
            {text.cards.map((item, index) => (

            <div className="exampleTraduction-card">
                <img src={item.img} width={'26px'} alt="" />
                <span>{item.title}</span>
                <p>{item.subTitle}</p>
            </div>
            ))}
            
        </div>

        <Button text={'Fale com um especialista'} />
    </section>
  )
}

export default ExampleTraduction