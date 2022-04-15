import dotenv from 'dotenv'
import { Pool } from 'pg'

dotenv.config()
const {
  POSTGRES_DATABASE,
  POSTGRES_HOST,
  POSTGRES_USER,
  POSTGRES_PASSWORD,
  POSTGRES_PORT,
  POSTGRES_DATABASE_TEST,
  ENV
} = process.env

const dbConnection = new Pool({
  host: POSTGRES_HOST,
  database: ENV === 'dev' ? POSTGRES_DATABASE : POSTGRES_DATABASE_TEST,
  password: POSTGRES_PASSWORD,
  user: POSTGRES_USER
})

dbConnection.on('error', () => {
  console.log('ERROR in DATABASE connection')
})

export default dbConnection
