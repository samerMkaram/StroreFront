import db from '../database'

type product = {
  id?: number
  name: string
  description: string
  price: number
  unit: string
  category: string
}

class productModel {
  async index(): Promise<product[]> {
    try {
      const dbCon = await db.connect()
      const sql = await dbCon.query('SELECT * FROM product')
      dbCon.release()
      return sql.rows
    } catch (err) {
      throw new Error(`Could not get products list. Error: ${err}`)
    }
  }

  async show(id: number): Promise<product> {
    try {
      const dbCon = await db.connect()
      const product = await dbCon.query(`SELECT * from product WHERE id = ${id}`)
      dbCon.release()
      return product.rows[0]
    } catch (err) {
      throw new Error(`Could not get product. Error: ${err}`)
    }
  }

  async create(p: product): Promise<product> {
    try {
      const dbCon = await db.connect()
      const sql = `INSERT INTO product (name ,  description ,   price ,unit ,category) 
                VALUES ('${p.name}','${p.description}',${p.price},'${p.unit}','${p.category}')  returning *`
      const product = await dbCon.query(sql)
      dbCon.release()
      return product.rows[0]
    } catch (err) {
      throw new Error(`Could not create product ${p.name}. Error: ${err}`)
    }
  }

  async update(p: product): Promise<product> {
    try {
      const dbCon = await db.connect()
      const sql = `UPDATE product SET name = '${p.name}', description = '${p.description}', price = ${p.price} ,
            unit = '${p.unit}' , category ='${p.category}' WHERE id = ${p.id}  returning *`
      const product = await dbCon.query(sql)
      dbCon.release()
      return product.rows[0]
    } catch (err) {
      throw new Error(`Could not update product ${p.name}. Error: ${err}`)
    }
  }

  async delete(id: number): Promise<product> {
    try {
      const dbCon = await db.connect()
      const deletedProduct = await dbCon.query(`DELETE FROM product WHERE id =${id}  returning *`)
      dbCon.release()
      return deletedProduct.rows[0]
    } catch (err) {
      throw new Error(`Could not delete product. Error: ${err}`)
    }
  }
}

export { productModel, product }
