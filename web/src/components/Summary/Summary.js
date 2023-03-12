import './styles.css'
import { useState, useEffect } from "react";
import { getItem } from '../../utils/storage'
import { formatValue } from '../../utils/form'
import api from '../../services/api'

export default function Summary() {
  const [balance, setBalance] = useState({ credit: 0, debit: 0, total: 0 })
  const token = getItem('token')

  async function getTransactions() {

    const { data } = await api.get('./transacao', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    let entryValue = 0;
    let exitValue = 0;

    data.forEach((trans) => {
      if (trans.tipo === 'entrada') { return entryValue += trans.valor }
      if (trans.tipo === 'saida') { return exitValue += trans.valor }
    })
    setBalance({
      entry: entryValue,
      exit: exitValue,
      total: (entryValue - exitValue)
    })
  }

  useEffect(() => {
    getTransactions()

  }, [balance])

  return (
    <div className='summary'>
      <h1>Resumo</h1>
      <div>
        <span>Entrada</span>
        <span className='entry'>{`R$ ${formatValue(balance.entry)}`}</span>
      </div>
      <div>
        <span>Saída</span>
        <span className='exit'>{`R$ ${formatValue(balance.exit)}`}</span>
      </div>

      <div className='container-balance'>
        <h2>Saldo</h2>
        <span className='balance'>{`R$ ${formatValue(balance.total)}`}</span>
      </div>
    </div>
  )
}