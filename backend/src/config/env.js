import dotenv from 'dotenv'

dotenv.config()

export const env = {
  nodeEnv: process.env.NODE_ENV || 'development',
  port: Number(process.env.PORT) || 4000,
  frontendUrl: process.env.FRONTEND_URL || 'http://localhost:5173',
  mongoUri: process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/location_intelligence',
  jwtSecret: process.env.JWT_ACCESS_SECRET || 'dev_secret_change_me',
  jwtTtl: process.env.JWT_ACCESS_TTL || '7d',
  openaiApiKey: process.env.OPENAI_API_KEY || '',
  openaiModel: process.env.OPENAI_MODEL || 'gpt-4o-mini',
  nominatimUrl: process.env.OPENSTREETMAP_NOMINATIM_URL || 'https://nominatim.openstreetmap.org',
  overpassEndpoint: process.env.OVERPASS_ENDPOINT || 'https://overpass-api.de/api/interpreter'
}
