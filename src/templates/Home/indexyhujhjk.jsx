import { useState } from 'react';
import './styles.css';
import DropIntput from '../../components/others/DropInput/index.jsx';
import Inputs from '../../components/others/Inputs/index.jsx';
import { useMainContext } from '../../context/MainContext/index.jsx';
import Archives from '../../components/others/archives/index.jsx';
import Deadlines from '../../components/others/deadlines/index.jsx';
import axios from 'axios';
import OrdersContainer from '../../components/others/ordersContainer/index.jsx';

function Home({user}) {
  const [state, actions] = useMainContext()
  const [showValue, setShowValue] = useState(false)
  console.log(state);

  return (
    <div className='app'>
      <DropIntput />
      <Inputs showValue={state.showValues} setShowValue={actions.changeShowValues} />
      {
      state.showValues &&
      <OrdersContainer /> 
      }
      {state.archiveTypeSelected.name === "Área certificada" && <p>Não trabalhamos com este tipo de arquivo ainda ainda</p>}
    </div>
  )
}

export default Home;
