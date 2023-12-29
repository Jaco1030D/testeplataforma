import React, { useEffect, useState } from 'react'
import { useUpdateDocument } from '../../hooks/useUpdateDocument'

const Config = () => {
  const [numWords, setNumWords] = useState()
  const [numHours, setNumHours] = useState()
  const [baseDeadline, setBaseDeadline] = useState()
  const {updateDocument, response} = useUpdateDocument("configSenting")
  const [message] = useState(response.error)

  const handleSubmit = async (e) => {
    e.preventDefault()

    const config = {
      numHours,
      numWords,
      baseDeadline
    }

    const result = await updateDocument('2963', config)

    console.log(result);

  }
  useEffect(() => {

    console.log(response);

  }, [response])
  return (
    <div>
        <form onSubmit={handleSubmit}>
            horas base
            <input type="number" value={baseDeadline} onChange={(e) => setBaseDeadline(e.target.value)} />
            atualizar a cada
            <input type="number" value={numWords} onChange={(e) => setNumWords(e.target.value)} />
            palavras
            é adicionado
            <input type="number" value={numHours} onChange={(e) => setNumHours(e.target.value)} />
            horas

            <button>Atualizar dados</button>
        </form>
        <p>{message}</p>
    </div>
  )
}

export default Config