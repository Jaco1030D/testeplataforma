import React from 'react'
import './style.css'
import { termsText } from '../../../constants'

const Terms = () => {
  return (
    <div class="container">
        <h2>{termsText.title}</h2>
        <p>{termsText.explication}</p>
        {termsText.texts.map((item, index) => (
          <div key={index}>
          <h2>{item.title}</h2>
          {item.topics.map((item, index) => (
            <p key={index}>{item.number} <strong>{item.strong}</strong> {item.text} </p>
          ))}
          </div>
        ))}     
    </div>
  )
}

export default Terms