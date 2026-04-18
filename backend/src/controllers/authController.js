import { z } from 'zod'
import User from '../models/User.js'
import { signToken } from '../middleware/auth.js'

const registerSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(6)
})

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6)
})

export const register = async (req, res, next) => {
  try {
    const data = registerSchema.parse(req.body)
    const existing = await User.findOne({ email: data.email })

    if (existing) {
      return res.status(409).json({ success: false, message: 'Email already registered' })
    }

    const passwordHash = await User.hashPassword(data.password)
    const user = await User.create({ name: data.name, email: data.email, passwordHash })

    const token = signToken({ id: user._id, email: user.email, role: user.role })
    res.status(201).json({ success: true, data: { token, user: { id: user._id, name: user.name, email: user.email, role: user.role } } })
  } catch (error) {
    next(error)
  }
}

export const login = async (req, res, next) => {
  try {
    const data = loginSchema.parse(req.body)
    const user = await User.findOne({ email: data.email })

    if (!user || !(await user.comparePassword(data.password))) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' })
    }

    const token = signToken({ id: user._id, email: user.email, role: user.role })
    res.json({ success: true, data: { token, user: { id: user._id, name: user.name, email: user.email, role: user.role } } })
  } catch (error) {
    next(error)
  }
}

export const me = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id).select('-passwordHash')
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' })
    }

    res.json({ success: true, data: user })
  } catch (error) {
    next(error)
  }
}
