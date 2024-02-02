import React from 'react'
import './style.css'

const AttentionCard = ({text}) => {
  return (
    <div className="warning-container">
        <div class="warning-content">
            <span class="warning-icon">&#9888;</span>
            <h2>Atenção:</h2>
            <p>{text}</p>
        </div>
    </div>
  )
}

export default AttentionCard