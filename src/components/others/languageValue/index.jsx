import React from 'react'
import './style.css'

const LanguageValue = ({languagesGroups, setValue, indexGroup}) => {
  return (
    <div className='value-per-word'>
      {languagesGroups.map((languageTranslation, index) => (
        <div className='language-content' key={index}>
        <div className="language-names">
            <p>{languageTranslation.origin}</p>
            &rarr;
            <p>{languageTranslation.translated} </p>
          </div>
          <div className="language-values">
          <p>Valor por palavra:</p>
          <input type="number" value={languageTranslation.value} onChange={(e) => setValue(index, indexGroup, e.target.value)} />
          </div>
        
        </div>
      ))}
    </div>
  )
}

export default LanguageValue


