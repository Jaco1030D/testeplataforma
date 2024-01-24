import { useEffect, useState } from 'react'
import { useAuthentication } from '../../hooks/useAuthentication.js'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import svg from './arrow.svg'
import vector from './vector.svg'

function Register({setName}) {
  const [displayName, setDisplayName] = useState("")
  const navigate = useNavigate()
  const [isChecked, setChecked] = useState(false);
    const [email, setEmail] = useState("")
    const [password, setpassword] = useState("")
    const [confirmpassword, setconfirmpassword] = useState("")
    const [error, setError] = useState("")

    const {createUser, loading, error: errorAuth} = useAuthentication()
    const handleSubmit = async (e) =>{
        e.preventDefault()
        setError("")

        const user = {
            displayName,
            email,
            password
        }

            
        const res = await createUser(user)
        
        setName(res?.displayName || null)


    }
    const handleCheckboxChange = () => {
        setChecked(!isChecked);
      };
    useEffect(() =>{
        if (errorAuth) {
            setError(errorAuth)
        }
    }, [errorAuth])
  return (
    <>
    <form onSubmit={handleSubmit} className='forms' >
        <h2>Crie sua conta</h2>
        <div className="inputs">
        <label>
            <input type="text" name='displayName' required placeholder='Nome...' value={displayName} onChange={(e) => setDisplayName(e.target.value)} />
        </label>
        <label>
            <input type="email" name='email' required placeholder='Email...' value={email} onChange={(e) => setEmail(e.target.value)}/>
        </label>
        <label>
            <input type="password" name='password' required placeholder='Senha...' value={password} onChange={(e) => setpassword(e.target.value)} />
        </label>
        </div>
        
        {!loading && <button className='btn' disabled={!displayName | !email | !password | !confirmpassword | !isChecked} >Cadastrar</button> }
        {loading && <button className='btn' disabled>Aguarde...</button> }
        <div className='term-checkbox' >
            <label htmlFor="checkbox" className='checkbox-label' onClick={handleCheckboxChange}>
            {isChecked && <box-icon name='check'></box-icon>}
            </label>
            <input
                type="checkbox"
                checked={isChecked}
                name='checkbox'
                onChange={handleCheckboxChange}
                />
            <p className='terms'>Ao criar uma conta, você concorda com os <Link to={'/terms'}>Termos de uso</Link> <br /> da Magma Translation</p>
        </div>

        <div id='login_link' onClick={() => navigate('/login')}><p> Já tem uma conta? Faça login </p> <img src={svg} alt="" /></div>
        
        {error && <p className='error' >{error}</p>}
        </form>
    <img src={vector} id='img-vector' alt="" />
    </>
  )
}

export default Register;
