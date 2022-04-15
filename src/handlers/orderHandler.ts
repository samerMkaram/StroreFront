import { orderModel, orders } from '../models/orderModel'
import { Request, Response } from 'express'
import verifyAuthToken from '../middleware/authorization'
const Order = new orderModel()

//dotenv.config()

//show only orders created by logged in user
const index = async (req: Request, res: Response) => {
  try {
    const username = req.body.username

    try {
      verifyAuthToken(req, username)
    } catch (err) {
      return res.status(401).json((err as Error).message)
    }
    const orders = await Order.index(username)
    return res.status(200).json(orders)
  } catch (err) {
    return res.status(400).json((err as Error).message)
  }
}

const show = async (req: Request, res: Response) => {
  try {
    const username = req.body.username
    const { id } = req.params

    try {
      verifyAuthToken(req, username)
    } catch (err) {
      return res.status(401).json((err as Error).message)
    }
    if (!id) {
      return res.status(400).json('Invalid order id ' + id)
    }
    const order = await Order.show(username, id as unknown as number)
    if (order) {
      return res.status(200).json(order)
    } else {
      return res.status(400).json('no order found with id ' + id)
    }
  } catch (err) {
    return res.status(403).json((err as Error).message)
  }
}

const create = async (req: Request, res: Response) => {
  try {
    const { username, status } = req.body

    try {
      verifyAuthToken(req, username)
    } catch (err) {
      return res.status(401).json((err as Error).message)
    }

    const order = await Order.create(username)
    return res.status(200).json(order)
  } catch (err) {
    return res.status(400).json((err as Error).message)
  }
}
//set order status to complete , so it will not accept more products
const complete = async (req: Request, res: Response) => {
  try {
    const username = req.body.username
    try {
      verifyAuthToken(req, username)
    } catch (err) {
      return res.status(401).json((err as Error).message)
    }
    const neworder: orders = {
      id: req.body.id as unknown as number,
      username: username,
      status: 'complete'
    }

    const order = await Order.update(neworder)
    if (order) {
      return res.status(200).json(order)
    } else {
      return res.status(400).json('cannot update order ')
    }
  } catch (err) {
    return res.status(401).json((err as Error).message)
  }
}

const del = async (req: Request, res: Response) => {
  try {
    const username = req.body.username
    try {
      verifyAuthToken(req, username)
    } catch (err) {
      return res.status(401).json((err as Error).message)
    }
    const { id } = req.params
    if (!id) {
      return res.status(400).json('Invalid order id ' + id)
    }

    const order = await Order.delete(id as unknown as number, username)
    if (order) {
      return res.status(200).json(order)
    } else {
      return res.status(400).json('no order found with id ' + id)
    }
  } catch (err) {
    return res.status(400).json((err as Error).message)
  }
}
const addProduct = async (req: Request, res: Response) => {
  try {
    const username = req.body.username
    try {
      verifyAuthToken(req, username)
    } catch (err) {
      return res.status(401).json((err as Error).message)
    }
    const orderID = req.params.orderID as unknown as number
    const { productID, quantity } = req.body
    if (!orderID || !productID || !quantity) {
      return res.status(403).json("Missing one or more product's info")
    }
    const orderStatus = await Order.GetOrderstatus(orderID)
    if (orderStatus !== 'active') {
      return res.status(403).json('Order is not active')
    }
    const validuser: boolean = await Order.validOrderUser(username, orderID)
    if (validuser) {
      const order = await Order.addProduct(productID, orderID, quantity)
      return res.status(200).json(order)
    } else {
      return res
        .status(401)
        .json('cannot add product to order , you are not order owner ' + orderID)
    }
  } catch (err) {
    return res.status(400).json((err as Error).message)
  }
}

export default { index, show, create, addProduct, complete, del }
