function KpiCard ({ label, value, helper }) {
  return (
    <article className="kpi-card glass-panel">
      <p className="muted">{label}</p>
      <h3>{value}</h3>
      <p>{helper}</p>
    </article>
  )
}

export default KpiCard
