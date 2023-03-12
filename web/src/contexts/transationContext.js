import React from 'react';
import { createContext } from 'react'
import { useTransationsProvider } from '../hooks/useTransationsProvider'

export const TransationContext = createContext('')

export function TransationsProvider(props) {
  const transationProvider = useTransationsProvider()

  return (
    <TransationContext.Provider value={transationProvider}>
      {props.children}
    </TransationContext.Provider>
  )
}