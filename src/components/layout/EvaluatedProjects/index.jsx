import React from 'react'
import LeftEvaluated from '../LeftEvaluated'
import RigthEvaluated from '../RigthEvaluated'
import elipse from './elipse.svg'
import './style.css'
import logo from './logo.png'

const EvaluatedProjects = ({text, type, action = '/caseStudy/shopee'}) => {
  return (
    <section className='EvaluatedProjects-container '>
      {type === 2 && <div className="backgroud"></div>}
      {type === 2 && <img className='serviceOffered-elipse_evaluated' src={elipse} alt="" />}
      
        <div className='EvaluatedProjects-content '>
            <LeftEvaluated text={text.leftContainer} action={action} />
            <RigthEvaluated text={text.rigthContainer} />
        </div>
        {type === 2 && 
        (
        <img className='EvaluatedProjects_logo2' src={logo} alt="" />
        )
        }
        {type === 2 && <div className="Evaluated-projects_gradient"></div>}
      
    </section>
  )
}

export default EvaluatedProjects