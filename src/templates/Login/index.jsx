import { useEffect, useState } from 'react'
import { useAuthentication } from '../../hooks/useAuthentication.js'

const Login = () => {
    const [email, setEmail] = useState("")
    const [password, setpassword] = useState("")
    const [error, setError] = useState("")

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
    <div className='forms' >
    <h1>Login</h1>
    <p>Loge-se para postar algo</p>
        <form onSubmit={handleSubmit} >
            <label>
                <span>E-mail:</span>
                <input type="email" name='email' required placeholder='Email...' value={email} onChange={(e) => setEmail(e.target.value)}/>
            </label>
            <label>
                <span>Senha:</span>
                <input type="password" name='password' required placeholder='Senha...' value={password} onChange={(e) => setpassword(e.target.value)} />
            </label>
            {!loading && <button className='btn' >Entrar</button> }
            {loading && <button className='btn' disabled>Aguarde...</button> }
            
            {error && <p className='error' >{error}</p>}
        </form>
    </div>
  )
}

export default Login