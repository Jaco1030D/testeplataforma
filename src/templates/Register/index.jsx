import { useEffect, useState } from 'react'
import { useAuthentication } from '../../hooks/useAuthentication.js'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import svg from './arrow.svg'
import vector from './vector.svg'

const validatePassword = (password) => {
    const regexSpecialCharacter = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/;
    const regexLowercaseLetter = /[a-z]/;
    const regexUppercaseLetter = /[A-Z]/;
    const regexNumber = /\d/;

    const hasSpecialCharacter = regexSpecialCharacter.test(password);
    const hasLowercaseLetter = regexLowercaseLetter.test(password);
    const hasUppercaseLetter = regexUppercaseLetter.test(password);
    const hasNumber = regexNumber.test(password);
    const hasSufficientLength = password.length >= 8;

    // return hasSpecialCharacter && hasLowercaseLetter && hasUppercaseLetter && hasNumber && hasSufficientLength;

    if (hasSpecialCharacter && hasLowercaseLetter && hasUppercaseLetter && hasNumber && hasSufficientLength) {
        return false;
    } else {
        let errorMessage = "A senha deve conter:";
        
        if (!hasSpecialCharacter) errorMessage += " um caractere especial;";
        if (!hasLowercaseLetter) errorMessage += " uma letra minúscula;";
        if (!hasUppercaseLetter) errorMessage += " uma letra maiúscula;";
        if (!hasNumber) errorMessage += " um número;";
        if (!hasSufficientLength) errorMessage += " no mínimo 8 caracteres;";

        return errorMessage;
    }
}

function Register({setName}) {
  const [displayName, setDisplayName] = useState("")
  const navigate = useNavigate()
  const [isChecked, setChecked] = useState(false);
    const [email, setEmail] = useState("")
    const [password, setpassword] = useState("")
    const [error, setError] = useState("")
    const [visibility, setVisibility] = useState(false)

    const {createUser, loading, error: errorAuth} = useAuthentication()

    

    const handleSubmit = async (e) =>{
        e.preventDefault()

        if (validatePassword(password)) {
            setError('Senha precisa de: 1 caracter especial, 1 letra maiuscula, 1 letra minuscula, 1 numero e 8 caracteres')
           return 
        }
        setError("")

        const user = {
            displayName,
            email,
            password
        }

            
        const res = await createUser(user)
        
        setName(res?.displayName || null)


    }

    const onChangePassword = (value) => {
        const error = validatePassword(value)

        if (error) {
            setError(error)
        } else {
            setError('')
        }

        setpassword(value)

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
        <label style={{position: 'relative'}}>
            <input type={visibility ? 'text' : 'password'} name='password' required placeholder='Senha...' value={password} onChange={(e) => onChangePassword(e.target.value)} />
            {!visibility && <box-icon type='solid' style={{position: 'absolute', top: '25%', right: '1%', opacity: '0.5', cursor: 'pointer'}} onClick={() => setVisibility(!visibility)} name='show'></box-icon>}
            {visibility && <box-icon type='solid' style={{position: 'absolute', top: '25%', right: '1%', opacity: '0.5', cursor: 'pointer'}} onClick={() => setVisibility(!visibility)} name='hide'></box-icon>} 
            
            {/* <box-icon type='solid' style={{position: 'absolute', top: '25%', right: '1%', opacity: '0.5', cursor: 'pointer'}} onClick={() => setVisibility(!visibility)} name='low-vision'></box-icon> */}
        </label>
            {error && <p className='error' >{error}</p>}
        </div>
        
        {!loading && <button className='btn' disabled={!displayName | !email | !password | !isChecked} >Cadastrar</button> }
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
        
        </form>
    <img src={vector} id='img-vector' alt="" />
    </>
  )
}

export default Register;
