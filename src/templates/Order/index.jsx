import React, { useEffect, useMemo, useState } from 'react'
import StripeCheckout from 'react-stripe-checkout';
import './styles.css'
import Button from '../../components/others/Button';
import { useFetchDocuments } from '../../hooks/useFetchDocuments';
import { useMainContext } from '../../context/MainContext';
import { Link } from 'react-router-dom';
import OrdersCards from '../../components/others/OrderCards';
import OrderCard from '../../components/others/OrderCard';
import Sidebar from '../../components/layout/SideBar';

// const getValues = (uid) => {
//   const{documents: orders, loading} = useFetchDocuments("archives", null, uid)

//   return {orders, loading}
// }

const apiUrl = 'https://api.stripe.com/v1/checkout/sessions/'

const token = 'sk_test_51OF205HR5yfE4YaFBUT1a4yatFHaX5PYhlFa4mpqRSadaqYngNuWDm9lBqQSgTykKZx519Xb4fMcFn1dZthlKgrK00AwSyXZQx'

const Order = ({name, setHiddenNavbar}) => {
  const [state] = useMainContext()
  console.log(state);

  const {documents: orders, loading} = useFetchDocuments("archives", null, state.user?.uid)
  console.log(orders);
  useEffect(() => {
    setHiddenNavbar(true)

    return () => {
      setHiddenNavbar(false)
    }
  },[])
  if (loading) {
    return <p>Carregando...</p>
  }
      return (
        <div className='orders-main'>
          <Sidebar name={name} />
          <div className='orders-container'>
            <h1 className='orders-title'>Meus Projetos</h1>
          {orders && orders.length === 0 ? (
        < >
          <p>Não foram encontrados Projetos</p>
          <Link to='/' className='btn'>
            Faça um pedido
          </Link>
        </>
      ) : (
        <div className='orders-content'>
          {orders && orders.map((item, index) => (
            <OrderCard order={item} />
          ))}
        </div> 
        
      )}
          </div>
        </div>
      );
}

export default Order