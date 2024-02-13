import React from 'react'

const CompanyTrustContent = ({text, icons}) => {
  return (
    <div className="company-trust-content ">
            <h2>{text}</h2>
            <div className="company-trust_logo ">
                {icons.map((item, index) => (
                    <div key={index} className='company-trust_logo-item'>
                        <img src={item} alt="" />
                    </div>
                ))}
            </div>
        </div>
  )
}

export default CompanyTrustContent