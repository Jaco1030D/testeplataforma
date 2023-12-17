import * as types from './action-types';

export const reducer = (state, action) => {
    switch (action.type) {
        case types.SETORDERSFINALIZED:
          return { ...state, ordersFinalized: action.payload, loading: false };
        case types.SETORDERSPAID:
          return { ...state, ordersPaid: action.payload, loading: false };
        case types.SETORDERSPENDING:
          return { ...state, ordersPending: action.payload, loading: false };
        case types.LOADING:
          return { ...state, loading: true };
        case types.ERROR:
          return { ...state, error: action.payload, loading: false};
        default:
            break;
      }
      return state;
}