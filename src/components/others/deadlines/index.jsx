import React from 'react'
import './style.css';


const Deadlines = ({selectedValue, actionState}) => {
    const handleRadioChange = (event) => {
        actionState(event.target.value);
      };
  return (
    <div className='deadlines-container'>
        <input type="radio"
          value="option1"
          checked={selectedValue === 'option1'}
          onChange={handleRadioChange} 
        /> <label htmlFor="">2 dias</label>

        <input type="radio"
          value="option2"
          checked={selectedValue === 'option2'}
          onChange={handleRadioChange} 
        /> 
        <label htmlFor="">5 dias</label>

        <input type="radio"
          value="option3"
          checked={selectedValue === 'option3'}
          onChange={handleRadioChange} 
        /> 
        <label htmlFor="">9 dias</label>
    </div>
  )
}

export default Deadlines