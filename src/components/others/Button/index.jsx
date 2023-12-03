import React from 'react'

import './style.css'

const Button = ({text, handleClick}) => {
  return (
    <div className="button">
        <button onClick={handleClick} >{text || "Entrar em contato"}</button>
    </div>
  )
}

export default Button