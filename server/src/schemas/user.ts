import { z } from 'zod'

export const createUserBody = z.object({
  name: z.string(),
  email: z.string().email({ message: 'Email inválido' }),
  password: z.string()
})