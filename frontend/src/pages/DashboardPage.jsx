import { useEffect, useState } from 'react'
import { ResponsiveContainer, BarChart, XAxis, YAxis, Tooltip, Bar } from 'recharts'
import KpiCard from '../components/KpiCard'
import { fetchDashboard } from '../services/api'

function DashboardPage () {
  const [dashboard, setDashboard] = useState(null)

  useEffect(() => {
    fetchDashboard().then(setDashboard).catch(console.error)
  }, [])

  if (!dashboard) {
    return <p className="muted">Loading dashboard intelligence...</p>
  }

  const { kpis, hotspots } = dashboard

  return (
    <section className="stack-lg">
      <header>
        <h2>Executive Command Center</h2>
        <p className="muted">Real-time signals for opportunity, growth, and saturation risk.</p>
      </header>

      <div className="grid four">
        <KpiCard label="Analyzed Locations" value={kpis.analyzedLocations} helper="India-wide benchmark set" />
        <KpiCard label="Average Opportunity" value={kpis.avgOpportunityScore} helper="Higher is stronger viability" />
        <KpiCard label="Average Growth" value={kpis.avgGrowthScore} helper="12-18 month outlook" />
        <KpiCard label="High Risk Zones" value={kpis.highRiskZones} helper="Saturation / low-spend pockets" />
      </div>

      <article className="glass-panel chart-wrap">
        <h3>Top Growth Hotspots</h3>
        <ResponsiveContainer width="100%" height={280}>
          <BarChart data={hotspots}>
            <XAxis dataKey="zone" stroke="#99a4c7" />
            <YAxis stroke="#99a4c7" />
            <Tooltip />
            <Bar dataKey="score" fill="#5c8dff" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </article>
    </section>
  )
}

export default DashboardPage
