'use client'

import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import Image from 'next/image'
import editIcon from '../assets/edit-icon.svg'
import deleteIcon from '../assets/delete-icon.svg'
import { useState } from 'react'
import { Modal } from './Modal'

const createData = (
  date: string,
  weekDay: string,
  description: string,
  category: string,
  value: string,
) => {
  return { date, weekDay, description, category, value }
}

const rows = [
  createData('05/05/23', 'segunda', 'Vendas', 'Pix', 'R$ 40,00'),
  createData('06/05/23', 'terça', 'Vendas', 'Pix', 'R$ 40,00'),
  createData('07/05/23', 'quarta', '-', 'Pix', 'R$ 40,00'),
  createData('08/05/23', 'quinta', '-', 'Pix', 'R$ 40,00'),
  createData('09/05/23', 'sexta', 'Vendas', 'Pix', 'R$ 40,00'),
]

export function DataTable() {
  const [showPopup, setShowPopup] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [id, setId] = useState('')

  const openPopup = (id: string) => {
    setId(id)
    setShowPopup(true)
  }

  const openModal = (id: string) => {
    setShowModal(true)
    setId(id)
  }

  return (
    <TableContainer className="shadow-none" component={Paper}>
      <Table className="w-[964px]" aria-label="simple table">
        <TableHead className="shadow-md rounded-md bg-slate-50">
          <TableRow>
            <TableCell className="font-lato font-bold text-sm">Data</TableCell>
            <TableCell className="font-lato font-bold text-sm" align="center">
              Dia da semana
            </TableCell>
            <TableCell className="font-lato font-bold text-sm" align="center">
              Descrição
            </TableCell>
            <TableCell className="font-lato font-bold text-sm" align="center">
              Categoria
            </TableCell>
            <TableCell className="font-lato font-bold text-sm" align="center">
              Valor
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.date}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell
                className="font-lato font-bold text-sm"
                component="th"
                scope="row"
              >
                {row.date}
              </TableCell>
              <TableCell
                className="font-lato font-normal text-sm"
                align="center"
              >
                {row.weekDay}
              </TableCell>
              <TableCell
                className="font-lato font-normal text-sm"
                align="center"
              >
                {row.description}
              </TableCell>
              <TableCell
                className="font-lato font-normal text-sm"
                align="center"
              >
                {row.category}
              </TableCell>
              <TableCell
                className="font-lato font-normal text-sm"
                align="center"
              >
                {row.value}
              </TableCell>
              <TableCell align="center" className="flex gap-2 py-5">
                <div>
                  <Image
                    src={editIcon}
                    alt="Icone editar"
                    width={24}
                    height={24}
                    className="w-5 h-5 cursor-pointer"
                    onClick={() => openModal(row.date)}
                  />
                  {showModal && (
                    <Modal
                      title="Editar Registro"
                      id={id}
                      setShowModal={setShowModal}
                    />
                  )}
                </div>
                <div className="relative">
                  <Image
                    src={deleteIcon}
                    alt="Icone apagar"
                    width={24}
                    height={24}
                    className="w-5 h-5 cursor-pointer"
                    onClick={() => openPopup(row.date)}
                  />
                  {showPopup && id === row.date && (
                    <div className="absolute w-28 h-12 -left-24 rounded bg-blue-100">
                      <span>Apagar item?</span>
                      <div>
                        <button className="w-9 h-4 mr-2 rounded font-medium text-xs text-white bg-lightBlue">
                          Sim
                        </button>
                        <button
                          onClick={() => setShowPopup(false)}
                          className="w-9 h-4 rounded font-medium text-xs text-white bg-red-500"
                        >
                          Não
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
