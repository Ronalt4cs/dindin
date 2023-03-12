import './styles.css'
import closeIcon from '../../assets/close-icon.svg'
import { useEffect, useState } from 'react'
import { validadePassword, validateEmail } from '../../utils/form'
import api from '../../services/api'
import { getItem } from '../../utils/storage'


function FormEditProfile({ setOpenFormEditProfile }) {
  const [error, setError] = useState('')
  const [passwordToConfirm, setPasswordToConfirm] = useState('')
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: ''
  })
  const token = getItem('token')

  function handleChangeInputValue(e) {
    setForm({ ...form, [e.target.id]: e.target.value })
  }

  async function getUserInfos() {

    try {
      const { data } = await api.get('/usuario', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

      if (data) {
        setForm({
          name: data.nome,
          email: data.email
        })
      }

    } catch (error) {
      return console.log(error.message);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();

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

      await api.put('/usuario', {
        nome: form.name,
        email: form.email,
        senha: form.password
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

      setOpenFormEditProfile(false)

    } catch (error) {
      console.log(error.message);
      return
    }
  }

  useEffect(() => {
    getUserInfos()
  }, [])

  return (
    <div className='container-blur'>
      <form
        className='form-edit-profile'
        noValidate
        onSubmit={handleSubmit}
      >
        <div className='container-title'>
          <h1>Editar Registro</h1>
          <img
            src={closeIcon}
            alt='Botão para fechar formulário'
            style={{ cursor: 'pointer' }}
            onClick={() => setOpenFormEditProfile(false)}
          />
        </div>

        <div className='container-input'>
          <label htmlFor='name'>Nome</label>
          <input
            type='text'
            id='name'
            value={form.name !== undefined ? form.name : ''}
            onChange={handleChangeInputValue}
          />
        </div>

        <div className='container-input'>
          <label htmlFor='email'>E-mail</label>
          <input
            type='email'
            id='email'
            value={form.email !== undefined ? form.email : ''}
            onChange={handleChangeInputValue}
          />
        </div>

        <div className='container-input'>
          <label htmlFor='password'>Senha</label>
          <input
            type='password'
            id='password'
            value={form.password !== undefined ? form.password : ''}
            onChange={handleChangeInputValue}
          />
        </div>

        <div className='container-input'>
          <label htmlFor='passwordConfirm'>Confirmação de senha</label>
          <input
            type='password'
            id='passwordConfirm'
            onChange={(e) => setPasswordToConfirm(e.target.value)}
            value={passwordToConfirm}
          />
          {error && <span className='error'>{error}</span>}
        </div>

        <button className='btn-confirm'>Confirmar</button>

      </form>
    </div>
  )
}

export default FormEditProfile