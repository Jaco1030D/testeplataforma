import React, { useEffect, useState } from 'react'
import { useMainContext } from '../../../context/MainContext'
import { getDeadLine, getNumWordsArchive } from '../../../hooks/useCalculateValue'
import { calculateValues } from '../../../utils'
import OrdersPreview from '../OrdersPreview'
import './style.css'

const OrdersContainer = () => {
    const [state] = useMainContext()
    const [numWords, setNumWords] = useState(1000)
    const [numPages, setNumPages] = useState(10)
    const [value, setValue] = useState(0)
    const [deadline, setDeadline] = useState()

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
      },[state.filePending])

      useEffect(() => {

        const deadline = getDeadLine(state.deadlines?.baseDeadline, state.deadlines?.numWords, state.deadlines?.numHours, numWords)
  
        setDeadline(deadline)
  
      },[state.deadlines, numWords])

      useEffect(() => {

        const value = calculateValues(numWords, state.selectValues, state.defaultValue, state.languageCombinations, state.archiveTypeSelected)

        setValue(value)
  
      },[numWords, state.selectValues, state.languageCombinations, state.defaultValue, state.archiveTypeSelected])

  return (
    <div className='orders-container'>
        <OrdersPreview name={'Premiun'} numWords={numWords} numPages={numPages} deadline={deadline} value={value} multipler={state.multiplers.premiun} />
        <OrdersPreview name={'Profissional'} numWords={numWords} numPages={numPages} deadline={deadline} value={value} multipler={state.multiplers.expert} />
        <OrdersPreview name={'Economica'} numWords={numWords} numPages={numPages} deadline={deadline} value={value} multipler={state.multiplers.economy} />
    </div>
  )
}

export default OrdersContainer