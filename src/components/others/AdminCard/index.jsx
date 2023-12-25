import React, { useEffect, useState } from 'react'
import { useFetchDocuments } from '../../../hooks/useFetchDocuments'
import OrdersCards from '../OrderCards';

const AdminCard = ({item}) => {
  console.log(item);
  const [orders, setOrders] = useState()
  const {documents, loading} = useFetchDocuments("archives", null, item.uid, true)

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
        <OrdersCards orders={order} admin={true} />
      </div>
    ))}
    </>
    
  )}
    </div>
  );
}

export default AdminCard