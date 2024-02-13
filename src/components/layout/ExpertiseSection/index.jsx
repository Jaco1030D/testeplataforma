import React from 'react'
import './style.css'
import img from './img.png'
import Button from '../Button'

const ExpertiseSection = ({text}) => {
  return (
    <div className='expertiseSection-container'>
        <div className="expertiseSection_texts">
            <h2 className='expertiseSection_texts-title'>Somos experts em <strong>diversos</strong> assuntos</h2>

            <p className='expertiseSection_texts-subtitle'>Entendemos que cada indústria possui sua linguagem única e nuances específicas. Na Magma Translations, oferecemos <strong>soluções de tradução personalizadas</strong> para atender às demandas exclusivas de cada setor, garantindo precisão e relevância em todos os contextos.</p>
        </div>
        <div className="expertiseSection-content">
            <div className="expertiseSection-infos">

                {text.cards.map((item, index) => (
                    <div className='expertiseSection-card'>
                        <h2>{item.title}</h2>
                        <p>{item.subtitle}</p>
                    </div>
                ))}
            </div>

            <img src={img} alt="" />
        </div>

        <Button text={'Fale com um especialista'} />

        <br />
        <br />
        <br />

        <div className="Evaluated-projects_gradient"></div>
    </div>
  )
}

export default ExpertiseSection