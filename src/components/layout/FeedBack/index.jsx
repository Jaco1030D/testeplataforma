import React from 'react'
import './style.css'
import FeedBackCard from '../FeedBackCard'

const FeedBack = ({text, alternative}) => {
  return (
    <section className={`feedBack-container ${alternative && 'background-color-change'}`}>
        <h2>{text.title}</h2>

        <div className='feedBack-content'>
            {text.textsCard.map((item, index) => (
                <FeedBackCard texts={item} />
            ))}
        </div>

        {alternative && <div className="Evaluated-projects_gradient"></div>}
    </section>
  )
}

export default FeedBack