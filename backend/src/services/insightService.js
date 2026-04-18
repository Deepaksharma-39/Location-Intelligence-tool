import { OpenAI } from 'openai'
import { env } from '../config/env.js'

const client = env.openaiApiKey
  ? new OpenAI({ apiKey: env.openaiApiKey })
  : null

const platformContext = `You are an expert advisor for an India-focused location intelligence platform.
You help with expansion, outlet optimization, footfall estimation strategy, DOOH recommendations, and growth/risk analysis.
Respond in concise bullets with practical action items and confidence notes.`

export const generateAiAdvisory = async ({ question, locationProfile, places = [] }) => {
  if (!client) {
    return {
      answer: 'AI key is not configured. Connect OPENAI_API_KEY to receive live AI recommendations.',
      confidence: 'low',
      source: 'fallback'
    }
  }

  const userPrompt = `Question: ${question}

Location profile:
${JSON.stringify(locationProfile, null, 2)}

Nearby/listed places dataset:
${JSON.stringify(places.slice(0, 25), null, 2)}`

  const response = await client.responses.create({
    model: env.openaiModel,
    input: [
      { role: 'system', content: platformContext },
      { role: 'user', content: userPrompt }
    ]
  })

  return {
    answer: response.output_text || 'No response generated.',
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
