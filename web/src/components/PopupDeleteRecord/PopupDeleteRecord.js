import './styles.css'
import api from '../../services/api'
import { getItem } from '../../utils/storage'
import { useTransation } from '../../hooks/useTranations'

function PopupDeleteRecord({ setOpenPopupDeleteRecord }) {
  const token = getItem('token')
  const { transationId } = useTransation()

  async function handleDeleteRow() {
    try {
      await api.delete(`/transacao/${transationId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      setOpenPopupDeleteRecord(false)

    } catch (error) {
      return console.log(error.message);
    }
  }

  return (
    <div className='popup'>
      <span>Apagar item ?</span>
      <div>
        <button
          className='btn-yes'
          onClick={() => handleDeleteRow()}
        >
          Sim
        </button>
        <button
          className='btn-no'
          onClick={() => setOpenPopupDeleteRecord(false)}
        >
          Não
        </button>
      </div>
    </div>
  )
}

export default PopupDeleteRecord;