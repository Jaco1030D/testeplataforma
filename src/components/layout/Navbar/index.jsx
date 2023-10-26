import React from 'react'
import { useAuthentication } from '../../../hooks/useAuthentication'
import { NavLink } from 'react-router-dom'


const Navbar = ({user}) => {
    const {logout} = useAuthentication()
    return (
    <nav>
        <li>
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
        {user && <li>
            <button className='navButton' onClick={logout}>Logout</button>
            </li>}
    </nav>
  )
}

export default Navbar