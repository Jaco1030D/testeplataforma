import { useEffect, useState } from 'react'
import { useAuthentication } from '../../hooks/useAuthentication.js'
import { useNavigate } from 'react-router-dom'
import svg from './arrow.svg'
import vector from './vector.svg'


const Login = () => {
    const [email, setEmail] = useState("")
    const [password, setpassword] = useState("")
    const [error, setError] = useState("")
    const navigate = useNavigate()

    const {login, loading, error: errorAuth} = useAuthentication()
    const handleSubmit = async (e) =>{
        e.preventDefault()
        setError("")

        const user = {
            email,
            password
        }

        const res = await login(user) 

    }
    
    useEffect(() =>{
        if (errorAuth) {
            setError(errorAuth)
        }
    }, [errorAuth])
  return (
    <>
    <form className='forms' onSubmit={handleSubmit}>
        <h2>Entre</h2>
        <div className="inputs">
            <label>
                <input type="email" name='email' required placeholder='Email...' value={email} onChange={(e) => setEmail(e.target.value)}/>
            </label>
            <label>
                <input type="password" name='password' required placeholder='Senha...' value={password} onChange={(e) => setpassword(e.target.value)} />
            </label>
        </div>
        {!loading && <button className='btn' disabled={!email | !password} >Entrar</button> }
        {loading && <button className='btn' disabled>Aguarde...</button> }
        <p className='reset_password pointer' onClick={() => navigate('/resetpassword')}>Esqueceu a senha?</p>

        <div id='login_link' onClick={() => navigate('/register')}><p> Não tem uma conta? Cadastre-se </p> <img src={svg} alt="" /></div>
        
        {error && <p className='error' >{error}</p>}
    </form>
    <img src={vector} id='img-vector' alt="" />
    </>
  )
}

export default Login