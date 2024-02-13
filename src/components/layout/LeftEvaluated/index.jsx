import React from 'react'
import './style.css'
import Button from '../Button'

const LeftEvaluated = ({text, action}) => {
  return (
    <div className='leftEvaluated-container'>
        <h2>{text.title}</h2>
        <p>{text.text}</p>
        <Button text={text.buttonText} handleClick={action} />
    </div>
  )
}

export default LeftEvaluated