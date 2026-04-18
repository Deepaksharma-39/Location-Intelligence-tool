import cors from 'cors'
import express from 'express'
import helmet from 'helmet'
import morgan from 'morgan'
import locationRoutes from './routes/locationRoutes.js'
import { env } from './config/env.js'
import { errorHandler, notFoundHandler } from './middleware/errorHandler.js'

const app = express()

app.use(helmet())
app.use(
  cors({
    origin: env.frontendUrl,
    credentials: true
  })
)
app.use(express.json({ limit: '2mb' }))
app.use(morgan('dev'))

app.get('/health', (req, res) => {
  res.json({ success: true, service: 'location-intelligence-api', status: 'ok' })
})

app.use('/api/location', locationRoutes)

app.use(notFoundHandler)
app.use(errorHandler)

export default app
