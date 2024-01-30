import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import svg from './arrow.svg'
import vector from './vector.svg'
import axios from 'axios'
import { getAuth, sendPasswordResetEmail } from "firebase/auth";

const ResetPassword = () => {
    const [email, setEmail] = useState("")
    const [showMessage, setShowMessage] = useState(false)
    const [message, setMessage] = useState('')
    const navigate = useNavigate()


    const handleSubmit = async (e) =>{
        
        e.preventDefault()
        // const response = await axios.post("/.netlify/functions/resetPassword", {
        //     email
        // })
        
        // console.log(response);

        // setMessage(response.data.message)

        const auth = getAuth()

        sendPasswordResetEmail(auth, email).then(
            console.log('foi')
        ).catch((error) => {
            const errorMessage = error.message;
            console.log(errorMessage);
        })

        setShowMessage(true)
    }
    
  return (
    <>
    <form className='forms' onSubmit={handleSubmit}>
        <h2>Resetar a senha</h2>
        <div className="inputs">
            <label>
                <input type="email" name='email' required placeholder='Email...' value={email} onChange={(e) => setEmail(e.target.value)}/>
            </label>
        </div>
        <button className='btn' disabled={!email} >Enviar</button> 

        {showMessage && (
            <>
                <br />
                <p>{message}</p>
            </>
        )}
        
        <div id='login_link' onClick={() => navigate('/register')}><p> Não tem uma conta? Cadastre-se </p> <img src={svg} alt="" /></div>
        
    </form>
    <img src={vector} id='img-vector' alt="" />
    </>
  )
}

export default ResetPassword