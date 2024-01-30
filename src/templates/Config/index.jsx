import React, { useEffect, useState } from 'react'
import { useUpdateDocument } from '../../hooks/useUpdateDocument'
import { useFetchDocument } from '../../hooks/useFetchDocument'
import { useMainContext } from '../../context/MainContext'
import { Accordion, AccordionDetails, AccordionSummary } from '@mui/material'
import LanguageValue from '../../components/others/languageValue'
import { useInsertDocuments } from '../../hooks/useInsertDocuments'

const languagesOrigin = [
  { value: 0, label: "Português - Br" },
  { value: 0, label: "Português - Pt" },
  { value: 0, label: "Inglês - EUA" },
  { value: 0, label: "Inglês - UK" },
  { value: 0, label: "Espanhol - Es" },
  { value: 0, label: "Espanhol - L.A." },
  { value: 0, label: "Alemão - Al" },
  { value: 0, label: "Alemão - Au" },
  { value: 0, label: "Chinês - Simp" },
  { value: 0, label: "Chinês - Tai" },
  { value: 0, label: "Chinês - Hon" },
  { value: 0, label: "Francês" },
  { value: 0, label: "Italiano" },
  { value: 0, label: "Holandês" },
  { value: 0, label: "Russo" },
  { value: 0, label: "Japonês" },
  { value: 0, label: "Árabe" },
  { value: 0, label: "Hindi" },
  { value: 0, label: "Coreano" },
  { value: 0, label: "Turco" },
  { value: 0, label: "Sueco" },
  { value: 0, label: "Polonês" },
  { value: 0, label: "Vietnamita" },
  { value: 0, label: "Tailandês" },
  { value: 0, label: "Grego" },
  { value: 0, label: "Dinamarquês"}
]

const createLanguageCombination = (languages) => {
  const languageCombinations = [];

  for (let i = 0; i < languages.length; i++) {
      const languagePerType = {
        language: []
      }
      for (let j = 0; j < languages.length; j++) {
          if (i !== j) {
              languagePerType.language.push({
              origin: languages[i],
              translated: languages[j],
              value: 0,
              });
          }
      }
      languageCombinations.push(languagePerType)
      
  }

  return languageCombinations;
}

