import { useFetchDocuments } from '../../hooks/useFetchDocuments';
import * as types from './action-types';

//Faz todas as ações necessarias no provider
export const ordersRegitered = async (dispatch, orders) => {
  const arrayOrdersPending = []
  const arrayOrdersPaid = []
  const arrayOrdersFinalized = []
  console.log('chegou aqui');

    // return [
    //     () => dispatch({ type: types.SETORDERSFINALIZED, payload: arrayOrdersFinalized }), 
    //     () => dispatch({ type: types.SETORDERSPENDING, payload: arrayOrdersPending }),
    //     () => dispatch({ type: types.SETORDERSPAID, payload: arrayOrdersPaid })
    // ]
  
};