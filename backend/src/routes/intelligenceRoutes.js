import { Router } from 'express'
import { askIntelligence } from '../controllers/intelligenceController.js'
import { authRequired } from '../middleware/auth.js'

const router = Router()

router.post('/ask', authRequired, askIntelligence)

export default router
