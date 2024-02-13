import React from 'react'
import Button from '../../layout/Button'
import './style.css'
import elipse from './elipse.svg'
import { useNavigate } from 'react-router-dom'

const LeftContainerCompany = ({text}) => {
  return (
    <div className='leftContainerCompany-container'>
        <div className='leftContainerCompany_texts'>
            <h1>Traduções <span>bem avaliadas -</span> de pequeno e grande porte.</h1>
            <p>{text.subtitle}</p>
        </div>
        <div className='leftContainerCompany_buttons'>
            <Button text={text.textButton[0]} />
            <Button text={text.textButton[1]} type2 handleClick={'/'} />
        </div>
        <div className="leftContainerCompany_icons">
          {text.icons.map((item, index) => (
            <img src={item} key={index} alt="" />
          ))}
        </div>
    </div>
  )
}

export default LeftContainerCompany