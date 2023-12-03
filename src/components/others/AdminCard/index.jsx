import React, { useEffect, useState } from 'react'
import { useFetchDocuments } from '../../../hooks/useFetchDocuments'
import OrdersCards from '../OrderCards';

const AdminCard = ({uid}) => {
  const [orders, setOrders] = useState()
  const {documents, loading} = useFetchDocuments("archives", null, uid, true)
  console.log(uid, orders);

  useEffect(() => {
    if (documents) {
      setOrders(documents);
    }
  },[documents])

  if (loading) {
    return (
      <div>
          <span>Carregando Alterações</span>
        </div>
    )
  }

  return (
    <div className='forms'>
      {orders && orders.length === 0 ? (
    <div >
      <p>Não foram encontrados orders desse usuario</p>
    </div>
  ) : (
    <>
    { orders && orders.map((order) => (
      <div key={order.id} >
        <OrdersCards orders={order} />
      </div>
    ))}
    </>
    
  )}
    </div>
  );
}

export default AdminCard