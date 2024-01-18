import * as actionTypes from './actions-types';

export const buildActions = (dispatch) => {

  return {
    setAccountInfo: (payload) => dispatch({ type: actionTypes.SETACCOUNTINFO, payload }),
    changeFiles: (payload) => dispatch({type: actionTypes.CHANGEFILES, payload}),
    changeSelectedLanguages: (payload) => dispatch({type: actionTypes.CHANGESELECTED, payload}),
    changeDeadlines: (payload) => dispatch({type: actionTypes.CHANGEDEADLINES, payload}),
    changeArchiveType: (payload) => dispatch({type: actionTypes.CHANGEARCHIVETYPE, payload}),
    changeLanguageValues: (payload) => dispatch({type: actionTypes.CHANGELANGUAGESVALUES, payload}),
    changeDefaultValue: (payload) => dispatch({type: actionTypes.CHANGEDEFAULTVALUE, payload}),
    changeMultiplers: (payload) => dispatch({type: actionTypes.CHANGEMULTIPLERS, payload}),
    changeArchiveTypes: (payload) => dispatch({type: actionTypes.CHANGEARCHIVETYPES, payload}),
    changeCartItems: (payload) => dispatch({type: actionTypes.CHANGECARTITEMS, payload}),
    changeShowValues: (payload) => dispatch({type: actionTypes.CHANGESHOWVALUES, payload})
  };
};
