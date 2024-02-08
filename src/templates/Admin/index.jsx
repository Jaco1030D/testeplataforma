import { useFetchDocuments } from '../../hooks/useFetchDocuments'
import RowTableAdmin from '../../components/others/rowTableAdmin'

const Admin = () => {
  const {documents: orders} = useFetchDocuments("archives", null, null, false, false)

  return (
    <div>
      <table className='admin-table'>
        <thead>
          <tr>
              <th>Numero do pedido</th>
              <th>Arquivo</th>
              <th>Cliente</th>
              <th>Email</th>
              <th>Inicio</th>
              <th>Data entrega</th>
              <th>traduzir de</th>
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