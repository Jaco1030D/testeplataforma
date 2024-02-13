import React from 'react'
import './style.css'
import elipse from './elipse.svg'
import logoleft from './logo-left.png'
import logoRigth from './logo-rigth.png'

const ServicesOffered = ({text, type}) => {
  return (
    <div className='serviceOffered-container'>
        <div className="serviceOffered-content ">
        <img className='serviceOffered-elipse' src={elipse} alt="" />
            <div className="serviceOffered-content_card">
                <div className="serviceOffered_featured-card">
                    <h2>{text.featured.title}</h2>
                    <p>{text.featured.text}</p>
                </div>
            </div>
            {text.card.map((item, index) => (
                <div key={index} className="serviceOffered-content_card">
                    <div className="serviceOffered_card">
                        <h2>{item.title}</h2>
                        <p>{item.text}</p>
                        <div className="serviceOffered-card_rectangle"></div>
                    </div>
                </div>
            ))}
            <img id='serviceOffered-logo-Left' src={logoleft} alt="" />
            <img id='serviceOffered-logo-Rigth' src={logoleft} alt="" />
            
            
        </div>
        {type === 2 && <div className="serviceOffered_gradient"></div>}

    </div>
  )
}

export default ServicesOffered