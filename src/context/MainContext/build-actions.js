import * as actionTypes from './actions-types';

export const buildActions = (dispatch) => {

  return {
    setAccountInfo: (payload) => dispatch({ type: actionTypes.SETACCOUNTINFO, payload }),
    changeFiles: (payload) => dispatch({type: actionTypes.CHANGEFILES, payload}),
    changeSelectedLanguages: (payload) => dispatch({type: actionTypes.CHANGESELECTED, payload}),
    changeDeadlines: (payload) => dispatch({type: actionTypes.CHANGEDEADLINES, payload}),
    changeArchiveType: (payload) => dispatch({type: actionTypes.CHANGEARCHIVETYPE, payload})
  };
};
