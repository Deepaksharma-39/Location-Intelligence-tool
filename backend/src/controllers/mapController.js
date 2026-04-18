import { z } from 'zod'
import { geocodeLocation, searchCityPlaces, searchNearbyPlaces } from '../services/mapService.js'

const geocodeSchema = z.object({ query: z.string().min(2) })

const nearbySchema = z.object({
  lat: z.number(),
  lng: z.number(),
  radius: z.number().min(100).max(10000).optional(),
  category: z.string().optional()
})

const citySchema = z.object({
  city: z.string().min(2),
  category: z.string().optional()
})

export const geocode = async (req, res, next) => {
  try {
    const { query } = geocodeSchema.parse(req.query)
    const data = await geocodeLocation(query)
    res.json({ success: true, data })
  } catch (error) {
    next(error)
  }
}

export const nearbyPlaces = async (req, res, next) => {
  try {
    const data = nearbySchema.parse(req.body)
    const places = await searchNearbyPlaces(data)
    res.json({ success: true, data: places })
  } catch (error) {
    next(error)
  }
}

export const cityPlaces = async (req, res, next) => {
  try {
    const data = citySchema.parse(req.body)
    const places = await searchCityPlaces(data)
    res.json({ success: true, data: places })
  } catch (error) {
    next(error)
  }
}
