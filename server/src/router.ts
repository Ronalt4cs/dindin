import express, { Request, Response } from 'express'
import { createUser } from './controllers/user'

export const router = express()

router.get('/', (req: Request, res: Response) => {
  return res.json('ok')
})

router.post('/user', createUser)
