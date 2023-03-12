import './index.css';
import Header from '../../components/Header/Header';
import imgProfile from '../../assets/profile-icon.svg';
import logoutIcon from '../../assets/logout-icon.svg';
import Summary from '../../components/Summary/Summary';
import Table from '../../components/Table/Table';
import Filters from '../../components/Filters/Filters';
import FormAddRecord from '../../components/FormAddRecord/FormAddRecord'
import filterIcon from '../../assets/filter-icon.svg'
import { useEffect, useState } from "react";
import { getItem } from '../../utils/storage';
import api from '../../services/api';
import { TransationsProvider } from '../../contexts/transationContext'

function Main() {
  const token = getItem('token')
  const [openFormAddRecord, setOpenFormAddRecord] = useState(false)
  const [openFilter, setOpenFilter] = useState(false)
  const [user, setUser] = useState({
    id: null,
    name: '',
    email: ''
  })

  async function getUserInfos(res, req) {
    try {
      const { data } = await api.get('/usuario',
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })

      return setUser({
        id: data.id,
        name: data.nome,
        email: data.email
      })

    } catch (error) {
      return res.status(400).json(error.message)
    }
  }

  useEffect(() => {
    getUserInfos();

  }, [user])

  return (
    <TransationsProvider>
      <div className="container">
        <Header
          imgProfile={imgProfile}
          userName={user.name}
          logoutIcon={logoutIcon}
        />
        <main>
          <button
            className='btn-filter'
            onClick={() => setOpenFilter(!openFilter)}
          >
            <img
              src={filterIcon}
              alt='Icone de filtro'
              style={{ marginRight: '4px' }}
            />
            Filtrar
          </button>

          <div className='container-table-summary'>
            <div>
              {
                openFilter &&
                <Filters />
              }
              <Table />
            </div>

            <div className='container-summary'>
              <Summary updateRender={true} />
              <button
                className='btn-add-record'
                onClick={() => setOpenFormAddRecord(true)}
              >
                Adicionar Registro
              </button>
            </div>
          </div>
          {
            openFormAddRecord &&
            <FormAddRecord setOpenFormAddRecord={setOpenFormAddRecord} />
          }
        </main>
      </div>
    </TransationsProvider>
  );
}

export default Main;
