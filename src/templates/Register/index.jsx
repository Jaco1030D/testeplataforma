import { useEffect, useState } from 'react'
import { useAuthentication } from '../../hooks/useAuthentication'

// import './styles.css';

function Register() {
  const [displayName, setDisplayName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setpassword] = useState("")
    const [confirmpassword, setconfirmpassword] = useState("")
    const [error, setError] = useState("")

    const {createUser, loading, error: errorAuth} = useAuthentication()
    const handleSubmit = async (e) =>{
        e.preventDefault()
        setError("")

        if (password !== confirmpassword) {
            setError("As senhas precisão ser iguais")
            return
        }

        const user = {
            displayName,
            email,
            password
        }

        const res = await createUser(user) 
    }
    useEffect(() =>{
        if (errorAuth) {
            setError(errorAuth)
        }
    }, [errorAuth])
  return (
        <form onSubmit={handleSubmit} className='forms' >
            <label>
                <span>Nome:</span>
                <input type="text" name='displayName' required placeholder='Nome...' value={displayName} onChange={(e) => setDisplayName(e.target.value)} />
            </label>
            <label>
                <span>E-mail:</span>
                <input type="email" name='email' required placeholder='Email...' value={email} onChange={(e) => setEmail(e.target.value)}/>
            </label>
            <label>
                <span>Senha:</span>
                <input type="password" name='password' required placeholder='Senha...' value={password} onChange={(e) => setpassword(e.target.value)} />
            </label>
            <label>
                <span>Confirmar senha:</span>
                <input type="password" name='confirmpassword' required placeholder='Senha novamente...' value={confirmpassword} onChange={(e) => setconfirmpassword(e.target.value)}/>
            </label>
            {!loading && <button className='btn' >Cadastrar</button> }
            {loading && <button className='btn' disabled>Aguarde...</button> }
            
            {error && <p className='error' >{error}</p>}
        </form>
  )
}

export default Register;
