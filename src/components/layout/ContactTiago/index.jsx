import React from 'react'
import './style.css'

const ContactTiago = ({text}) => {
  return (
    <section className='contactTiago-container '>
        <div className="contactTiago-content ">
            <img src={text.img} alt="Tiago" />
            <div className="contactTiago_texts">
                <span>{text.title}</span>
                <p>{text.subtitle}</p>
            </div>
            <button className='contactTiago_button'>Contato</button>
        </div>
    </section>
  )
}

export default ContactTiago