import { z } from 'zod'
import { generateAiAdvisory } from '../services/insightService.js'
import { searchCityPlaces, searchNearbyPlaces } from '../services/mapService.js'

const schema = z.object({
  question: z.string().min(5),
  mode: z.enum(['nearby', 'city']).default('nearby'),
  category: z.string().default('cafe'),
  city: z.string().optional(),
  lat: z.number().optional(),
  lng: z.number().optional(),
  radius: z.number().optional()
})

export const askIntelligence = async (req, res, next) => {
  try {
    const payload = schema.parse(req.body)

    let places = []
    if (payload.mode === 'city' && payload.city) {
      places = await searchCityPlaces({ city: payload.city, category: payload.category })
    }

    if (payload.mode === 'nearby' && typeof payload.lat === 'number' && typeof payload.lng === 'number') {
      places = await searchNearbyPlaces({
        lat: payload.lat,
        lng: payload.lng,
        category: payload.category,
        radius: payload.radius || 2000
      })
    }

    const ai = await generateAiAdvisory({
      question: payload.question,
      locationProfile: {
        mode: payload.mode,
        city: payload.city,
        lat: payload.lat,
        lng: payload.lng,
        category: payload.category
      },
      places
    })

    res.json({ success: true, data: { ai, placesCount: places.length, places: places.slice(0, 50) } })
  } catch (error) {
    next(error)
  }
}
