import React, { useEffect, useState } from 'react'
import { useMainContext } from '../../../context/MainContext'
import { getDeadLine, getNumWordsArchive } from '../../../hooks/useCalculateValue'
import { calculateValues } from '../../../utils'
import OrdersPreview from '../OrdersPreview'
import './style.css'
import { useNavigate } from 'react-router-dom'


const OrdersContainer = () => {
    const [state, actions] = useMainContext()
    console.log(state);
    const [numWords, setNumWords] = useState(1000)
    const [arrayValues, setArrayValues] = useState([])
    const [numPages, setNumPages] = useState(10)
    const [finalDate, setFinalDate] = useState()
    const [value, setValue] = useState(0)
    const [deadline, setDeadline] = useState()
    const navigate = useNavigate()

    const calculateDates = (days, hours) => {

      const date = new Date();
  
      const initialDate = new Date(date)
  
      const finalDate = new Date(date)
  
      finalDate.setDate(finalDate.getDate() + days)
  
      finalDate.setHours(finalDate.getHours() + hours)

      const options = { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit'};
      const initialDateFormatted = initialDate.toLocaleString('pt-BR', options);
      const finalDateFormatted = finalDate.toLocaleString('pt-BR', options);
  
      return {initialDate: initialDateFormatted, finalDate: finalDateFormatted}
    }

    const calculateNumWords = async (files) => {
      let numWords = 0;
      let numPages = 0

      for (let index = 0; index < files.length; index++) {
          let numWordsFile = 0;
          let numPagesFile = 0;
          const file = files[index];

          console.log(file);

          try {
              const res = await getNumWordsArchive(file);
              numWordsFile = res.numWords;
              numPagesFile = res.numPages;

              numWords += numWordsFile;
              numPages += numPagesFile
          } catch (error) {
              console.error(`Error processing file ${file}: ${error}`);
          }
      }

      return { numWords, numPages}
    }

    const handleSelect = async (valueResult, name, multipler) => {
        const files = state.filePending
        const names = []

        const arrayValuesLanguage = arrayValues.map(num => num * multipler);
    
        for (let index = 0; index < files.length; index++) {
          const file = files[index];
          names.push(file.name)
        }
    
        const cartItems = {
          names,
          numWords,
          numPages,
          typeService: name,
          deadline,
          finalDate,
          languageSetings: state.selectValues,
          value: valueResult,
          user: state.user,
          arrayValuesLanguage,
          archiveType: state.archiveTypeSelected.name,
          paymentInfos: {
            id_payment: '',
            statusURL: '',
            statusPayment: '', 
          }
        }
    
        await actions.changeCartItems(cartItems)
    
        navigate('/checkout')


    }

    useEffect(() => {
      calculateNumWords(state.filePending).then(res => {
        setNumWords(res.numWords)
        setNumPages(res.numPages)
      })

      // const files = state.filePending
      
      //   if (files) {

          
      //     let numWords = 0
          
      //     for (let index = 0; index < files.length; index++) {
      //       let numWordsFile = 0
      //       let numPagesFile = 0
      //       const file = files[index];

      //       console.log(file);

      //       try {
      //         getNumWordsArchive(file).then(res => {
      //           numWordsFile = res.numWords
      //           numPagesFile = res.numPages
      //           console.log(numWordsFile);
      //       })
      //       } catch (error) {
              
      //       }

      //       console.log(numWordsFile);
      //       numWords += numWordsFile
      //     }

      //     setNumWords(numWords)
        
          
      //   } else {
      //     setNumWords(1000)
      //     setNumPages(10)
      //   }
      },[state.filePending, state.deadline, deadline])

      useEffect(() => {
        const {finalDate} = calculateDates(deadline?.days, deadline?.hours)

        setFinalDate(finalDate)

      }, [deadline])

      useEffect(() => {

        const deadline = getDeadLine(state.deadlines?.baseDeadline, state.deadlines?.numWords, state.deadlines?.numHours, numWords)
  
        setDeadline(deadline)
  
      },[state.deadlines, numWords])

      useEffect(() => {

        const {arrayValues, finalValue} = calculateValues(numWords, state.selectValues, state.defaultValue, state.languageCombinations, state.archiveTypeSelected)

        setValue(finalValue)
        setArrayValues(arrayValues)
  
      },[numWords, state.selectValues, state.languageCombinations, state.defaultValue, state.archiveTypeSelected])

  return (
    // <div className='orders-container'>
    //     <OrdersPreview name={'Premiun'} numWords={numWords} numPages={numPages} deadline={deadline} value={value} multipler={state.multiplers.premiun} />
    //     <OrdersPreview name={'Profissional'} numWords={numWords} numPages={numPages} deadline={deadline} value={value} multipler={state.multiplers.expert} />
    //     <OrdersPreview name={'Economica'} numWords={numWords} numPages={numPages} deadline={deadline} value={value} multipler={state.multiplers.economy} />
    // </div>
      <div className="box" id='container_values'>
        <div className="group">
          <div className="caixadepreos">
            <div className="frame">
              <div className="text-wrapper">Premium</div>
              <div className="tradutorsenior">
                <div className="tradutorseniortexto">Tradutor Sênior Especialista</div>
              </div>
              <div className="tradutorsenior">
                <div className="tradutorseniortexto">+ Corretor Profissional</div>
              </div>
              <div className="div">{state.archiveTypeSelected.name}</div>
            </div>
            <div className="frame-2">
              <div className="textoentrega">Entrega dia</div>
              <div className="dataentrega">{finalDate}h</div>
            </div>
            <div className="frame-2">
              <div className="textoentrega">Número de Palavras</div>
              <div className="dataentrega">{numWords}</div>
            </div>
            <div className="caixadepreco">&euro; {(value * state.multiplers.premiun).toFixed(2)} </div>
            <div className="botao-selecionar">
              <div className="text-wrapper-2 pointer" onClick={() => handleSelect((value * state.multiplers.premiun).toFixed(2), 'Premium', state.multiplers.premiun)}>Selecionar</div>
            </div>
          </div>
          <div className="caixadepreos-2">
            <div className="frame-3">
              <div className="text-wrapper">Expert</div>
              <div className="tradutorseniortexto-wrapper">
                <div className="tradutorseniortexto-2">Tradutor Sênio Especialista</div>
              </div>
              <div className="div">{state.archiveTypeSelected.name}</div>
              <div className="caixaparaautolayout" />
            </div>
            <div className="frame-2">
              <div className="textoentrega">Entrega dia</div>
              <div className="dataentrega">{finalDate}h</div>
            </div>
            <div className="frame-2">
              <div className="textoentrega">Número de Palavras</div>
              <div className="dataentrega">{numWords}</div>
            </div>
            <div className="caixadepreco">&euro; {(value * state.multiplers.expert).toFixed(2)} </div>
            <div className="div-wrapper">
              <div className="text-wrapper-2 pointer" onClick={() => handleSelect((value * state.multiplers.expert).toFixed(2), 'Expert', state.multiplers.expert)}>Selecionar</div>
            </div>
          </div>
          <div className="caixadepreos-3">
            <div className="frame-2">
              <div className="text-wrapper">Econômico</div>
              <div className="tradutorsenior-2">
                <div className="tradutorseniortexto-3">Tradutor Profissional</div>
              </div>
              <div className="caixaparaautolayout-2" />
              <div className="caixaparaautolayout" />
            </div>
            <div className="frame-2">
              <div className="textoentrega">Entrega dia</div>
              <div className="dataentrega">{finalDate}h</div>
            </div>
            <div className="frame-2">
              <div className="textoentrega">Número de Palavras</div>
              <div className="dataentrega">{numWords}</div>
            </div>
            <div className="caixadepreco">&euro; {(value * state.multiplers.economy).toFixed(2)} </div>
            <div className="botao-selecionar-2">
              <div className="text-wrapper-2 pointer" onClick={() => handleSelect((value * state.multiplers.economy).toFixed(2), 'Economica', state.multiplers.economy)}>Selecionar</div>
            </div>
          </div>
        </div>
      </div>
    
  )
}

export default OrdersContainer
