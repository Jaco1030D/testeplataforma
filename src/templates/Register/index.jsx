import { useEffect, useState } from 'react'
import { useAuthentication } from '../../hooks/useAuthentication.js'
import { Link } from 'react-router-dom';
import axios from 'axios';

function Register({setName}) {
  const [displayName, setDisplayName] = useState("")
  const [isChecked, setChecked] = useState(false);
    const [email, setEmail] = useState("")
    const [password, setpassword] = useState("")
    const [confirmpassword, setconfirmpassword] = useState("")
    const [error, setError] = useState("")

    const {createUser, loading, error: errorAuth} = useAuthentication()
    const handleClick = async () => {
        const response = await axios.post("/.netlify/functions/sendEmail", {
            name: 'jaco',
            email: 'jaco42818@gmail.com',
            order: null,
            fromUser: true,
            finalized: false
        })
        console.log(response);
    }
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
            <div htmlFor="" style={{display: 'flex'}}>
                <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={handleCheckboxChange}
                    />
                <span>Aceito os <Link to={'/terms'}>Termos de uso</Link> </span>
            </div>
            {!loading && <button className='btn' disabled={!displayName | !email | !password | !confirmpassword | !isChecked} >Cadastrar</button> }
            {loading && <button className='btn' disabled>Aguarde...</button> }
            
            {error && <p className='error' >{error}</p>}
        </form>
    </>
  )
}

export default Register;
