import React from 'react'
import './style.css'

const TextMainCaseStudy = ({text}) => {
  return (
    <div className='TextMainCaseStudy-container'>
        <h2>{text.title}</h2>
        <div className="textMainCaseStudy-content">
            {text.cards.map((item, index) => (
                <div className='textMainCaseStudy-card'>
                    <h4>{item.name}</h4>
                    <p>{item.paragraph}</p>
                </div>
            ))}
        </div>
    </div>
  )
}

export default TextMainCaseStudy