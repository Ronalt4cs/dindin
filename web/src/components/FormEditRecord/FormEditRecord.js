import './styles.css'
import closeIcon from '../../assets/close-icon.svg'
import { useEffect, useState } from 'react'
import api from '../../services/api'
import { getItem } from '../../utils/storage'
import { formatDate } from '../../utils/form'
import { useTransation } from '../../hooks/useTranations'

export default function FormEditRecord({ setOpenFormEditRecord }) {
  const token = getItem('token')
  const [formType, setFormType] = useState('exit')
  const [categories, setCategories] = useState([])
  const [categoryId, setCategoryId] = useState('')
  const [error, setError] = useState('')
  const [updateRender, setUpdateRender] = useState(false)
  const [form, setForm] = useState({
    value: '',
    description: '',
    date: '',
  })
  const { transationId } = useTransation()

  async function getCategories() {
    try {
      const { data } = await api.get('/categoria', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

      const categoriesFound = data.map(item => {
        return item
      })

      setCategories(categoriesFound)

    } catch (error) {
      console.log(error.message);
      return
    }
  }

  async function updateTransaction() {

    try {
      const dateFormated = formatDate(form.date)
      const id = parseInt(transationId)

      await api.put(`/transacao/${id}`, {
        descricao: !form.description ? '-' : form.description,
        valor: form.value,
        data: dateFormated,
        categoria_id: categoryId,
        tipo: formType === 'entry' ? 'entrada' : 'saida',
      }, {
        headers: {
          Authorization: `Bearaer ${token}`
        }
      })

    } catch (error) {
      return console.log(error.message);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault()

    if (!form.value || !form.date || !categoryId) {
      setError('Informações incompletas');
      return
    }

    await updateTransaction()

    setUpdateRender(true)
    setOpenFormEditRecord(false)
  }

  function handleInputChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  useEffect(() => {
    getCategories();
  }, [setUpdateRender])

  return (
    <div className='container-blur'>
      <form
        className='form-edit-record'
        onSubmit={handleSubmit}
      >
        <div className='container-title'>
          <h1>Editar Registro</h1>
          <img
            src={closeIcon}
            alt='Botão para fechar formulário'
            style={{ cursor: 'pointer' }}
            onClick={() => setOpenFormEditRecord(false)}
          />
        </div>

        <div className='container-buttons'>
          {
            formType === 'entry' ?
              <button
                className='btn-entry'
                type='button'
                onClick={() => setFormType('entry')}
              >
                Entrada
              </button> :
              <button
                className='btn-entry'
                type='button'
                onClick={() => setFormType('entry')}
                style={{ 'backgroundColor': '#B9B9B9' }}
              >
                Entrada
              </button>
          }

          {
            formType === 'exit' ?
              <button
                className='btn-exit'
                type='button'
                onClick={() => setFormType('exit')}
              >
                Saída
              </button> :
              <button
                className='btn-exit'
                type='button'
                onClick={() => setFormType('exit')}
                style={{ 'backgroundColor': '#B9B9B9' }}
              >
                Saída
              </button>
          }
        </div>

        <div className='container-input'>
          <label htmlFor='input-value'>Valor</label>
          <input
            type='text'
            name='value'
            id='input-value'
            value={form.value}
            onChange={handleInputChange}
          />
        </div>

        <div className='container-input'>
          <label htmlFor='select-category'>Categoria</label>
          <select
            type='text'
            name='category'
            id='select-category'
            className='select'
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
          >
            {
              categories.map(category => {
                return (
                  <option
                    key={category.id}
                    value={category.id}
                  >
                    {category.descricao}
                  </option>
                )
              })
            }
          </select>
        </div>

        <div className='container-input'>
          <label htmlFor='input-date'>Data</label>
          <input
            type='text'
            name='date'
            id='input-date'
            value={form.date}
            onChange={handleInputChange}
          />
        </div>

        <div className='container-input'>
          <label htmlFor='input-description'>Descrição</label>
          <input
            type='text'
            name='description'
            id='input-description'
            value={form.description}
            onChange={handleInputChange}
          />
          <span className='error'>{error}</span>
        </div>

        <button
          className='btn-confirm'
          onClick={() => setUpdateRender(!updateRender)}
        >
          Confirmar
        </button>

      </form>
    </div>
  )
}