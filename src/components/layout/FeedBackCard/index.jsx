import React from 'react'
import './style.css'
import star from './star.svg'
const FeedBackCard = ({texts}) => {
  return (
    <div className={`feedback-card ${texts.featured && 'featured'}`}>
        <div className='feedBack-card-infos'>
            <img src={texts.img} width={'66px'} height={'66px'} alt={texts.name} />
            <div className="feedBack-card-infos_texts">
                <span>{texts.name}</span>
                <p>{texts.company}</p>
            </div>
        </div>
        <p className='feedback_message'>{texts.feedback}</p>
        <img width={'118px'} height={'17px'} src={star} alt={'stars'} />
    </div>
  )
}

export default FeedBackCard