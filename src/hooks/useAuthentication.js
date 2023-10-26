import {db} from '../firebase/Config'

import{
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    updateProfile,
    signOut
} from 'firebase/auth'

import { useEffect, useState } from 'react'


export const useAuthentication = () =>{
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(null)

    const [cancelled, setCancelled] = useState(false)

    const auth = getAuth()


    function checkifCancelled(){
        if (cancelled) {
            return
        }
    }
    function config() {
        
        checkifCancelled()
        setLoading(true)
        setError(null)
    }

    const createUser = async (data) =>{
        config()
        try {
            const {user} = await createUserWithEmailAndPassword(
                auth,
                data.email,
                data.password,
                data.displayName
            )
            await updateProfile(user, {
                displayName: data.displayName
            })
            
            setLoading(false)
            console.log(user);
            return user
            
        } catch (error) {

            let systemErrorMessage

            if (error.message.includes("Password")) {
                systemErrorMessage = "A senha precisa de no minimo 6 caracteres"
            } else if(error.message.includes("email-already")){
                systemErrorMessage = "E-mail ja cadastrado"
            } else{
                systemErrorMessage = "Tente novamente mais tarde"
            }

            setError(systemErrorMessage)
        }
        setLoading(false)
    }
    const logout = () =>{
        checkifCancelled()

        signOut(auth)
    }
    const login = async(data) =>{
        config()
        try {
            await signInWithEmailAndPassword(auth, data.email, data.password)
        } catch (error) {
            let systemErrorMessage

            if (error.message.includes("user-not-found")) {
                systemErrorMessage = "Usuario não encontrado"
            } else if(error.message.includes("wrong-password")){
                systemErrorMessage = "Senha esta errada"
            } else{
                console.log(error.message);
                systemErrorMessage = "Tente novamente mais tarde"
            }
            
            setError(systemErrorMessage)
        }
        setLoading(false)
    }
    useEffect(() => {
      return () => setCancelled(true)
    }, [])
    

    return {
        auth,
        createUser,
        error,
        loading,
        logout,
        login
    }
}