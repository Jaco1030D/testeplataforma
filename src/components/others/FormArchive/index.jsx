import React, { useState } from 'react'
import './style.css'
import arrow from './arrow.svg'
import { useMainContext } from '../../../context/MainContext'
import arrowDown from './arrow-down.svg'
import Modal from '@mui/material/Modal';
import InputSelect from '../inputsSelect'
import InputDrop from '../InputDrop'
import InputSelectMultiple from '../inputSelectMultiple'
import InputArchive from '../InputArchive'
import carro from './icons/carro.svg';
import circumMedicalCase from './icons/circum_medical-case.svg';
import iconMidias from './icons/icon midias.svg';
import iconApp from './icons/iconapp.svg';
import iconConciencia from './icons/iconciencia.svg';
import iconEnergia from './icons/iconenergia.svg';
import iconEngenharia from './icons/iconengenharia.svg';
import iconOirLearning from './icons/iconoir_learning.svg';
import icons8Buy from './icons/icons8_buy.svg';
import iconSoftweare from './icons/iconsoftweare.svg';
import iconTecnica from './icons/icontecnica.svg';
import iconTurismo from './icons/iconturismo.svg';
import mala from './icons/mala.svg';
import megafone from './icons/megafone.svg';
import iconClosedCaptioning from './icons/icon _Closed Captioning_.svg';
import iconGameConsole from './icons/icon _Game console_.svg';
import iconJustice from './icons/icon _Justice_.svg';
import iconUsdCircle from './icons/icon _usd-circle_.svg';
import AttentionCard from '../../layout/AttentionCard'

const icons = [
  iconApp,
  carro,
  iconConciencia,
  icons8Buy,
  iconEnergia,
  iconEngenharia,
  iconUsdCircle,
  iconGameConsole,
  mala,
  iconJustice,
  iconClosedCaptioning,
  megafone,
  circumMedicalCase,
  iconMidias,
  iconSoftweare,
  iconTecnica,
  iconOirLearning,
  iconTurismo,
];

const FormArchive = () => {
  const [state, actions] = useMainContext()
  const [currentComponent, setCurrentComponent] = useState()
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  const handleScroll = async () => {
    if (!state.archiveTypeSelected?.name) {
      handleOpen(4, 'Escolha a area de conteudo do arquivo')
    } else 
    if (state.archiveTypeSelected.name === 'Juramentada /Certificada') {
      handleOpen(4)
    } else
    if (!state.selectValues.origin || state.selectValues.translation.length === 0) {
      handleOpen(4, 'Escolha os idiomas')
    } else 
    if (state.filePending.length === 0) {
      handleOpen(4, 'Coloque pelo menos 1 arquivo')
    } else
    {
      await actions.changeShowValues(true)
      const elementoDestino = document.getElementById('container_values');

      if (elementoDestino) {
        elementoDestino.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
      }
    }
    
  }

  const displayLanguages = (array, x) => {

    let display

    if (array.length > x) {

      const newLayout = array.slice(0, x)

      display = `${newLayout.join(", ")} +${array.length - x}`

    } else {

      display = array.join(", ")

    }

    return display
  }

  
  const handleOpen = (num, text) => {
    const handleClick = () => {
      console.log('entrou');
      setOpen(false)
    }
    const elements = [
      <InputDrop handleClose={() => handleClick()} />,
      <InputSelectMultiple handleClose={() => handleClose()}  />,
      // <SelectInputMultiple languages={state.languages} id={'translation'} title='Traduzir para' values={state.selectValues.origin} name='translation' update={update}/>,
      <InputSelect handleClose={() => handleClick()}  />,
      <InputArchive icons={icons} handleClose={() => handleClick()} />,
      <AttentionCard text={text || 'Atualmente, ainda não estamos trabalhando com Juramentada. Em breve ofereceremos este serviço.'} />
      
    ]
    setCurrentComponent(elements[num])

    setOpen(true)
  }
  return (
    <div className="container-form">
      <div className="techdesolicitacao">
        <div className="upload flex-correction pointer" onClick={() => handleOpen(0)}>
          <div className="text-wrapper">{state.filePending ? `${state.filePending.length} arquivo(s) adicionado` : 'Clique para buscar'}</div>
          <img className="img" alt="Upload" src={arrow} />
        </div>
        <div className="div">Upload de Arquivos</div>
        <div className="listadestino flex-correction pointer" onClick={() => handleOpen(1)}>
          <div className="text-wrapper">{(state.selectValues.translation && displayLanguages(state.selectValues.translation, 8)) || 'Selecione'}</div>
          <img className="img" alt="Frame" src={arrow} />
        </div>
        <div className="text-wrapper-3">Traduza para</div>
        <div className="listaorigem flex-correction pointer" onClick={() => handleOpen(2)}>
          <div className="text-wrapper">{state.selectValues.origin || 'Selecione'}</div>
          <img className="img" alt="Frame" src={arrow} />
        </div>
        <div className="text-wrapper-5">Idioma de Origem</div>
        <div className="listaareas flex-correction pointer" onClick={() => handleOpen(3)}>
        <div className="text-wrapper flex-correction-archive text-first" style={{color: '#000'}}> <img src={icons[state.archiveTypeSelected.index]} alt={state.archiveTypeSelected.name} /> {state.archiveTypeSelected.name || 'Escolha na lista'}</div>
          <img className="img" alt="Frame" src={arrow} />
        </div>
        <p className="p">Sobre o que é seu conteúdo?</p>
      </div>
      <Modal
      open={open}
      onClose={handleClose}   >
      <div>
      {currentComponent}
      </div>
      </Modal>
      <button onClick={handleScroll} className='show-values_button'>Mostrar Preços <img src={arrowDown} alt="" /></button>
    </div>
  )
}

export default FormArchive