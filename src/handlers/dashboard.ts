import { Request, Response } from 'express'

import dotenv from 'dotenv'
import dashboardModel from '../service/dashboard'
import verifyAuthToken from '../middleware/authorization'

dotenv.config()
const dashboard = new dashboardModel()
const topfive = async (req: Request, res: Response) => {
  try {
    const top5 = await dashboard.top5()
    return res.status(200).json(top5)
  } catch (err) {
    return res.status(400).json((err as Error).message)
  }
}

const productByCategory = async (req: Request, res: Response) => {
  try {
    const { category } = req.params
    const prodByCat = await dashboard.productByCategory(category)
    return res.status(200).json(prodByCat)
  } catch (err) {
    return res.status(400).json((err as Error).message)
  }
}

const activeOrders = async (req: Request, res: Response) => {
  try {
    const username = req.body.username
    try {
      verifyAuthToken(req, username)
    } catch (err) {
      return res.status(401).json((err as Error).message)
    }
    const activeOrders = await dashboard.ActiveOrders(username)
    return res.status(200).json(activeOrders)
  } catch (err) {
    return res.status(400).json((err as Error).message)
  }
}

const completeOrders = async (req: Request, res: Response) => {
  try {
    const username = req.body.username
    try {
      verifyAuthToken(req, username)
    } catch (err) {
      return res.status(401).json((err as Error).message)
    }
    const completeOrders = await dashboard.CompOrders(username)
    return res.status(200).json(completeOrders)
  } catch (err) {
    return res.status(400).json((err as Error).message)
  }
}

export default { topfive, productByCategory, activeOrders, completeOrders }
