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
import Terms from './components/layout/Terms/index.jsx';
import Config from './templates/Config/index.jsx';
import { useFetchDocument } from './hooks/useFetchDocument.js';
import Checkout from './templates/Checkout/index.jsx';
import { Teste } from './templates/teste/index.jsx';
import { MenuAutomatic } from './components/layout/Navbar/navbar2.jsx';

const App = () => {
    const {document: allSetings} = useFetchDocument("configSenting", '2963')
    const [state, actions] = useMainContext()
    const [user, setUser] = useState(undefined)
    const [name, setName] = useState('')
    const {auth} = useAuthentication()
    const [isAdmin, setIsAdmin] = useState(false)
    const  loadingUser = user === undefined
    console.log(state);

    useEffect(() =>{
        onAuthStateChanged(auth, async (user) =>{

          setUser(user)

          if(user !== null) {

            user.email === process.env.REACT_APP_ADMIN_EMAIL && setIsAdmin(true)

            actions.setAccountInfo({

              displayName: name || user.displayName,
              email: user.email,
              uid: user.uid

            })

          } else {

            setIsAdmin(false)

          }

        })
    }, [auth, actions])

    useEffect(() => {

      actions.changeDeadlines(allSetings?.deadline)
      if (allSetings?.languageValues) {
        actions.changeLanguageValues(allSetings?.languageValues)
      }
      if (allSetings?.values) {
        actions.changeDefaultValue(allSetings.values)
      }
      if (allSetings?.archiveTypes) {
        actions.changeArchiveTypes(allSetings.archiveTypes)
      }
      if (allSetings?.multiplers) {
        actions.changeMultiplers(allSetings.multiplers)
      }

    },[allSetings, actions])

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
          {/* <MenuAutomatic /> */}
            <Navbar user={user} name={name} isAdmin={isAdmin} setName={setName} /> 
            <Routes>
            {isAdmin ? (
              <>
              <Route path='/' element={<Admin user={user} loadingUser={loadingUser}/>} />
              <Route path='/config' element={<Config user={user} loadingUser={loadingUser}/>} />
              <Route path='*' element={<Navigate to="/" />} />
              </>
            ) : (
              
              <>
              <Route path='/' element={<Home user={state?.user?.displayName} loadingUser={loadingUser}/>} />
              <Route path='/teste' element={<Teste />} />

              <Route path='/order' element={
                user ? <Order/> : <Navigate to="/login" />
              } />
              <Route path='/checkout' element={
                (user && state.cart !== undefined) ? <Checkout/> : <Navigate to="/login" />
              } />
              <Route path='/login' element={
                  !user ? <Login/> : state.cart === undefined ? <Navigate to="/" /> : <Navigate to="/checkout" />
                }/>
              <Route path='/terms' element={<Terms />} />
              <Route path='/register' element={
                  !user ? <Register setName={setName}/> : state.cart === undefined ? <Navigate to="/" /> : <Navigate to="/checkout" />
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