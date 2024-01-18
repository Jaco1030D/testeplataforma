import React from 'react'

import './style.css'

const Button = ({text, handleClick, disabled = false}) => {
  return (
    <div className="button">
        <button onClick={handleClick} disabled={disabled}>{text || "Entrar em contato"}</button>
    </div>
  )
}

export default Button