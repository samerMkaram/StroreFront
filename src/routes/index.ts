import Router from 'express'
import userRoute from './api/userRoute'
import productRoute from './api/productRoute'
import orderRoute from './api/orderRoute'

const routes = Router()

routes.use('/users', userRoute)
routes.use('/products', productRoute)
routes.use('/orders', orderRoute)
export default routes
