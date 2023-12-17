import React from 'react'
import { Box } from '../teste'
import { useMainContext } from '../../../context/MainContext'
import FileCard from '../filesCard'

const Archives = () => {
    const [state] = useMainContext()
    console.log(Object.keys(state.filePending));
  return (
    <div>
      <FileCard />
        {/* <Box file={state.filePending[0]} origin={state.selectValues.origin} translated={state.selectValues.translation} /> */}
    </div>
  )
}

export default Archives