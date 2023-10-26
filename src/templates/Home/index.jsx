import { useAuthentication } from '../../hooks/useAuthentication.js';
import './styles.css';

function Home({user, loadingUser}) {
  const {logout} = useAuthentication()
  return (
    <div className='forms'>
      {loadingUser && (
        <div>
          <span>Carregando user</span>
        </div>
      )}
      {user ? (
        <div>
          <h1>{user.displayName}</h1>
          <span>{user.email}</span>
          <button className='btn' onClick={logout}>Logout</button>
        </div>
      ) : 'se nao tiver usuario cadastre-se ou faça login'}
    </div>
  )
}

export default Home;
