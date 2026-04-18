import { ZodError } from 'zod'

export const notFoundHandler = (req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  })
}

export const errorHandler = (error, req, res, next) => {
  if (error instanceof ZodError) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: error.errors
    })
  }

  console.error(error)

  res.status(500).json({
    success: false,
    message: 'Internal server error'
  })
}
