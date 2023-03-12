import './styles.css'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import api from '../../services/api'
import { getItem, setItem } from '../../utils/storage'
import { validateEmail } from '../../utils/form'

export default function FormSignIn() {
  const navigate = useNavigate()
  const [form, setForm] = useState({
    email: '',
    password: ''
  })
  const [error, setError] = useState('')

  useEffect(() => {
    if (getItem('token')) {
      navigate('/home')
    }
  }, [navigate])

  function handleChangeInputValue(e) {
    setForm({ ...form, [e.target.id]: e.target.value })
  }

  async function handleSubmit(e) {
    e.preventDefault()

    try {

      if (!form.email || !form.password) {
        return setError('Preencha todos os campos!')
      }
      const emailIsvalid = validateEmail(form.email)

      if (!emailIsvalid) {
        return setError('Email ou senha inválidos!')
      }

      const { data } = await api.post('/login', {
        email: form.email,
        senha: form.password
      })

      setItem('userId', data.user.id)
      setItem('token', data.token)

      navigate('/home')

    } catch (error) {
      setError('Email ou senha inválidos!')
      return console.log(error.message);
    }
  }

  return (
    <form
      className='form-signin'
      onSubmit={handleSubmit}
      noValidate
    >
      <h1>Login</h1>

      <div className='container-input'>
        <label htmlFor='email'>
          E-mail
        </label>
        <input
          type='email'
          id='email'
          required={false}
          value={form.email}
          onChange={handleChangeInputValue}
        />
      </div>

      <div className='container-input'>
        <label htmlFor='password'>
          Senha
        </label>
        <input
          type='password'
          id='password'
          value={form.password}
          onChange={handleChangeInputValue}
        />
        {error && <span className='error'>{error}</span>}
      </div>

      <button>Entrar</button>
    </form>
  )
}