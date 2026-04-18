import app from './app.js'
import { env } from './config/env.js'
import { connectDb } from './config/db.js'

connectDb()
  .then(() => {
    app.listen(env.port, () => {
      console.log(`🚀 Backend running on port ${env.port}`)
    })
  })
  .catch((error) => {
    console.error('Failed to connect database', error)
    process.exit(1)
  })
