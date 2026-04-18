import { z } from 'zod'
import { generateAiAdvisory, scoreLocation } from '../services/insightService.js'

const analyzeSchema = z.object({
  locationName: z.string().min(2),
  category: z.string().min(2),
  metrics: z.object({
    footfall: z.number().min(0).max(100),
    competition: z.number().min(0).max(100),
    purchasingPower: z.number().min(0).max(100),
    growthSignal: z.number().min(0).max(100)
  })
})

const advisorSchema = z.object({
  question: z.string().min(10),
  locationProfile: z.object({
    locationName: z.string().min(2),
    businessCategory: z.string().min(2),
    knownIssues: z.array(z.string()).default([]),
    strengths: z.array(z.string()).default([])
  })
})

export const analyzeLocation = async (req, res, next) => {
  try {
    const data = analyzeSchema.parse(req.body)
    const scores = scoreLocation(data.metrics)

    const recommendations = [
      'Prioritize visibility near high-footfall corridors.',
      'Plan localized offers tailored for neighborhood customer segments.',
      'Track category-level demand weekly to adjust inventory and staffing.'
    ]

    res.json({
      success: true,
      data: {
        ...data,
        scores,
        recommendations
      }
    })
  } catch (error) {
    next(error)
  }
}

export const askAdvisor = async (req, res, next) => {
  try {
    const data = advisorSchema.parse(req.body)
    const result = await generateAiAdvisory(data)

    res.json({
      success: true,
      data: result
    })
  } catch (error) {
    next(error)
  }
}

export const getMockDashboard = (req, res) => {
  res.json({
    success: true,
    data: {
      kpis: {
        analyzedLocations: 481,
        avgOpportunityScore: 72,
        avgGrowthScore: 68,
        highRiskZones: 41
      },
      hotspots: [
        { city: 'Bengaluru', zone: 'Whitefield', score: 83 },
        { city: 'Hyderabad', zone: 'Madhapur', score: 79 },
        { city: 'Pune', zone: 'Hinjewadi', score: 77 }
      ]
    }
  })
}
