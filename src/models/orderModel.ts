import { type } from 'os'
import db from '../database'

type orders = {
  id?: number
  username: string
  status: string
  products?: []
}
type order_prod = {
  id?: number
  order_id: number
  product_id: number
  quantity: number
}

class orderModel {
  async index(username: string): Promise<orders[]> {
    try {
      const dbCon = await db.connect()
      const sql = 'SELECT * FROM orders where username =($1)'
      const result = await dbCon.query(sql, [username])
      dbCon.release()
      return result.rows
    } catch (err) {
      throw new Error(`Could not get orders. Error: ${err}`)
    }
  }

  async show(username: string, id: number): Promise<orders> {
    try {
      if (!(await this.validOrderUser(username, id))) {
        throw new Error('invalid owner or deleted order')
      }
      const dbCon = await db.connect()
      const order = await dbCon.query(`  select jsonb_build_object(
            'Order ID', c.id,
             'User' , uu.username,
             'Status' , c.status,
            'order_details', orderP.products)
            from orders c
            left outer join lateral (
            select jsonb_agg(jsonb_build_object('quantity', quantity, 'product_id', product_id  , 'product name',d.name , 'product price',d.price , 'order line cost',quantity*d.price)) as products,
            order_id 
            from order_prod p  left outer join product d on (p.product_id = d.id )
            where p.order_id = c.id
            group by order_id
            ) orderP on true
            join users uu on (c.username=uu.username)
            where c.id= ${id}`)
      dbCon.release()
      return order.rows[0]
    } catch (err) {
      throw new Error(`Could not get order. Error: ${err}`)
    }
  }

  async create(username: string): Promise<orders> {
    try {
      const dbCon = await db.connect()
      const sql = 'INSERT INTO orders (username, status) VALUES (($1),($2))  returning *'
      const order = await dbCon.query(sql, [username, 'active'])
      dbCon.release()
      return order.rows[0]
    } catch (err) {
      throw new Error(`Could not create order. Error: ${err}`)
    }
  }

  async GetOrderstatus(id: number): Promise<string> {
    try {
      const dbCon = await db.connect()
      const sql = 'select status from orders where id = ($1)'
      const status = await dbCon.query(sql, [id])

      dbCon.release()
      return status.rows[0].status
    } catch (err) {
      throw new Error(`Could not get order status . Error: ${err}`)
    }
  }
  async update(o: orders): Promise<orders> {
    try {
      const dbCon = await db.connect()
      const sql = 'UPDATE orders SET status = ($1) WHERE id = ($2) and username = ($3)  returning *'
      const order = await dbCon.query(sql, ['complete', o.id, o.username])
      dbCon.release()
      if (order.rows.length === 0) {
        throw new Error('Order not found')
      }
      return order.rows[0]
    } catch (err) {
      throw new Error(`Order not exist.`)
    }
  }

  async delete(id: number, username: string): Promise<orders> {
    try {
      if (!(await this.validOrderUser(username, id))) {
        throw new Error('you are not the owner of this order')
      }
      const dbCon = await db.connect()

      let sql = 'DELETE FROM order_prod WHERE order_id = ($1)'
      await dbCon.query(sql, [id])
      sql = 'DELETE FROM orders WHERE id = ($1) returning *'
      const deletedorder = await dbCon.query(sql, [id])
      dbCon.release()
      return deletedorder.rows[0]
    } catch (err) {
      throw new Error(`Could not delete order. Error: ${err}`)
    }
  }

  async addProduct(
    prod_id: number,
    order_id: number,
    quantity: number
  ): Promise<order_prod | null> {
    try {
      const dbCon = await db.connect()

      const sql =
        'INSERT INTO order_prod (order_id, product_id, quantity)  VALUES ($1,$2,$3) returning *'
      const order = await dbCon.query(sql, [order_id, prod_id, quantity])
      dbCon.release()
      return order.rows[0]
    } catch (err) {
      throw new Error(`Could not add product to order. Error: ${err}`)
    }
  }

  async validOrderUser(username: string, order_id: number): Promise<boolean> {
    try {
      const dbCon = await db.connect()
      const sql = 'select * from orders where id = $1 and username = $2'
      const order = await dbCon.query(sql, [order_id, username])
      dbCon.release()
      if (order.rows.length === 0) {
        return false
      } else {
        return true
      }
    } catch (err) {
      throw new Error(`this user is not order owner: ${err}`)
    }
  }
}
export { orderModel, orders }
