import React from 'react'
import CardProject1 from '../../others/CardProject1'
import './style.css'
import logo from './logo.png'

const RigthEvaluated = ({text}) => {
  return (
    <div className='rigthEvaluated-container'>
        <div className="rigthEvaluated-first-column">
            {text.firstColumn.map((item, index) => (
                <CardProject1 text={item} type={1} />
                
            ))}

            <CardProject1 text={text.featured} scale type={2} />
        </div>
        <div className="rigthEvaluated-second-column">
            {text.secondColumn.map((item, index) => (
                <CardProject1 text={item} type={2} />
                
            ))}
            <div className="rigthEvaluated-second-column_message">
                avaliação dos linguistas
                <img src={logo} className='rigthEvaluated-second-column_message_logo' alt="" />
            </div>
        </div>
    </div>
  )
}

export default RigthEvaluated