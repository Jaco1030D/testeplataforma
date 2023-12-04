import React, { useEffect, useState } from 'react'
import Home from './templates/Home';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Login from './templates/Login';
import Register from './templates/Register';
import { useAuthentication } from './hooks/useAuthentication.js';
import { onAuthStateChanged } from 'firebase/auth';
import Navbar from './components/layout/Navbar/index.jsx';
import { useMainContext } from './context/MainContext/index.jsx';
import Order from './templates/Order/index.jsx';
import Admin from './templates/Admin/index.jsx';

const App = () => {
    const [state, actions] = useMainContext()
    const [user, setUser] = useState(undefined)
    const {auth} = useAuthentication()
    const [isAdmin, setIsAdmin] = useState(false)
    const  loadingUser = user === undefined

    useEffect(() =>{
        onAuthStateChanged(auth, (user) =>{
        setUser(user)
        if(user !== null) {
          user.email === process.env.REACT_APP_ADMIN_EMAIL && setIsAdmin(true)
        } else {
          setIsAdmin(false)
        }
        actions.setAccountInfo(user)
        })
    }, [auth, actions])
    console.log(state);
    if (loadingUser) {
      return (
        <div>
            <span>Carregando Alterações</span>
          </div>
      )
    }
  return (
    <div>
          <BrowserRouter>
            <Navbar user={user} isAdmin={isAdmin} />
            <Routes>
            {isAdmin ? (
              <>
              <Route path='/' element={<Admin user={user} loadingUser={loadingUser}/>} />
              <Route path='*' element={<Navigate to="/" />} />
              </>
            ) : (
              
              <>
              <Route path='/' element={<Home user={user} loadingUser={loadingUser}/>} />

              <Route path='/order' element={
                user ? <Order/> : <Navigate to="/login" />
              } />
              <Route path='/login' element={
                  !user ? <Login/> : <Navigate to="/" />
                }/>
              <Route path='/register' element={
                  !user ? <Register setUser={setUser}/> : <Navigate to="/" />
                  }/>
              <Route path='/admin' element={
                  !user ? <Admin isAdmin={isAdmin}/> : <Navigate to="/" />
                  }/>
              </>
            )}
            <Route path='/*' element={<Navigate to={'/'}/>} />
            </Routes>
          </BrowserRouter>
    </div>
  )
}

export default App