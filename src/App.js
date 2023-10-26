import React, { useEffect, useState } from 'react'
import Home from './templates/Home';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Login from './templates/Login';
import Register from './templates/Register';
import { useAuthentication } from './hooks/useAuthentication.js';
import { onAuthStateChanged } from 'firebase/auth';
import Navbar from './components/layout/Navbar/index.jsx';

const App = () => {
    const [user, setUser] = useState(undefined)
    const {auth} = useAuthentication()
    const  loadingUser = user === undefined

    useEffect(() =>{
        onAuthStateChanged(auth, async (user) =>{
        await setUser(user)
        })
    }, [auth])

    console.log(user);
    
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