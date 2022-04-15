import db from '../database'
class dashboardModel {
  async top5(): Promise<{ quantity: number; product_id: string }[] | null> {
    try {
      const dbCon = await db.connect()
      const sql = `select sum(quantity)quantity,product_id from order_prod
      group by product_id
      order by quantity desc limit 5 `
      const result = await dbCon.query(sql)
      dbCon.release()
      return result.rows
    } catch (err) {
      throw new Error(`Could not get top 5 products. Error: ${err}`)
    }
  }

  async productByCategory(
    category: string
  ): Promise<{ name: string; description: string; price: number; category: string }[] | null> {
    try {
      const dbCon = await db.connect()
      const sql = `select * from product where category = '${category}'`
      const result = await dbCon.query(sql)
      dbCon.release()
      return result.rows
    } catch (err) {
      throw new Error(`Could not get top 5 products. Error: ${err}`)
    }
  }

  async ActiveOrders(username: string): Promise<{ id: number; status: string }[]> {
    try {
      const dbCon = await db.connect()
      const sql = 'SELECT * FROM orders where username =($1) and status = $2 '
      const result = await dbCon.query(sql, [username, 'active'])
      dbCon.release()
      return result.rows
    } catch (err) {
      throw new Error(`Could not get orders. Error: ${err}`)
    }
  }

  async CompOrders(username: string): Promise<{ id: number; status: string }[]> {
    try {
      const dbCon = await db.connect()
      const sql = 'SELECT * FROM orders where username =($1) and status =$2 '
      const result = await dbCon.query(sql, [username, 'complete'])
      dbCon.release()
      return result.rows
    } catch (err) {
      throw new Error(`Could not get orders. Error: ${err}`)
    }
  }
}

export default dashboardModel
