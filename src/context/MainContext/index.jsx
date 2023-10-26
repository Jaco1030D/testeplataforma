import P from 'prop-types';
import { createContext, useContext, useReducer, useRef } from 'react';
import { initialState } from './data';
import { reducer } from './reducer';
import { buildActions } from './build-actions';

const Context = createContext();

export const MainContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const actions = useRef(buildActions(dispatch));

  return <Context.Provider value={[state, actions.current]}>{children}</Context.Provider>;
};

MainContextProvider.propTypes = {
  children: P.node.isRequired,
};

export const useMainContext = () => {
  const context = useContext(Context);

  if (typeof context === 'undefined') {
    throw new Error('Você esta invocando essa função fora do escopo do context');
  }

  return [...context];
};
