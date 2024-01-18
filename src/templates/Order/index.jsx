import React, { useEffect, useMemo, useState } from 'react'
import StripeCheckout from 'react-stripe-checkout';
import './styles.css'
import Button from '../../components/others/Button';
import { useFetchDocuments } from '../../hooks/useFetchDocuments';
import { useMainContext } from '../../context/MainContext';
import { Link } from 'react-router-dom';
import OrdersCards from '../../components/others/OrderCards';

// const getValues = (uid) => {
//   const{documents: orders, loading} = useFetchDocuments("archives", null, uid)

//   return {orders, loading}
// }

const Order = () => {
  const [state] = useMainContext()
  console.log(state);

  const {documents: orders, loading} = useFetchDocuments("archives", null, state.user?.uid)
  console.log(orders);
  const paid = orders?.filter(doc => doc.paymentInfos.statusURL === "complete" && doc.finalized === false)
  const pending = orders?.filter(doc => doc.paymentInfos.statusURL === "open")
  const finalized = orders?.filter(doc => doc.finalized === true)
  if (loading) {
    return <p>Carregando...</p>
  }

      return (
        <div className='orders'>
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
        <h2>não pagos</h2>
        {pending && pending.map((order) => (
          <div>
            <OrdersCards orders={order} />
          </div>
        ))}
        </div>
        <div>
        <h2>Pagos</h2>
        {paid && paid.map((order) => (
          <div>
            <OrdersCards orders={order} />
          </div>
        ))}
        </div>
        <div>
        <h2>Finalizados</h2>
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