import React from 'react';
import './style.css'; 
import logo from './logo.png'
import { useMainContext } from '../../../context/MainContext';
import { useNavigate } from 'react-router-dom';

const Sidebar = () => {
    const [state] = useMainContext()
    const navigate = useNavigate('/')
  return (
    <div className="sidebar">
      <img src={logo} alt="Logo" className="logo-sideBar" />
      <div className="menu-item">
        <p className="helo">Olá</p>
        <p className="name">{state.user.displayName[0]}</p>
      </div>
      <div className="menu-item" onClick={() => navigate('/')}>Home</div>
      <div className="menu-item">Logout</div>
      <div className="menu-item" onClick={() => navigate('/order')}>Projetos</div>
      <div className="menu-item" onClick={() => navigate('/')}>Iniciar novo projeto</div>
    </div>
  );
};

export default Sidebar;