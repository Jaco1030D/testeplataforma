import React from 'react'
import './style.css'
import { useMainContext } from '../../../context/MainContext'
import icon from './icon.svg'

const 
InputArchive = ({handleClose}) => {
    const [state, action] = useMainContext()

    const handleClick = (item) => {
        action.changeArchiveType(item)
        handleClose()
    }
  return (
    <div className="destinoidiomas">
      <div className="content-list-archive">
        <div className={`header-list-archive ${!state.archiveTypeSelected.name && 'selected'}`}>
            <p>Escolha na lista</p>
        </div>
        {state.archiveTypes && state.archiveTypes.map((item) => (
            <div key={item.name} onClick={() => handleClick(item)} className={`item-list-archive ${state.archiveTypeSelected.name === item.name && 'selected'}`}>
                <img src={item.icon} alt="" />
                <p>{item.name}</p>
            </div>
        ))}
        
      </div>
    </div>
  )
}

export default InputArchive