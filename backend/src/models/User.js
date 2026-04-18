import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    passwordHash: { type: String, required: true },
    role: { type: String, enum: ['user', 'admin'], default: 'user' }
  },
  { timestamps: true }
)

userSchema.methods.comparePassword = async function comparePassword (password) {
  return bcrypt.compare(password, this.passwordHash)
}

userSchema.statics.hashPassword = async function hashPassword (password) {
  return bcrypt.hash(password, 12)
}

const User = mongoose.model('User', userSchema)

export default User
