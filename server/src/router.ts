import express, { Request, Response } from 'express'

export const router = express()

router.get('/', (req: Request, res: Response) => {
  return res.json('ok')
})
