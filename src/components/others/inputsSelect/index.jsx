import React, { useEffect, useState } from 'react'
import './style.css'
import button from './Button.svg'
import frame from './Frame.svg'
import l from './Label.svg'
import { useMainContext } from '../../../context/MainContext'

const languagesData = [
  { language: 'Português', types: ['Brasil', 'Portugal'] },
  { language: 'Inglês', types: ['EUA', 'UK'] },
  { language: 'Chinês', types: ['Simplificado', 'Taiwan', 'Hong kong'] },
  { language: 'Espanhol', types: ['Espanha', 'America latina'] },
  { language: 'Alemão', types: ['Alemanha', 'Áustria'] },
  { language: 'Francês', types: [] },
  { language: 'Italiano', types: [] },
  { language: 'Holandês', types: [] },
  { language: 'Russo', types: [] },
  { language: 'Japonês', types: [] },
  { language: 'Árabe', types: [] },
  { language: 'Hindi', types: [] },
  { language: 'Coreano', types: [] },
  { language: 'Turco', types: [] },
  { language: 'Sueco', types: [] },
  { language: 'Polonês', types: [] },
  { language: 'Vietnamita', types: [] },
  { language: 'Tailandês', types: [] },
  { language: 'Grego', types: [] },
  { language: 'Dinamarquês', types: [] }
]; 

const InputSelect = ({handleClose}) => {
  const [languages, setLanguages] = useState(languagesData)
  const [state, action] = useMainContext()
  const [inputValue, setInputValue] = useState('')

    const filter = (query) => {
        const lowerCaseQuery = query;

        const results = languagesData.filter((language) => {

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
  const handleClick = (name) => {
    update({origin: name})
    handleClose()
  }
  useEffect(() => {

    if (inputValue) {
        
        const array = filter(inputValue)

        setLanguages(array)
    } else {

        setLanguages(languagesData)

    }

}, [inputValue])
  return (
    <div className="destinoidiomas">
      <div className="div">

        <div className="container-inputSelect">
          <div className="content-inputSelect">
            {languages.map((item, index) => {
              if (!state.selectValues.translation.includes(item.language)) {
                return (
                  <div key={index} className='languages_group pointer' onClick={() => handleClick(item.language)}>
                    <div className='header_language_languages_group'><span className='name-language'>{item.language}</span> {state.selectValues.origin.includes(item.language) && <box-icon name='check' ></box-icon>}</div>
                    {item.types.map((item, index) => (
                      <div>
                      <div className="l"></div> <p className='type-language'>{item}</p>
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

    
