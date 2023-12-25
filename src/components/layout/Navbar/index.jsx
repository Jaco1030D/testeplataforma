import React from 'react'
import { useAuthentication } from '../../../hooks/useAuthentication'
import { NavLink } from 'react-router-dom'
import { useMainContext } from '../../../context/MainContext'

const Navbar = ({user, isAdmin}) => {
    const [state, actions] = useMainContext()
    const {logout} = useAuthentication()
    const handleClick = () => {
        logout()
        actions.setAccountInfo(null)
        
    }
    return (
    <nav>
        {isAdmin ? (
        <div>

            <li>
                <NavLink to='/admin'>Todos usuarios</NavLink>
            </li>

            <li>
                <button className='navButton' onClick={logout}>Logout</button>
            </li>

        </div>
        ) : (
           <>
           <li>{user?.displayName || ''}</li>
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