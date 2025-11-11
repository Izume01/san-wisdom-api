import { Hono } from 'hono'
import { connectDB } from './db/connectDB'
import adminRoutes from './routes/admin.route'

await connectDB()

const app = new Hono()

app.route('/api/admin', adminRoutes)


export default app
