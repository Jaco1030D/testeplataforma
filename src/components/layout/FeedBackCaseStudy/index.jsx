import React from 'react'
import FeedBackCard from '../FeedBackCard'
import './style.css'

const FeedBackCaseStudy = ({texts}) => {
  return (
    <div className='feedBackCaseStudy'>
          <div className='company-trust_gradient '> </div>    

        <FeedBackCard texts={texts} />
    </div>
  )
}

export default FeedBackCaseStudy