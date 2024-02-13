import React from 'react'
import './style.css'
import { useNavigate } from 'react-router-dom';


const FooterHome = () => {
    const navigate = useNavigate()
    const handleClick = () => {
      window.scrollTo(0, 0);
      navigate('/terms')
    }
  return (
    <div className="checkout-footer">
        <p>2008 - 2024 Magma Translation<sup>TM</sup>  Todos os Direitos Reservados <p onClick={handleClick}> Termos e condições</p> </p>
      </div>
  )
}

export default FooterHome