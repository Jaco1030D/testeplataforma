import React, { useEffect, useState } from 'react'
import Home from './templates/Home.js';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Login from './templates/Login.js';
import Register from './templates/Register.js';
import { useAuthentication } from './hooks/useAuthentication.js';
import { onAuthStateChanged } from 'firebase/auth';
import Navbar from './components/layout/Navbar';

const App = () => {
    const [user, setUser] = useState(undefined)
    const {auth} = useAuthentication()
    const  loadingUser = user === undefined //devolve true ou false

    useEffect(() =>{
        onAuthStateChanged(auth, async (user) =>{
        await setUser(user)
        })
    }, [auth])
    
  return (
    <div>
        <BrowserRouter>
        <Navbar user={user} />
        <Routes>
        <Route path='/' element={<Home user={user} loadingUser={loadingUser}/>} />
        <Route path='/login' element={
            !user ? <Login/> : <Navigate to="/" />
          }/>
        <Route path='/register' element={
            !user ? <Register/> : <Navigate to="/" />
            }/>
        </Routes>
        </BrowserRouter>
    </div>
  )
}

export default App