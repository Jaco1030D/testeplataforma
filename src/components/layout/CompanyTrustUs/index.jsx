import React from 'react'
import './style.css'
import logo from './logo.png'
import CompanyTrustContent from '../CompanyTrustContent'
import Button from '../Button'

const CompanyTrustUs = ({text, icons, gradient = false, alternative}) => {
  return (
    <div className={`company-trust-container ${gradient && 'gradient'} ${alternative && 'backgroundcolorwhite'}`}>
        {gradient && (
          <div className='company-trust_gradient '> </div>    
        )}
        <CompanyTrustContent icons={icons} text={text} />

        {alternative && <div className='button-container'>
            <Button text={'Fale com um especialista'} />
          </div>}
    </div>
  )
}

export default CompanyTrustUs