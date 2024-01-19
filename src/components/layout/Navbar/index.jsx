import React, { useState } from 'react'
import imageLogo  from './turian.png'
import { NavLink } from 'react-router-dom'
import { useMainContext } from '../../../context/MainContext'
import { useAuthentication } from '../../../hooks/useAuthentication'
import 'boxicons'

const Navbar = ({user, isAdmin, name, setName, hidden}) => {
  const [state, actions] = useMainContext()
  const [openMenu, setOpenMenu] = useState(false)
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
            <div className="container_image">
                <img className="logo" alt="Turian" src={imageLogo} />
            </div>
            <label className='icon' onClick={handleOpenMenu}>
              {openMenu ? (
                <box-icon name='x'></box-icon>
              ) : (
                <box-icon name='menu'></box-icon>
              )}
            </label>
            {!hidden && 
            <nav className={`menu_itens ${openMenu && 'flex'}`} onClick={handleOpenMenu}>
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
                <li id='home'>
                  <NavLink to='/'>Home</NavLink>
                </li>
                {!user && (
                    <>
                        <li>
                            <NavLink to='/login'>Login</NavLink>
                        </li>
                        <li>
                            <NavLink to='/register'>Registrar</NavLink>
                        </li>
                    </>
                ) }

                {user && 
                  <li>
                      <NavLink to='/order'>Pedidos</NavLink>
                  </li>
                }
                </>
              )}
                <li>Tradutores</li>
                
                <li id='contrast'>Contato</li>

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