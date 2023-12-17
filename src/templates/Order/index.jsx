import React, { useEffect, useMemo, useState } from 'react'
import StripeCheckout from 'react-stripe-checkout';
import './styles.css'
import Button from '../../components/others/Button';
import { useFetchDocuments } from '../../hooks/useFetchDocuments';
import { useMainContext } from '../../context/MainContext';
import { Link } from 'react-router-dom';
import OrdersCards from '../../components/others/OrderCards';
import { ordersRegitered } from '../../context/OrdersContext/build-actions';

// const getValues = (uid) => {
//   const{documents: orders, loading} = useFetchDocuments("archives", null, uid)

//   return {orders, loading}
// }

const Order = () => {
  const [state] = useMainContext()

  const {documents: orders, loading} = useFetchDocuments("archives", null, state.user.uid)
console.log(orders);
  const paid = orders?.filter(doc => doc.status === "complete")
  const pending = orders?.filter(doc => doc.status === "open")
  const finalized = orders?.filter(doc => doc.finalized === true)

  useEffect(() => {
    orders && ordersRegitered()
  },[orders])

  if (loading) {
    return <p>Carregando...</p>
  }

      return (
        <div className='forms'>
          {orders && orders.length === 0 ? (
        <div >
          <p>Não foram encontrados orders</p>
          <Link to='/' className='btn'>
            Faça um pedido
          </Link>
        </div>
      ) : (
        <div className='container-itens'>
        
        <div>
          {paid && paid.map((order) => (
            <div>
              <OrdersCards orders={order} />
            </div>
          ))}
        </div>
        <div>
        {pending && pending.map((order) => (
            <div>
              <OrdersCards orders={order} />
            </div>
          ))}
        </div>
        <div>
        {finalized && finalized.map((order) => (
            <div>
              <OrdersCards orders={order} />
            </div>
          ))}
        </div>
        
        {/* { orders && orders.map((order) => (
          <div key={order.id} >
            <OrdersCards orders={order} />
          </div>
        ))} */}
        </div>
        
      )}
        </div>
      );
}

export default Order