import dotenv from 'dotenv'

dotenv.config()

const required = ['NODE_ENV', 'PORT', 'FRONTEND_URL']

required.forEach((key) => {
  if (!process.env[key]) {
    console.warn(`[env] Missing required environment variable: ${key}`)
  }
})

export const env = {
  nodeEnv: process.env.NODE_ENV || 'development',
  port: Number(process.env.PORT) || 4000,
  frontendUrl: process.env.FRONTEND_URL || 'http://localhost:5173',
  openaiApiKey: process.env.OPENAI_API_KEY || '',
  openaiModel: process.env.OPENAI_MODEL || 'gpt-4o-mini',
  mapsApiKey: process.env.GOOGLE_MAPS_API_KEY || '',
  mapboxToken: process.env.MAPBOX_ACCESS_TOKEN || ''
}