const Config = () => {
  const {document} = useFetchDocument('configSenting', '2963')
  console.log(document);
  const [numWords, setNumWords] = useState()
  const [numHours, setNumHours] = useState()
  const [baseDeadline, setBaseDeadline] = useState()
  const [multiplers, setMultiplers] = useState()
  const [valueWord, setValueWord] = useState(0.11)
  const [typeArchives, setTypeArchives] = useState([])
  const [languages, setLanguages] = useState(languagesOrigin.map(language => language.label))
  const [languageCombinations, setLanguageCombinations] = useState(createLanguageCombination(languages))
  const {insertFiles} = useInsertDocuments("archives")
  const {updateDocument} = useUpdateDocument("configSenting")
  const [message, setMessage] = useState()

  console.log(typeArchives);

  const updateValueByIndex = (index, newValue) => {
    setLanguages(prevValues => {
      return prevValues.map((value, i) => (i === index ? { ...value, value: newValue } : value));
    });
  };

  const [expandedIndex, setExpandedIndex] = useState(null);

    const handleAccordionChange = (index) => {
      setExpandedIndex((prevIndex) => (prevIndex === index ? null : index));
    };

  const modifyValue = (indexElement, indexGroup, value) => {
    setLanguageCombinations(prev => {
      const newArray = [...prev]

      newArray[indexGroup].language[indexElement].value = value

      return newArray
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const config = {
      numHours: parseFloat(numHours),
      numWords: parseFloat(numWords),
      baseDeadline: parseFloat(baseDeadline)
    }

    await updateDocument('2963', {deadline: config})

    setMessage("Atualizado com sucesso")

  }
  const handleSubmitForm = async (e) => {
    e.preventDefault()

    console.log(languageCombinations);

    await updateDocument('2963', {languageValues: languageCombinations})
    await updateDocument('2963', {values: valueWord})

    setMessage("Atualizado com sucesso")

  }

  const handleChangeMultiplers = (value, name) => {
    console.log(value/100);
    setMultiplers(
      prev => {
        const newData = {...prev, [name]: parseFloat(value)}

        return newData
      }
    )
  }

  console.log(multiplers);
  const handleClick = (e) => {
    e.preventDefault()

    const newItem = [...typeArchives, {name: '', value: 0, icon: ''}]

    setTypeArchives(newItem)

  }

  const handleSubmitArchive = async (e) => {
    e.preventDefault()

    await updateDocument('2963', {archiveTypes: typeArchives})

    console.log('seila meu');
  }

  const handleChange = async (valuesOrigin, index, type) => {
    let value = valuesOrigin
    if (type === 'icon') {
      const downloadArchive = await insertFiles(valuesOrigin)

      value = downloadArchive
    }

    console.log(value);
    setTypeArchives(prev => {

      const newArray = [...prev]

      if (index >= 0 && index < newArray.length) {
       
        const obj = newArray[index];

        
        if (obj.hasOwnProperty(type)) {
            
            obj[type] = value;
            
        }
      }
      
      return newArray
    })
  }

  const handleSubmitMultiplers = async (e) => {

    e.preventDefault()

    await updateDocument('2963', {multiplers})

    console.log('seila meu');

  }

  const renderImage = (file) => {

    const url = URL.createObjectURL(file)

    return url
  }

  useEffect(() => {

    setNumWords(document?.deadline.numWords)
    setNumHours(document?.deadline.numHours)
    setBaseDeadline(document?.deadline.baseDeadline)
    // if (document?.languageValues) {
    //   setLanguageCombinations(document.languageValues)
    // }
    if (document?.multiplers) {
      
      setMultiplers(document.multiplers)
    }
    console.log(document);
    if (document?.archiveTypes) {
      
      setTypeArchives(document?.archiveTypes)
    }

  }, [document])
  return (
    <div>
        <form onSubmit={handleSubmit}>
            <div>
            horas base
            <input type="number" value={baseDeadline} onChange={(e) => setBaseDeadline(e.target.value)} />
            </div>
            <div>
            a cada
            <input type="number" value={numWords} onChange={(e) => setNumWords(e.target.value)} />
            palavras
            </div>
            <div>
            é adicionado
            <input type="number" value={numHours} onChange={(e) => setNumHours(e.target.value)} />
            horas
            </div>

            <button>Atualizar configurações de prazo</button>
        </form>
        <br />
        <form onSubmit={handleSubmitForm}>
          <div>
          valor padrão por palavra:
          <input type="number" value={valueWord} onChange={(e) => setValueWord(e.target.value)}/>
          </div>
          <div className=''>
              <div className="languages">
                  {languageCombinations.map((languagesGroups, index) => (
                    <div key={index}>
                      <Accordion expanded={expandedIndex === index} onChange={() => handleAccordionChange(index)}>
                        <AccordionSummary>
                          <p>{languagesGroups?.language[0].origin}</p>
                        </AccordionSummary>
                        <AccordionDetails>
                          {expandedIndex === index ? <LanguageValue languagesGroups={languagesGroups?.language} indexGroup={index} setValue={modifyValue} /> : null}
                        </AccordionDetails>
                      </Accordion>
                    </div>
                  ))}
                </div>
          </div>
          <button>Atualizar valores por palavra</button>

        </form>
        <br />
        <br />
        <form onSubmit={handleSubmitArchive}>
          <h2>Aumentar em:</h2>
          {typeArchives && typeArchives.map((item, index) => (
            <div>
              <img src={item.icon} alt="" />
              <label htmlFor="">Icon</label>
              <input type="file" onChange={(e) => handleChange(e.target.files[0], index, 'icon')} multiple />
              <label htmlFor="">Tipo Arquivo</label>
              <input type="text" value={item.name} onChange={(e) => handleChange(e.target.value, index, 'name')} />

              <label htmlFor="">Porcentagem</label>
              <input type="number" value={item.value} onChange={(e) => handleChange(e.target.value, index, 'value')} />%

            </div>
            
            ))}
            <button type='button' onClick={handleClick}>Adicionar +</button>
            <button>Salvar tipos de arquivos</button>
        </form>

        <form onSubmit={handleSubmitMultiplers}>
          <h2>Porcentagem do valor em relação ao valor neutro</h2>
          {multiplers &&
            <div>
              <label htmlFor="">Economico</label>
              <input type="number" value={multiplers.economy} onChange={(e) => handleChangeMultiplers(e.target.value, 'economy')} />
              <br />
              <label htmlFor="">Expert   </label>
              <input type="number" value={multiplers.expert} onChange={(e) => handleChangeMultiplers(e.target.value, 'expert')} />
              <br />
              <label htmlFor="">Premium  </label>
              <input type="number" value={multiplers.premiun} onChange={(e) => handleChangeMultiplers(e.target.value, 'premiun')} />
            </div>
            
            }
            <button>Salvar Valores dos multiplicadores</button>
        </form>
        <p>{message}</p>
    </div>
  )
}

export default Config