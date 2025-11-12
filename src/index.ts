import { Hono } from 'hono'
import { connectDB } from './db/connectDB'
import adminRoutes from './routes/admin.route'
import contentRoutes from './routes/content.route'
import uploadUrlRoutes from './routes/uploadurl.route'
import resourceRoutes from './routes/resource.route'
import meetingRoutes from './routes/meeting.route'
import { logger } from 'hono/logger'

// connect to database
await connectDB()

const app = new Hono()

app.use('*', logger())

app.route('/api/admin', adminRoutes)
app.route('/api/content', contentRoutes)
app.route('/api/upload', uploadUrlRoutes)
app.route('/api/resource', resourceRoutes)
app.route('/api/meeting', meetingRoutes)

app.get('/', (c) => c.json({ message: 'API is running' }))

export default app
