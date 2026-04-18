import { Router } from 'express'
import { analyzeLocation, askAdvisor, getMockDashboard } from '../controllers/locationController.js'

const router = Router()

router.get('/dashboard', getMockDashboard)
router.post('/analyze', analyzeLocation)
router.post('/advisor', askAdvisor)

export default router
