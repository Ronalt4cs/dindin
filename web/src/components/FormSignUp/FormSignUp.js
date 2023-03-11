import './styles.css'
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from 'react';
import api from '../../services/api'
import { getItem } from '../../utils/storage'
import { validadePassword, validateEmail } from '../../utils/form'

export default function FormSignUp() {
  const navigate = useNavigate()
  const [error, setError] = useState('')
  const [passwordToConfirm, setPasswordToConfirm] = useState('')
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: ''
  })

  useEffect(() => {
    if (getItem('token')) {
      navigate('/main')
    }
  }, [navigate])

  function handleChangeInputValue(e) {
    setForm({ ...form, [e.target.id]: e.target.value })
  }

  async function handleSubmit(e) {
    e.preventDefault()

    try {
      if (!form.name || !form.email || !form.password || !passwordToConfirm) {
        return setError('Preencha todos os campos!')
      }

      const emailIsValid = validateEmail(form.email)

      if (!emailIsValid) {
        return setError('Informe um email válido!')
      }

      const passwordIsValid = validadePassword(form.password, passwordToConfirm)

      if (passwordIsValid !== 'senhas validas') {
        setError(passwordIsValid)
        return
      }

      await api.post('/usuario', {
        nome: form.name,
        email: form.email,
        senha: form.password
      })

      navigate('/')

    } catch (error) {
      return console.log(error.message);
    }

  }
  function toLogin() {
    navigate('/')
  }

  return (
    <form
      className='form-signup'
      onSubmit={handleSubmit}
    >
      <h1>Cadastre-se</h1>

      <div>
        <label htmlFor='name'>Nome</label>
        <input
          type='text'
          id='name'
          value={form.name}
          onChange={handleChangeInputValue}
        />
      </div>

      <div>
        <label htmlFor='email'>E-mail</label>
        <input
          type='email'
          id='email'
          value={form.email}
          onChange={handleChangeInputValue}
        />
      </div>

      <div>
        <label htmlFor='password'>Senha</label>
        <input
          type='password'
          id='password'
          value={form.password}
          onChange={handleChangeInputValue}
        />
      </div>

      <div>
        <label htmlFor='input-passwordToConfirm'>Confirmação de senha</label>
        <input
          type='password'
          id='input-passwordToConfirm'
          value={passwordToConfirm}
          onChange={(e) => setPasswordToConfirm(e.target.value)}
        />
        {error && <span className='error'>{error}</span>}
      </div>

      <button className='btn-signup'>Cadastrar</button>
      <span
        className='to-login'
        onClick={() => toLogin()}
      >
        Já tem cadastro? Clique aqui
      </span>
    </form>
  )
}