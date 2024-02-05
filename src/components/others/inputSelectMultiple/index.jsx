import React, { useEffect, useState } from 'react'
import './style.css'
import button from './Button.svg'
import frame from './Frame.svg'
import { useMainContext } from '../../../context/MainContext';

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

const InputSelectMultiple = ({handleClose}) => {
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
      const array = [value]

      const arrayPrev = state.selectValues.translation

      if (!arrayPrev.includes(value)) {

        update({translation: array.concat(state.selectValues.translation)})

      } else {
        const index = arrayPrev.indexOf(value)

        arrayPrev.splice(index, 1)

        update({translation: arrayPrev})
      }

      
    }

    const handleReset = () => {
      update({translation: []})
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
        <div className="botoes">
          <div className="botaoresetar">
            <div className="text-wrapper pointer index" onClick={handleReset}>Resetar</div>
          </div>
          <div className="button index pointer" onClick={handleClose}>
            <div className="text-wrapper-2">Concluido</div>
            <div className="text-wrapper-3">⟶</div>
          </div>
        </div>

        <div className="container-inputSelect">
          <div className="content-inputSelect">
            {languages.map((itemLanguage, index) => {
              if (itemLanguage.language !== state.selectValues.origin) {
                return (
                  <div className='languages_group pointer' >
                    {itemLanguage.types.length !== 0 && <div className='header_language_languages_group'><span className='name-language' >{itemLanguage.language}</span> {state.selectValues.translation.includes(itemLanguage.language) && <box-icon name='check' ></box-icon>} </div>}
                    {itemLanguage.types.length === 0 && <div className='header_language_languages_group'><span className='name-language'  onClick={() => handleClick(itemLanguage.language)}>{itemLanguage.language}</span> {state.selectValues.translation.includes(itemLanguage.language) && <box-icon name='check' ></box-icon>} </div>}
                    
                    {itemLanguage.types.map((item, indexo) => 
                    {
                      if (!state.selectValues.origin.includes(getAbbreviationAndFullName(item))) {
                        return (
                          <div>
                            <div className="l"></div> <p className='type-language' onClick={() => handleClick(itemLanguage.language, item)}>{item}</p>{state.selectValues.translation.includes(itemLanguage.language + ' - ' + getFullName(item)) && <box-icon name='check' style={{marginTop: '-5px'}} ></box-icon>}                      
                          </div>
                        )
                      }
                    }
                    )}
                  </div>
                )
              }
            })}
          </div>

        </div>
          <div className="busca">
            <p className="frasehero">Para quais idiomas você está traduzindo?</p>
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
  )
}

export default InputSelectMultiple