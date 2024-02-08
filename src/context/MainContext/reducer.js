import * as actionTypes from './actions-types';

export const reducer = (state, action) => {
  switch (action.type) {
    case actionTypes.SETACCOUNTINFO:
      return {...state, user: action.payload}
    case actionTypes.CHANGEFILES:
      return {...state, filePending: action.payload}
    case actionTypes.CHANGEDEADLINES:
      return {...state, deadlines: action.payload}
    case actionTypes.CHANGELANGUAGESVALUES:
      return {...state, languageCombinations: action.payload}
    case actionTypes.CHANGEDEFAULTVALUE:
      return {...state, defaultValue: action.payload}
    case actionTypes.CHANGEARCHIVETYPE:
      return {...state, archiveTypeSelected: action.payload}
    case actionTypes.CHANGEARCHIVETYPES:
      return {...state, archiveTypes: action.payload}
      case actionTypes.CHANGEMULTIPLERS:
        return {...state, multiplers: action.payload}
    case actionTypes.CHANGECARTITEMS:
      return {...state, cart: action.payload}
    case actionTypes.CHANGESHOWVALUES:
      return {...state, showValues: action.payload}
    case actionTypes.CHANGESELECTED:
      return {...state, selectValues: {...state.selectValues, ...action.payload}}
    case actionTypes.CHANGEUPLOADFILES:
      return {...state, fileUpload: [...state.fileUpload, action.payload]}
    case actionTypes.RESETUPLOADFILES:
      return {...state, fileUpload: []}
    default:
      break;
  }

  return state;
};
