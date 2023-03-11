import './styles.css'
import api from '../../services/api'
import { getItem } from '../../utils/storage'

function PopupDeleteRecord({ setOpenPopupDeleteRecord, transationId }) {
  const token = getItem('token')

  async function handleDeleteRow() {
    const id = parseInt(transationId)
    try {
      await api.delete(`/transacao/:${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

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