import React, { useEffect, useMemo } from 'react'
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

  const {documents: orders, loading} = useFetchDocuments("archives", null, state.user.uid)

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

export default Order