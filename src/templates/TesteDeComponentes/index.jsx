import React, { useState } from 'react';
import './style.css'; // Certifique-se de ajustar o caminho conforme necessário

const SmallRectangle = ({ withBorder, title, showDropdown }) => {
  const [isDropdownVisible, setDropdownVisible] = useState(false);

  const handleMouseEnter = () => {
    setDropdownVisible(true);
  };

  const handleMouseLeave = () => {
    setDropdownVisible(false);
  };

  return (
    <div
      className={`small-rectangle ${withBorder ? 'with-border' : ''}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className={`content-test ${showDropdown && isDropdownVisible ? 'with-dropdown' : ''}`}>
        <span>{title}</span>
      </div>
      <div className="white-part">
        {showDropdown && isDropdownVisible && (
          <div className="dropdown">
            <div onClick={() => setDropdownVisible(!isDropdownVisible)}>Download arquivos originais</div>
            <div>Download dos arquivos traduzidos</div>
          </div>
        )}
        {showDropdown && (
            <div className="button-arquivos">
            Download
            </div>
        )}
        {!showDropdown && <span>Texto 2</span>}
      </div>
    </div>
  );
};

const TesteDeComponentes = () => {
  const rectangles = [
    { withBorder: true, title: 'Número do projeto' },
    { withBorder: false, title: 'Par de idiomas' },
    { withBorder: true, title: 'Tipo' },
    { withBorder: false, title: 'Arquivos', showDropdown: true },
    { withBorder: true, title: 'Entrega' },
    { withBorder: false, title: 'Área' },
    { withBorder: false, title: 'Status' },
    { withBorder: true, title: 'Valor' },
  ];

  return (
    <div className="container-test">
      {rectangles.map((rectangle, index) => (
        <SmallRectangle
          key={index}
          withBorder={rectangle.withBorder}
          title={rectangle.title}
          showDropdown={rectangle.showDropdown}
        />
      ))}
      <div className="large-rectangle">
        {/* Content for the large rectangle */}
      </div>
    </div>
  );
};

export default TesteDeComponentes;
