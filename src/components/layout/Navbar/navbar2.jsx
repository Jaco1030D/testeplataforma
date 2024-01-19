import React from "react";
import "./style.css";
import imageLogo  from './turian.png'

export const MenuAutomatic = () => {
  return (
    <div className="menu-automatic">
      <div className="frame">
        <div className="turian-wrapper">
          <img className="turian" alt="Turian" src={imageLogo} />
        </div>
        <div className="div">
          <div className="div-wrapper">
            <div className="text-wrapper">Home</div>
          </div>
          <div className="frame-2">
            <div className="text-wrapper">Pedidos</div>
          </div>
          <div className="frame-2">
            <div className="text-wrapper">Tradutores</div>
          </div>
          <div className="frame-3">
            <div className="text-wrapper-2">Contato</div>
          </div>
          <div className="frame-4">
            <div className="shopee">Logout</div>
          </div>
        </div>
      </div>
    </div>
  );
};
