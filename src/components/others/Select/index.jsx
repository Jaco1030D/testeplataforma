import React, { useEffect, useRef, useState } from 'react';
import './styles.css';


const Item = ({ name, isSelected, handleItemClick, checked, item }) => {
  return (
    <li className={`item ${isSelected || checked === name ? 'checked' : ''}`} id={name} onClick={() => handleItemClick(item)}>
      <span className="checkbox">
        <i className="fa-solid fa-check check-icon"></i>
      </span>
      <span className="item-text">{name}</span>
    </li>
  );
};

const SelectInput = ({ languages, update, name, id, title, oneElement = false, values = '' }) => {
  const [openFirst, setOpenFirst] = useState(false);
  const selectRef = useRef(null);
  const [selectedItem, setSelectedItem] = useState(null);

  const handleClick = () => {
    setOpenFirst((prev) => !prev);
  };

  const handleItemClick = (clickedItem) => {
    console.log(clickedItem.name);
    setSelectedItem(clickedItem.name === selectedItem ? selectedItem : (clickedItem.name || clickedItem));
    update({[name]: clickedItem})
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (selectRef.current && !selectRef.current.contains(e.target)) {
        setOpenFirst(false);
      }
    };

    if (openFirst) {
      document.addEventListener('click', handleClickOutside);
    } else {
      document.removeEventListener('click', handleClickOutside);
    }

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [openFirst]);

  return (
    <div className="select-input" ref={selectRef}>
      <div className={`select select-btn ${openFirst && 'open'}`} onClick={handleClick}>
        <span className="btn-text">{title} {selectedItem || values}</span>
      </div>
      <ul className="list-items" id={id}>
        {languages.map((item, index) => (
          <Item
            key={index}
            name={item.name || item}
            id={id}
            isSelected={selectedItem === item.name}
            item={item}
            handleItemClick={handleItemClick}
            checked={values}
          />
        ))}
      </ul>
    </div>
  );
};

export default SelectInput;
