import { Hono } from 'hono'
import { connectDB } from './db/connectDB'
import adminRoutes from './routes/admin.route'
import contentRoutes from './routes/content.route'
import { logger } from 'hono/logger'


// connect to database
await connectDB()


const app = new Hono()

app.use('*', logger())

app.route('/api/admin', adminRoutes)
app.route('/api/content', contentRoutes)

app.get('/', (c) => c.json({ message: 'API is running' }))

export default app
