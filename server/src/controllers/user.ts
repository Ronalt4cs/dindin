import { Request, Response } from 'express'
import { prisma } from '../api/prisma'
import { createUserBody } from '../schemas/user'
import bcrypt from 'bcrypt'

export const createUser = async (req: Request, res: Response) => {
  const { name, email, password } = createUserBody.parse(req.body)

  const emailExist = await prisma.user.findUnique({
    where: {
      email: email
    }
  })

  if (emailExist) {
    return res.status(400).json({ message: 'Email já cadastrado' })
  }

  if (password.length < 8) {
    return res.status(400).json({ message: 'A senha deve conter no mínimo 8 caracteres' })
  }

  const encryptedPassword = await bcrypt.hash(password, 10)

  const { password: _, ...user } = await prisma.user.create({
    data: {
      name: name,
      email: email,
      password: encryptedPassword
    }
  })

  return res.status(201).json(user)
}