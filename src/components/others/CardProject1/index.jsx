import React from 'react'
import './style.css'

const CardProject1 = ({text, type, scale}) => {
  return (
    <div className={`cardProject ${type === 1 ? 'type1' : 'type2'} ${scale && 'scale'}`}>
        <img src={text.img} alt={text.title} />
            {type === 1 && (
                <div className='cardProject_texts'>
                    <span>{text.title}</span>
                    <p>{text.subTitle}</p>
                </div>
            )}
            {type === 2 && (
                <div className='cardProject_texts_type2'>
                    <span>{text.name}</span>
                    <p>{text.numWords}</p>
                    <p id='percent'>{text.percent}</p>
                </div>
            )}
        
    </div>
  )
}

export default CardProject1