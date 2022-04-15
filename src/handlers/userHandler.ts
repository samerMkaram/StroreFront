import { userModel } from '../models/userModel'
import { Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import verifyAuthToken from '../middleware/authorization'
const User = new userModel()
const index = async (req: Request, res: Response) => {
  try {
    const { username } = req.body
    try {
      const uName = await User.show(verifyAuthToken(req, username))
      if (!uName) {
        return res.status(401).json('Invalid user id ' + username)
      }
    } catch (err) {
      return res.status(401).json((err as Error).message)
    }
    const users = await User.index()
    return res.status(200).json(users)
  } catch (err) {
    return res.status(401).json((err as Error).message)
  }
}

const create = async (req: Request, res: Response) => {
  try {
    const { firstname, lastname, username, password } = req.body
    if (!firstname || !lastname || !username || !password) {
      return res.status(400).json("Missing one or more user's info")
    }
    const users = await User.create(req.body)
    const token = jwt.sign({ users }, process.env.JWT_SECRET as unknown as string)

    return res.status(200).json({ ...users, token })
  } catch (err) {
    return res.status(400).json((err as Error).message)
  }
}

const show = async (req: Request, res: Response) => {
  try {
    const { username } = req.params
    //const { username } = req.body

    if (!verifyAuthToken(req, username)) {
      return res.status(400).json('Invalid user id ' + username)
    }
    const users = await User.show(username)
    if (users) {
      return res.status(200).json(users)
    } else {
      return res.status(400).json('no user found with id ' + username)
    }
  } catch (err) {
    return res.status(400).json((err as Error).message)
  }
}

const login = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body
    if (!username || !password) {
      return res.status(400).json('Missing one or more login info')
    }
    const users = await User.authenticate(username, password)
    if (users) {
      const token = jwt.sign({ users }, process.env.JWT_SECRET as unknown as string)
      return res.status(200).json({ ...users, token })
    } else {
      return res.status(401).json({
        status: 'FAIL',
        message: 'user Login fail'
      })
    }
  } catch (err) {
    return res.status(400).json((err as Error).message)
  }
}

export default { index, create, show, login }
