import userHandler from '../../handlers/userHandler'
import { Router } from 'express'
import verifyAuthToken from '../../middleware/authorization'

const routes = Router()

routes.get('/', userHandler.index)

routes.get('/:username', userHandler.show)

routes.post('/', userHandler.create)

//routes.put('/', verifyAuthToken, userHandler.update)

//routes.delete('/', verifyAuthToken, userHandler.del)

routes.post('/login', userHandler.login)

export default routes
