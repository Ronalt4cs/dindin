import Image from 'next/image'
import closeIcon from '../assets/close-icon.svg'
import { Dispatch, SetStateAction } from 'react'

export interface ModalProps {
  id?: string
  title: string
  setShowModal: Dispatch<SetStateAction<boolean>>
}

export function Modal({ title, id, setShowModal }: ModalProps) {
  return (
    <div className="absolute left-0 -top-[126px] flex items-center justify-center h-screen w-screen bg-black bg-opacity-5">
      <div className="flex flex-col items-center p-16 w-[600px] rounded-lg z-10 bg-white">
        <div className="flex justify-between w-full">
          <h1 className="font-bold text-4xl">{title}</h1>
          <Image
            src={closeIcon}
            alt="Icone fechar"
            width={26}
            height={26}
            className="w-6 cursor-pointer"
            onClick={() => setShowModal(false)}
          />
        </div>
        <div className="flex w-full h-14 mt-14 mb-9">
          <button className="w-full rounded-md font-bold text-white bg-lightBlue">
            Entrada
          </button>
          <button className="w-full rounded-md font-bold text-white bg-gray-300">
            Saída
          </button>
        </div>

        <div className="flex flex-col items-start gap-2 w-full mb-5">
          <label htmlFor="input-value" className="font-medium text-2xl">
            Valor
          </label>
          <input
            type="text"
            id="input-value"
            className="w-full h-16 pl-4 border rounded-md text-lg border-black"
          />
        </div>
        <div className="flex flex-col items-start gap-2 w-full mb-5">
          <label htmlFor="input-value" className="font-medium text-2xl">
            Categoria
          </label>
          <input
            type="text"
            id="input-value"
            className="w-full h-16 pl-4 border rounded-md text-lg border-black"
          />
        </div>
        <div className="flex flex-col items-start gap-2 w-full mb-5">
          <label htmlFor="input-date" className="font-medium text-2xl">
            Data
          </label>
          <input
            type="text"
            id="input-date"
            className="w-full h-16 pl-4 border rounded-md text-lg border-black"
          />
        </div>
        <div className="flex flex-col items-start gap-2 w-full mb-5">
          <label htmlFor="input-description" className="font-medium text-2xl">
            Descrição
          </label>
          <input
            type="text"
            id="input-description"
            className="w-full h-16 pl-4 border rounded-md text-lg border-black"
          />
        </div>
        <button className="w-60 h-11 mt-5 rounded-md font-bold text-white bg-purple">
          Confirmar
        </button>
      </div>
    </div>
  )
}
