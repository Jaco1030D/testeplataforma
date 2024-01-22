import React, { useState } from 'react'
import imageLogo  from './turian.png'
import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import { useMainContext } from '../../../context/MainContext'
import { useAuthentication } from '../../../hooks/useAuthentication'
import 'boxicons'

const Navbar = ({user, isAdmin, name, setName, hidden}) => {
  const [state, actions] = useMainContext()
  const [openMenu, setOpenMenu] = useState(false)

  const location = useLocation();

  const isLoginPage = location.pathname === '/login';
  const isRegisterPage = location.pathname === '/register';

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
    <header>
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
            {!hidden && 
            <nav className={`menu_itens ${openMenu && 'open-dropMenu'}`} onClick={handleOpenMenu}>
              {isAdmin ? (
                <>
                  <li>
                      <NavLink to='/admin'>Todos pedidos</NavLink>
                  </li>

                  <li>
                      <NavLink to='/config'>Configurações</NavLink>
                  </li>

                  <li>
                      <button className='navButton' onClick={logout}>Logout</button>
                  </li>
                </>
              ) : (
                <>
                {!isLoginPage && !isRegisterPage && 
                  <li id='home'>
                  <NavLink to='/'>Home</NavLink>
                </li>
                }
                {/* {!user && (
                    <>
                        <li>
                            <NavLink to='/login'>Login</NavLink>
                        </li>
                        <li>
                            <NavLink to='/register'>Registrar</NavLink>
                        </li>
                    </>
                ) } */}

                {user && 
                  <li>
                      <NavLink to='/order'>Pedidos</NavLink>
                  </li>
                }
                </>
              )}
              {!isLoginPage && !isRegisterPage &&
                <>
                <li>Tradutores</li>
                
                <li id='contrast'>Contato</li>
                </>
              }
                

                {user && 

                  <li onClick={handleClick}>logout</li>

                }
                
            </nav>
            }
        </div>
    </header>
  )
}

export default Navbar