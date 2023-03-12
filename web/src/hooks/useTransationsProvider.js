import { useState } from "react";

export function useTransationsProvider() {
  const [transationId, setTransationId] = useState('')

  return {
    transationId, setTransationId
  }
}