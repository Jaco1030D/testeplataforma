import React from 'react'
import './style.css'
import { useMainContext } from '../../../context/MainContext'


const InputArchive = ({handleClose, icons}) => {
    const [state, action] = useMainContext()

    const handleClick = (item, index) => {
        action.changeArchiveType({...item, index})
        handleClose()
    }
  return (
    <div className="destinoidiomas">
      <div className="content-list-archive">
        <div className={`header-list-archive ${!state.archiveTypeSelected.name && 'selected'}`}>
            <p>Escolha na lista</p>
        </div>
        {state.archiveTypes && state.archiveTypes.map((item, index) => (
            <div key={item.name} onClick={() => handleClick(item, index)} className={`item-list-archive ${state.archiveTypeSelected.name === item.name && 'selected'}`}>
                <img src={icons[index]} alt="" />
                <p>{item.name}</p>
            </div>
        ))}
        
      </div>
    </div>
  )
}

export default InputArchive