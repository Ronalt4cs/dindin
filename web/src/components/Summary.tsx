'use client'
import { useState } from 'react'
import { Modal } from './Modal'

export function Summary() {
  const [showModal, setShowModal] = useState(false)

  return (
    <>
      <div className="flex flex-col gap-3 w-60 px-8 rounded-xl shadow-lg bg-slate-50">
        <h1 className="font-bold text-lg pt-6">Resumo</h1>

        <div className="flex flex-col gap-3 border-b pb-5">
          <p className="flex justify-between font-medium text-xs">
            Entradas
            <span className="text-purple">R$ 200,00</span>
          </p>
          <p className="flex justify-between font-medium text-xs">
            Saídas
            <span className="text-orange">R$ 70,50</span>
          </p>
        </div>

        <p className="flex items-center justify-between font-bold text-lg mb-8">
          Saldo
          <span className="font-medium text-xs text-lightBlue">R$ 129,50</span>
        </p>
      </div>
      <button
        className="w-60 h-11 rounded-md mt-4 font-bold bg-purple text-white"
        onClick={() => setShowModal(true)}
      >
        Adicionar Registro
      </button>
      {showModal && (
        <Modal title="Adicionar registro" setShowModal={setShowModal} />
      )}
    </>
  )
}
