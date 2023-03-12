import './styles.css'
import triggerUp from '../../assets/trigger-down-date.svg'
import btnEdit from '../../assets/edit-icon.svg'
import btnDelete from '../../assets/delete-icon.svg'
import FormEditRecord from '../FormEditRecord/FormEditRecord'
import { useEffect, useState } from 'react'
import PopupDeleteRecord from '../PopupDeleteRecord/PopupDeleteRecord'
import api from '../../services/api'
import { getItem } from '../../utils/storage'
import { formatValue, getWeekDay } from '../../utils/form'
import { useTransation } from '../../hooks/useTranations'

export default function Table() {
  const [openFormEditRecord, setOpenFormEditRecord] = useState(false)
  const [openPopupDeleteRecord, setOpenPopupDeleteRecord] = useState(false)
  const token = getItem('token')
  const [transactions, setTransactions] = useState([])
  const { transationId, setTransationId } = useTransation()

  async function getTransactions() {
    try {

      const { data } = await api.get('/transacao', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

      const formatedTransactions = data.map(item => {
        return {
          id: item.id,
          date: item.data,
          weekDay: 'terça',
          description: item.descricao,
          category: item.categoria_nome,
          value: formatValue(item.valor),
          type: item.tipo
        }
      })

      setTransactions(formatedTransactions)

    } catch (error) {
      return console.log(error.message);
    }
  }

  async function handleEditRecord(transaction) {
    setTransationId(transaction.id)
    setOpenFormEditRecord(true)
    console.log(transationId);
  }

  // async function deleteRow(transationId) {
  //   const id = parseInt(transationId)
  //   try {
  //     await api.delete(`/transacao/:${id}`, {
  //       headers: {
  //         Authorization: `Bearer ${token}`
  //       }
  //     })

  //   } catch (error) {
  //     return console.log(error.message);
  //   }
  // }

  async function handleDeleteRecord(transaction) {

    setOpenPopupDeleteRecord(true)
    setTransationId(transaction.id)
    console.log(transaction.id);
  }

  useEffect(() => {
    getTransactions();
  }, [transactions])

  return (
    <div className='container-table'>
      <div className='header-table'>
        <strong className='header-date'>
          Data
          <img
            src={triggerUp}
            alt='Botão ordenar registros'
            style={{ cursor: 'pointer' }}
          />
        </strong>
        <strong className='header-week-day'>Dia da Semana</strong>
        <strong className='header-description'>Descrição</strong>
        <strong className='header-category'>Categoria</strong>
        <strong className='header-value'>Valor</strong>
      </div>

      {
        transactions.map(transaction => {
          return (
            <div className='row-table' key={transaction.id}>
              <strong
                className='date'>
                {transaction.date}
              </strong>
              <span className='week-day'>
                {
                  getWeekDay(transaction.date)
                }
              </span>
              <span className='description'>{transaction.description}</span>
              <span className='category'>{transaction.category}</span>
              <span
                className='value'
                style={
                  transaction.type === 'entrada'
                    ? { color: '#6460FB' } : { color: '#FA8C10' }
                }
              >
                {`R$ ${transaction.value}`}
              </span>

              <div className='btns-table'>
                <img
                  src={btnEdit}
                  alt='Botão editar registros'
                  style={{ cursor: 'pointer', marginRight: '16px' }}
                  onClick={() => handleEditRecord(transaction)}
                />
                {
                  openFormEditRecord && transaction.id === transationId &&
                  <FormEditRecord
                    setOpenFormEditRecord={setOpenFormEditRecord}
                  />
                }
                <div>
                  <img
                    src={btnDelete}
                    alt='Botão deletar registros'
                    style={{ cursor: 'pointer' }}
                    onClick={() => handleDeleteRecord(transaction)}
                  />
                  {
                    openPopupDeleteRecord && transationId === transaction.id &&
                    <PopupDeleteRecord
                      setOpenPopupDeleteRecord={setOpenPopupDeleteRecord}
                    />
                  }
                </div>
              </div>
            </div>
          )
        })
      }
    </div>
  )
}