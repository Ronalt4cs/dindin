import { useContext } from "react";
import { TransationContext } from '../contexts/transationContext'

export function useTransation() {
  return useContext(TransationContext)
}