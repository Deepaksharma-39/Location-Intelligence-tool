import { OpenAI } from 'openai'
import { env } from '../config/env.js'

const client = env.openaiApiKey
  ? new OpenAI({ apiKey: env.openaiApiKey })
  : null

const platformContext = `You are an expert advisor for an India-focused location intelligence platform.
You help with business expansion, outlet optimization, DOOH recommendations, and growth/risk analysis.
Always give concise business-first recommendations with reasons and confidence level.`

export const generateAiAdvisory = async ({ question, locationProfile }) => {
  if (!client) {
    return {
      answer: 'AI key is not configured. Connect OPENAI_API_KEY to receive live AI recommendations.',
      confidence: 'low',
      source: 'fallback'
    }
  }

  const userPrompt = `Question: ${question}\n\nLocation profile:\n${JSON.stringify(locationProfile, null, 2)}`

  const response = await client.responses.create({
    model: env.openaiModel,
    input: [
      { role: 'system', content: platformContext },
      { role: 'user', content: userPrompt }
    ]
  })

  const answer = response.output_text || 'No response generated.'

  return {
    answer,
    confidence: 'medium',
    source: 'openai'
  }
}

export const scoreLocation = ({ footfall, competition, purchasingPower, growthSignal }) => {
  const normalizedCompetition = Math.max(0, 100 - competition)

  const opportunityScore = Math.round(
    (footfall * 0.3) +
      (normalizedCompetition * 0.2) +
      (purchasingPower * 0.3) +
      (growthSignal * 0.2)
  )

  const growthScore = Math.round((growthSignal * 0.6) + (footfall * 0.2) + (purchasingPower * 0.2))

  return {
    opportunityScore,
    growthScore,
    label: opportunityScore >= 75 ? 'high-potential' : opportunityScore >= 55 ? 'moderate' : 'risky'
  }
}
