import * as actionTypes from './actions-types';

export const reducer = (state, action) => {
  switch (action.type) {
    case actionTypes.SETACCOUNTINFO:
      return {...state, user: action.payload}
    case actionTypes.CHANGEFILES:
      return {...state, filePending: action.payload}
    case actionTypes.CHANGEDEADLINES:
      return {...state, deadlines: action.payload}
    case actionTypes.CHANGESELECTED:
      console.log(action.payload);
      return {...state, selectValues: {...state.selectValues, ...action.payload}}
    default:
      break;
  }

  return state;
};
