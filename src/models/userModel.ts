import db from '../database'
import bcrypt from 'bcrypt'
type users = {
  id?: number
  firstname: string
  lastname: string
  username: string
  password: string
}

class userModel {
  async index(): Promise<users[]> {
    try {
      const dbCon = await db.connect()
      const sql = `select id,username , firstname , lastname from users`
      const result = await dbCon.query(sql)
      dbCon.release()
      return result.rows
    } catch (err) {
      throw new Error(`Could not get users. Error: ${(err as Error).message}`)
    }
  }

  async show(username: string): Promise<users> {
    try {
      const dbCon = await db.connect()
      const user = await dbCon.query(
        'SELECT id,firstname,lastname,username FROM users WHERE username =$1',
        [username]
      )
      dbCon.release()
      return user.rows[0]
    } catch (err) {
      throw new Error(`Could not get user. Error: ${err}`)
    }
  }

  async create(u: users): Promise<users> {
    try {
      const dbCon = await db.connect()
      const exists = await dbCon.query(`select * from users where username = '${u.username}'`)
      if (exists.rows.length) {
        throw new Error(`User ${u.username} already exists`)
      }
      const hash = bcrypt.hashSync(
        u.password + process.env.BCRYPT_SECRET,
        parseInt(process.env.SALT as string)
      )

      const sql = `INSERT INTO users (firstname,lastname,username,password) 
                VALUES ('${u.firstname}','${u.lastname}','${u.username}','${hash}')  RETURNING *`
      const user = await dbCon.query(sql)
      dbCon.release()
      return user.rows[0]
    } catch (err) {
      throw new Error(`Could not create user ${u.firstname}. Error: ${err}`)
    }
  }

  async authenticate(username: string, password: string): Promise<users | null> {
    try {
      const dbCon = await db.connect()
      const sql = `SELECT username,password FROM users WHERE username = '${username}'`
      const user = await dbCon.query(sql)

      if (user.rows.length) {
        const isValid = bcrypt.compareSync(
          password + process.env.BCRYPT_SECRET,
          user.rows[0].password
        )

        if (isValid) {
          const userInfo = await dbCon.query(
            `SELECT id,username , firstname,lastname FROM users WHERE username = '${username}'`
          )
          dbCon.release()
          return userInfo.rows[0]
        }
      }
      return null
    } catch (err) {
      throw new Error(`Could not login user ${username}. Error: ${err}`)
    }
  }
}

export { userModel, users }
