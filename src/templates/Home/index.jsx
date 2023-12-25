import { useState } from 'react';
import './styles.css';
import DropIntput from '../../components/others/DropInput/index.jsx';
import Inputs from '../../components/others/Inputs/index.jsx';
import { useMainContext } from '../../context/MainContext/index.jsx';
import Archives from '../../components/others/archives/index.jsx';
import Deadlines from '../../components/others/deadlines/index.jsx';
import axios from 'axios';

// const languagesOrigin = [
//   { value: 0, label: "Português" },
//   { value: 0, label: "Inglês" },
//   { value: 0, label: "Espanhol" },
//   { value: 0, label: "Francês" },
//   { value: 0, label: "Alemão" },
//   { value: 0, label: "Italiano" },
//   { value: 0, label: "Holandês" },
//   { value: 0, label: "Russo" },
//   { value: 0, label: "Japonês" },
//   { value: 0, label: "Chinês (Simplificado)" },
//   { value: 0, label: "Árabe" },
//   { value: 0, label: "Hindi" },
//   { value: 0, label: "Coreano" },
//   { value: 0, label: "Turco" },
//   { value: 0, label: "Sueco" },
//   { value: 0, label: "Polonês" },
//   { value: 0, label: "Vietnamita" },
//   { value: 0, label: "Tailandês" },
//   { value: 0, label: "Grego" },
//   { value: 0, label: "Dinamarquês"}
// ]

function Home() {
  const [state, actions] = useMainContext()
  console.log(state);

  return (
    <div className='app'>
      <DropIntput />
      <Inputs />
      <Deadlines selectedValue={state.deadlines} actionState={actions.changeDeadlines} />
      {
      state.archiveTypeSelected !== "Área certificada" && 
      state.filePending.length !== 0 && 
      state.selectValues.translation.length !== 0 && 
      state.selectValues.origin !== "" && 
      state.archiveTypeSelected !== "" && 
      <Archives /> 
      }
      {state.archiveTypeSelected === "Área certificada" && <p>Não trabalhamos com este tipo de arquivo ainda ainda</p>}
    </div>
  )
}

export default Home;
