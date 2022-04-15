import express, { Request, Response } from 'express'
import routes from './routes'
const app: express.Application = express()
const address = '0.0.0.0:3000'

app.use(express.json())
app.get('/', function (req: Request, res: Response) {
  res.send('Hello World!')
})
app.get('/api', (req: Request, res: Response) => {
  res.send('move to ')
})
app.use('/api', routes)
app.listen(3000, function () {
  console.log(`starting app on: ${address}`)
})
export default app
