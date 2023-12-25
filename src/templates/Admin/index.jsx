import axios from 'axios'
import React, { useEffect, useState } from 'react'
import AdminCard from '../../components/others/AdminCard'
import { useFetchDocuments } from '../../hooks/useFetchDocuments'
import RowTableAdmin from '../../components/others/rowTableAdmin'
import { getInfos } from '../../hooks/useCalculateValue'

const Admin = () => {
  const [data, setData] = useState()
  const [numWordsPerPage, setNumWordsPerPage] = useState(2)

  const {documents: orders, loading} = useFetchDocuments("archives", null, null, false, false, 15)

  console.log(orders);


  const handleClick = () => {
    setNumWordsPerPage(prev => prev * 2)
    console.log(numWordsPerPage);
  }

  return (
    <div>
      <table>
        <thead>
          <tr>
              <th>Numero do pedido</th>
              <th>Nome do Arquivo</th>
              <th>Link do PDF</th>
              <th>Nome da Pessoa</th>
              <th>Email da Pessoa</th>
              <th>Data com Hora (Início)</th>
              <th>Data com Hora (Fim)</th>
              <th>traduzir para</th>
              <th>Valor</th>
              <th>Status</th>
          </tr>
        </thead>
        <tbody>

          
        {orders && orders.map((order, index) => (
          <RowTableAdmin order={order} />
          
        ))}
    </tbody>

      </table>
      
      {/* <button onClick={handleClick}>Proxima pagina</button> */}
    </div>
  )
}

export default Admin