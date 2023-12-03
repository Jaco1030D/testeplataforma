import React from 'react'
import { Box } from '../teste'
import { useMainContext } from '../../../context/MainContext'

const Archives = () => {
    const [state] = useMainContext()
    console.log(Object.keys(state.filePending));
  return (
    <div>
        {state && Object.keys(state.filePending).map((item, index) => (
            <Box key={index} file={state.filePending[item]} origin={state.selectValues.origin} translated={state.selectValues.translation} />
        ))}
    </div>
  )
}

export default Archives