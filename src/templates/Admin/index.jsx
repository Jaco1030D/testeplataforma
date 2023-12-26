import { useFetchDocuments } from '../../hooks/useFetchDocuments'
import RowTableAdmin from '../../components/others/rowTableAdmin'

const Admin = () => {
  const {documents: orders} = useFetchDocuments("archives", null, null, false, false)

  console.log(orders);


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