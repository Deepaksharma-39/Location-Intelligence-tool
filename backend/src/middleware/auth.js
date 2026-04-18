import jwt from 'jsonwebtoken'
import { env } from '../config/env.js'

export const authRequired = (req, res, next) => {
  const authHeader = req.headers.authorization || ''
  const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : null

  if (!token) {
    return res.status(401).json({ success: false, message: 'Unauthorized' })
  }

  try {
    const payload = jwt.verify(token, env.jwtSecret)
    req.user = payload
    next()
  } catch {
    return res.status(401).json({ success: false, message: 'Invalid token' })
  }
}

export const signToken = (payload) => jwt.sign(payload, env.jwtSecret, { expiresIn: env.jwtTtl })
