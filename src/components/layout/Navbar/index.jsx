import React, { useState } from 'react'
import imageLogo  from './turian.png'
import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import { useMainContext } from '../../../context/MainContext'
import { useAuthentication } from '../../../hooks/useAuthentication'
import 'boxicons'
import userImage from './User.svg'
import './style.css'

const Navbar = ({user, isAdmin, name, setName, hidden, hiddenNavbar = false}) => {
  const [state, actions] = useMainContext()
  const [openMenu, setOpenMenu] = useState(false)

  const location = useLocation();

  const isLoginPage = location.pathname === '/login';
  const isRegisterPage = location.pathname === '/register';
  console.log(location.pathname);
  const isCheckoutPage = location.pathname.includes('/checkout')

  const navigate = useNavigate()
    const {logout} = useAuthentication()
    const handleClick = () => {
        logout()
        actions.setAccountInfo(null)
        setName('')
    }
    const handleOpenMenu = () => {
      setOpenMenu(!openMenu)
    }
  return (
    <header style={{backgroundColor: `${isCheckoutPage ? '#fff' : '' }`, display: `${hiddenNavbar ? 'none' : ''}` }}>
  <div className="content_navbar">
    <div className="container_image pointer">
      <img className="logo" alt="Turian" onClick={() => navigate('/')} src={imageLogo} />
    </div>
    <label className='icon' onClick={handleOpenMenu}>
      {openMenu ? (
        <box-icon name='x'></box-icon>
      ) : (
        <box-icon name='menu'></box-icon>
      )}
    </label>
    {!hidden && (
      <nav className={`menu_itens ${openMenu && 'open-dropMenu'}`} onClick={handleOpenMenu}>
        {isAdmin ? (
          <>
            <li>
              <NavLink to='/admin'>Todos pedidos</NavLink>
            </li>
            <li>
              <NavLink to='/config'>Configurações</NavLink>
            </li>
          </>
        ) : (
          <>
            {!isLoginPage && !isRegisterPage && !isCheckoutPage && (
              <li id='home'>
                <NavLink to='/'>Home</NavLink>
              </li>
            )}
            {user && !isCheckoutPage && (
              <li>
                <NavLink to='/order'>Pedidos</NavLink>
              </li>
            )}
          </>
        )}
        {!isLoginPage && !isRegisterPage && !isCheckoutPage && !isAdmin && (
          <>
            <li>Tradutores</li>
            <li id='contrast'>Contato</li>
          </>
        )}
        {user && !isCheckoutPage && (
          <li onClick={handleClick}>logout</li>
        )}
        {isCheckoutPage && (
          <>
          <li><img src={userImage} alt="" /></li>
          <li>{state.user?.displayName || name}</li>
          </>
        )}
      </nav>
    )}
  </div>
</header>
  )
}

export default Navbar