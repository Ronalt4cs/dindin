import './styles.css'
import Header from '../../components/Header/Header'
import FormSignIn from '../../components/FormSignIn/FormSignIn';
import { useNavigate } from 'react-router-dom'

export default function SignIn() {
  const navigate = useNavigate()

  function handleSignUp() {
    navigate('/usuario')
  }
  return (
    <div className='signIn-page'>
      <Header />
      <main>
        <div className='text-container'>
          <h1>
            Controle suas <span className='violet'>finanças</span>,
            sem planilha chata.
          </h1>
          <p>
            Organizar as suas finanças nunca foi tão fácil, com o DINDIN, você tem tudo num único lugar e em um clique de distância.
          </p>

          <button
            className='btn-signUp'
            onClick={() => handleSignUp()}
          >
            Cadastra-se
          </button>
        </div>
        <FormSignIn />
      </main>
    </div>
  )
}