'use client'

import Image from 'next/image'
import filterIcon from '../assets/filter-icon.svg'
import { useState } from 'react'
import { FiltersContainer } from './FiltersContainer'

export function Filter() {
  const [showFilter, setShowFilter] = useState(false)

  return (
    <div>
      <button
        onClick={() => setShowFilter(!showFilter)}
        className="flex items-center justify-center gap-1 absolute w-20 h-8 -mt-10 rounded-lg shadow-md text-xs font-bold"
      >
        <Image src={filterIcon} alt="Icone de filtro" width={14} height={14} />
        Filtrar
      </button>
      {showFilter && <FiltersContainer />}
    </div>
  )
}
