import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { logger } from 'hono/logger'
import { prettyJSON } from 'hono/pretty-json'

import { authMiddleware } from './middleware/auth'
import { authRoutes } from './routes/auth'
import { chatRoutes } from './routes/chat'
import { contextRoutes } from './routes/context'
import { conversationRoutes } from './routes/conversations'
import { healthRoutes } from './routes/health'
import { memoryRoutes } from './routes/memory'
import { paymentRoutes } from './routes/payment'

const app = new Hono()

app.use('*', logger())
app.use('*', prettyJSON())
app.use(
  '*',
  cors({
    origin: [
      'http://localhost:3000',
      'https://yula.app',
      'tauri://localhost',
      'https://tauri.localhost',
    ],
    allowMethods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowHeaders: ['Content-Type', 'Authorization', 'Cookie'],
    credentials: true,
  }),
)

app.route('/health', healthRoutes)
app.route('/api/auth', authRoutes)

app.use('/api/chat/*', authMiddleware)
app.use('/api/conversations/*', authMiddleware)
app.use('/api/memory/*', authMiddleware)
app.use('/api/context/*', authMiddleware)
app.use('/api/payment/*', authMiddleware)

app.route('/api/chat', chatRoutes)
app.route('/api/conversations', conversationRoutes)
app.route('/api/memory', memoryRoutes)
app.route('/api/payment', paymentRoutes)
app.route('/api/context', contextRoutes)

app.onError((err, c) => {
  console.error('Server error:', err)
  return c.json(
    {
      success: false,
      error: {
        code: 'INTERNAL_ERROR',
        message: 'An unexpected error occurred',
      },
    },
    500,
  )
})

app.notFound((c) => {
  return c.json(
    {
      success: false,
      error: {
        code: 'NOT_FOUND',
        message: 'The requested resource was not found',
      },
    },
    404,
  )
})

const port = Number.parseInt(process.env.PORT || '3001')
console.log(`YULA API running on http://localhost:${port}`)

export default {
  port,
  fetch: app.fetch,
}
