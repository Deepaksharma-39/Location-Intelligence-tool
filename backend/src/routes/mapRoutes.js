import { Router } from 'express'
import { cityPlaces, geocode, nearbyPlaces } from '../controllers/mapController.js'
import { authRequired } from '../middleware/auth.js'

const router = Router()

router.get('/geocode', authRequired, geocode)
router.post('/nearby', authRequired, nearbyPlaces)
router.post('/city', authRequired, cityPlaces)

export default router
