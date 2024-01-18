import React, { useEffect, useState } from 'react'
import { useAuthentication } from '../../../hooks/useAuthentication'
import { NavLink } from 'react-router-dom'
import { useMainContext } from '../../../context/MainContext'

const Navbar = ({user, isAdmin, name, setName}) => {
    const [state, actions] = useMainContext()
    const {logout} = useAuthentication()
    const handleClick = () => {
        logout()
        actions.setAccountInfo(null)
        setName('')
    }
    return (
    <nav>
        {isAdmin ? (
        <div>

            <li>
                <NavLink to='/admin'>Todos pedidos</NavLink>
            </li>

            <li>
                <NavLink to='/config'>Configurações</NavLink>
            </li>

            <li>
                <button className='navButton' onClick={logout}>Logout</button>
            </li>

        </div>
        ) : (
           <>
           <li>{name || state?.user?.displayName}</li>
        <div>
        <li>
            <NavLink to='/'>Home</NavLink>
        </li>
        {/* <li>
            <NavLink to='/users'>Todos usuarios</NavLink>
        </li> */}
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
            <>
                <li>
                    <NavLink to='/order'>Pedidos</NavLink>
                </li>
                <li>
                    <button className='navButton' onClick={handleClick}>Logout</button>
                </li>
            </>
        }
        </div>
           </>
           )}
    </nav>
  )
}

export default Navbar