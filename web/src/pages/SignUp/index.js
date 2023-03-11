import './styles.css'
import Header from '../../components/Header/Header';
import FormSignUp from '../../components/FormSignUp/FormSignUp';

export default function SignUp() {
  return (
    <div className='signup-page'>
      <Header />
      <FormSignUp />
    </div>
  )
}