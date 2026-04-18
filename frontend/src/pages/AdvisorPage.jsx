import { useState } from 'react'
import { askAdvisor } from '../services/api'

function AdvisorPage () {
  const [question, setQuestion] = useState('How can I improve my existing cafe in a student-heavy area?')
  const [answer, setAnswer] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (event) => {
    event.preventDefault()
    setLoading(true)

    try {
      const data = await askAdvisor({
        question,
        locationProfile: {
          locationName: 'Baner, Pune',
          businessCategory: 'Cafe',
          knownIssues: ['Weekday afternoon slowdown', 'Low conversion from walk-ins'],
          strengths: ['High student density', 'Strong evening traffic']
        }
      })
      setAnswer(data)
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="stack-lg">
      <header>
        <h2>AI Business Advisor</h2>
        <p className="muted">Ask natural-language strategy questions for growth, optimization, and risk mitigation.</p>
      </header>

      <form className="glass-panel stack" onSubmit={handleSubmit}>
        <label>
          Ask your question
          <textarea rows="4" value={question} onChange={(e) => setQuestion(e.target.value)} />
        </label>
        <button className="btn-primary" type="submit" disabled={loading}>
          {loading ? 'Generating advice...' : 'Get Recommendation'}
        </button>
      </form>

      {answer && (
        <article className="glass-panel stack">
          <h3>Advisor Response</h3>
          <p>{answer.answer}</p>
          <p className="muted">Confidence: {answer.confidence} · Source: {answer.source}</p>
        </article>
      )}
    </section>
  )
}

export default AdvisorPage
