import { createContext, useContext, useReducer } from 'react';
import { reducer } from './reducer';
import { data } from './data';

const OrdersContext = createContext()

export const OredersProvider = ({ children }) => {
  const [ordersState, ordersDispatch] = useReducer(reducer, data);
  return <OrdersContext.Provider value={{ ordersState, ordersDispatch }}>{children}</OrdersContext.Provider>;
};

export const useMainContext = () => {
    const context = useContext(OrdersContext);
  
    if (typeof context === 'undefined') {
      throw new Error('Você esta invocando essa função fora do escopo do context');
    }
  
    return [...context];
};