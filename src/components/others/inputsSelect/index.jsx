import React, { useEffect, useState } from 'react'
import './style.css'
import button from './Button.svg'
import frame from './Frame.svg'
import l from './Label.svg'
import { useMainContext } from '../../../context/MainContext'

const typeMappings = {
  Brasil: 'Br',
  Portugal: 'Pt',
  'Estados Unidos': 'EUA',
  'Reino Unido': 'UK',
  Simplificado: 'Simp',
  Taiwanês: 'Tai',
  'Hong Kong': 'Hon',
  Espanha: 'Es',
  'América Latina': 'L.A.',
  Alemão: 'Al',
  Austrália: 'Au'
};

const abbreviations = {
  Br: 'Brasil',
  Pt: 'Portugal',
  EUA: 'Estados Unidos',
  UK: 'Reino Unido',
  Simp: 'Simplificado',
  Tai: 'Taiwanês',
  Hon: 'Hong Kong',
  Es: 'Espanha',
  'L.A.': 'América Latina',
  Al: 'Alemão',
  Au: 'Austrália'
}

const InputSelect = ({handleClose}) => {
  const [state, action] = useMainContext()
  const [languages, setLanguages] = useState(state.languagesData)
  const [inputValue, setInputValue] = useState('')

    const filter = (query) => {
        const lowerCaseQuery = query;

        const results = state.languagesData.filter((language) => {

          return (
            language.language.toLowerCase().includes(lowerCaseQuery) ||
            language.types.some((type) => type.toLowerCase().includes(lowerCaseQuery))
          );
        });
      
        return results;
    }

  const update = (key) => {
    console.log(key + 'aqui');
    action.changeSelectedLanguages(key)
  }

  const getAbbreviationAndFullName = (fullName) => typeMappings[fullName] || fullName;
  const getFullName = (abbre) => typeMappings[abbre] || abbre;

  
  const handleClick = (name, item) => {
    
    const abbre = getAbbreviationAndFullName(item)
    const value = item ? `${name} - ${abbre}` : name
    update({origin: value})
    handleClose()
  }
  useEffect(() => {

    if (inputValue) {
        
        const array = filter(inputValue)

        setLanguages(array)
    } else {

        setLanguages(state.languagesData)

    }

}, [inputValue])
  return (
    <div className="destinoidiomas">
      <div className="div">

        <div className="container-inputSelect">
          <div className="content-inputSelect">
            {languages.map((itemLanguage, index) => {
              if (!state.selectValues.translation.includes(itemLanguage.language)) {
                return (
                  <div key={index} className='languages_group pointer'>
                    <div className='header_language_languages_group'><span className='name-language' onClick={() => handleClick(itemLanguage.language)}>{itemLanguage.language}</span> {state.selectValues.origin.includes(itemLanguage.language) && <box-icon name='check' ></box-icon>}</div>
                    {itemLanguage.types.map((item, index) => (
                      <div>
                      <div className="l"></div> <p className='type-language' onClick={() => handleClick(itemLanguage.language, item)}>{item}</p>{state.selectValues.origin.includes(itemLanguage.language + ' - ' + getFullName(item)) && <box-icon name='check' style={{marginTop: '-5px'}} ></box-icon>}
                      </div>
                    ))}
                  </div>
                )
              }
            })}
          </div>

        </div>
        <div className="overlap">
          <div className="busca">
            <p className="frasehero">Qual é o idioma de origem?</p>
            <img className="img pointer" alt="Button" onClick={handleClose} src={button} />
            <div className="separator" />
            <div className="separator-2" />
            <div className="overlap-group">
              <img className="frame-2" alt="Frame" src={frame} />
              <div className="inputbusca">
                <input type="text" value={inputValue} onChange={(e) => setInputValue(e.target.value.toLowerCase())} />
              </div>
              <div className="fieldset" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default InputSelect

    
