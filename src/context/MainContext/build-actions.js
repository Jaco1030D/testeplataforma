import * as actionTypes from './actions-types';

export const buildActions = (dispatch) => {
  return {
    action: () => dispatch({ type: actionTypes.ACTION }),
  };
};
