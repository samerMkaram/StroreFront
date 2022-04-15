import { productModel } from '../models/productModel'
import { Request, Response, NextFunction } from 'express'
import verifyAuthToken from '../middleware/authorization'
import { userModel } from '../models/userModel'
const Product = new productModel()
const User = new userModel()
const index = async (req: Request, res: Response) => {
  try {
    const products = await Product.index()
    return res.status(200).json(products)
  } catch (err) {
    return res.status(400).json((err as Error).message)
  }
}

const create = async (req: Request, res: Response) => {
  try {
    const { name, description, price, unit, category } = req.body
    if (!name || !price || !description || !category || !unit) {
      return res.status(400).json("Missing one or more product's info")
    }

    try {
      verifyAuthToken(req, null)
    } catch (err) {
      return res.status(401).json((err as Error).message)
    }

    const product = await Product.create(req.body)
    return res.status(200).json(product)
  } catch (err) {
    return res.status(400).json((err as Error).message)
  }
}

const show = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    if (!id) {
      return res.status(400).json('Invalid product id ' + id)
    }
    const product = await Product.show(id as unknown as number)
    if (product) {
      return res.status(200).json(product)
    } else {
      return res.status(400).json('no product found with id ' + id)
    }
  } catch (err) {
    return res.status(400).json((err as Error).message)
  }
}

const update = async (req: Request, res: Response) => {
  try {
    const { id, name, description, price, unit, category } = req.body
    if (!id || isNaN(id) || !name || !description || !price || !category) {
      return res.status(400).json("Missing one or more product's info")
    }
    try {
      verifyAuthToken(req, null)
    } catch (err) {
      return res.status(401).json((err as Error).message)
    }
    const product = await Product.update(req.body)
    if (product) {
      return res.status(200).json(product)
    } else {
      return res.status(400).json('no product found with id ' + id)
    }
  } catch (err) {
    return res.status(400).json((err as Error).message)
  }
}

const del = async (req: Request, res: Response) => {
  try {
    const { id } = req.body
    if (!id || typeof id !== 'number') {
      return res.status(400).json('Invalid product id ' + id)
    }
    try {
      verifyAuthToken(req, null)
    } catch (err) {
      return res.status(401).json((err as Error).message)
    }
    const product = await Product.delete(id)
    if (product) {
      return res.status(200).json(product)
    } else {
      return res.status(400).json('no product found with id ' + id)
    }
  } catch (err) {
    return res.status(400).json((err as Error).message)
  }
}

export default { index, create, show, update, del }
