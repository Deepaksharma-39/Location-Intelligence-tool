import { useState } from 'react'
import { analyzeLocation } from '../services/api'

const initial = {
  locationName: 'HSR Layout, Bengaluru',
  category: 'Cafe',
  metrics: {
    footfall: 72,
    competition: 64,
    purchasingPower: 70,
    growthSignal: 75
  }
}

function AnalysisPage () {
  const [form, setForm] = useState(initial)
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)

  const updateMetric = (key, value) => {
    setForm((prev) => ({ ...prev, metrics: { ...prev.metrics, [key]: Number(value) } }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setLoading(true)
    try {
      const data = await analyzeLocation(form)
      setResult(data)
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="stack-lg">
      <header>
        <h2>Location Analysis Studio</h2>
        <p className="muted">Score opportunities by combining demand, competition, spend capacity, and growth signal.</p>
      </header>

      <form className="glass-panel stack" onSubmit={handleSubmit}>
        <label>
          Location
          <input value={form.locationName} onChange={(e) => setForm({ ...form, locationName: e.target.value })} />
        </label>
        <label>
          Business Category
          <input value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} />
        </label>

        <div className="grid two">
          {Object.entries(form.metrics).map(([key, value]) => (
            <label key={key}>
              {key}
              <input type="range" min="0" max="100" value={value} onChange={(e) => updateMetric(key, e.target.value)} />
              <span className="muted">{value}</span>
            </label>
          ))}
        </div>

        <button className="btn-primary" type="submit" disabled={loading}>
          {loading ? 'Running analysis...' : 'Analyze Location'}
        </button>
      </form>

      {result && (
        <article className="glass-panel stack">
          <h3>Analysis Output</h3>
          <p>Opportunity Score: <strong>{result.scores.opportunityScore}</strong></p>
          <p>Growth Score: <strong>{result.scores.growthScore}</strong></p>
          <p>Classification: <strong>{result.scores.label}</strong></p>
          <ul>
            {result.recommendations.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </article>
      )}
    </section>
  )
}

export default AnalysisPage
