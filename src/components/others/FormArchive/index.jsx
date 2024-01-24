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

const FormArchive = () => {
  const [state, actions] = useMainContext()
  const [currentComponent, setCurrentComponent] = useState()
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  const handleScroll = async () => {

    await actions.changeShowValues(true)
    const elementoDestino = document.getElementById('container_values');

    if (elementoDestino) {
      elementoDestino.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
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

  
  const handleOpen = (num) => {
    const handleClick = () => {
      console.log('entrou');
      setOpen(false)
    }
    const elements = [
      <InputDrop handleClose={() => handleClick()} />,
      <InputSelectMultiple handleClose={() => handleClose()}  />,
      // <SelectInputMultiple languages={state.languages} id={'translation'} title='Traduzir para' values={state.selectValues.origin} name='translation' update={update}/>,
      <InputSelect handleClose={() => handleClick()}  />,
      <InputArchive handleClose={() => handleClick()} />
      
    ]
    setCurrentComponent(elements[num])

    setOpen(true)
  }
  return (
    <div className="container-form">
      <div className="techdesolicitacao">
        <div className="upload pointer" onClick={() => handleOpen(0)}>
          <div className="text-wrapper">{state.filePending ? `${state.filePending.length} arquivo(s) adicionado` : 'Clique para buscar'}</div>
          <img className="img" alt="Upload" src={arrow} />
        </div>
        <div className="div">Upload de Arquivos</div>
        <div className="listadestino pointer" onClick={() => handleOpen(1)}>
          <div className="text-wrapper-2">{(state.selectValues.translation && displayLanguages(state.selectValues.translation, 8)) || 'Selecione'}</div>
          <img className="img" alt="Frame" src={arrow} />
        </div>
        <div className="text-wrapper-3">Traduza para</div>
        <div className="listaorigem pointer" onClick={() => handleOpen(2)}>
          <div className="text-wrapper-4">{state.selectValues.origin || 'Selecione'}</div>
          <img className="img" alt="Frame" src={arrow} />
        </div>
        <div className="text-wrapper-5">Idioma de Origem</div>
        <div className="listaareas pointer" onClick={() => handleOpen(3)}>
        <div className="text-wrapper-4">{state.archiveTypeSelected.name || 'Escolha na lista'}</div>
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
      <button onClick={handleScroll} className='show-values_button'>Mostrar preço <img src={arrowDown} alt="" /></button>
    </div>
  )
}

export default FormArchive