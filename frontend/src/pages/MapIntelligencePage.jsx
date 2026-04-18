import { useMemo, useState } from 'react'
import { askIntelligence, findCityPlaces, findNearbyPlaces, geocodeLocation } from '../services/api'

function MapIntelligencePage () {
  const [center, setCenter] = useState({ lat: 28.6139, lng: 77.209 })
  const [query, setQuery] = useState('Delhi')
  const [category, setCategory] = useState('cafe')
  const [city, setCity] = useState('Delhi')
  const [question, setQuestion] = useState('Give me footfall details and nearby cafe, hotels, theatre and gym opportunities.')
  const [places, setPlaces] = useState([])
  const [aiAnswer, setAiAnswer] = useState('')

  const osmEmbedUrl = useMemo(() => {
    const delta = 0.03
    const left = center.lng - delta
    const right = center.lng + delta
    const top = center.lat + delta
    const bottom = center.lat - delta
    return `https://www.openstreetmap.org/export/embed.html?bbox=${left}%2C${bottom}%2C${right}%2C${top}&layer=mapnik&marker=${center.lat}%2C${center.lng}`
  }, [center])

  const onSearch = async () => {
    const data = await geocodeLocation(query)
    if (data.length > 0) {
      setCenter({ lat: data[0].lat, lng: data[0].lng })
      setCity(data[0].displayName.split(',')[0])
    }
  }

  const onNearby = async () => {
    const data = await findNearbyPlaces({ ...center, category, radius: 2500 })
    setPlaces(data)
  }

  const onCityList = async () => {
    const data = await findCityPlaces({ city, category })
    setPlaces(data)
  }

  const onAskAI = async () => {
    const data = await askIntelligence({
      question,
      mode: city ? 'city' : 'nearby',
      city,
      category,
      lat: center.lat,
      lng: center.lng,
      radius: 2500
    })

    setAiAnswer(data.ai.answer)
    setPlaces(data.places)
  }

  return (
    <section className="stack-lg">
      <header>
        <h2>Map + AI Intelligence</h2>
        <p className="muted">Search a location, set coordinates, list nearby businesses, and ask AI strategy questions.</p>
      </header>

      <div className="glass-panel stack map-controls">
        <label>Search Location<input value={query} onChange={(e) => setQuery(e.target.value)} /></label>
        <div className="grid two">
          <label>Latitude
            <input type="number" value={center.lat} onChange={(e) => setCenter({ ...center, lat: Number(e.target.value) })} />
          </label>
          <label>Longitude
            <input type="number" value={center.lng} onChange={(e) => setCenter({ ...center, lng: Number(e.target.value) })} />
          </label>
        </div>

        <div className="grid two">
          <label>Category
            <select value={category} onChange={(e) => setCategory(e.target.value)}>
              <option value="cafe">Cafe</option>
              <option value="restaurant">Restaurant</option>
              <option value="hotel">Hotel</option>
              <option value="theatre">Theatre</option>
              <option value="gym">Gym</option>
            </select>
          </label>
          <label>City (for full city listing)
            <input value={city} onChange={(e) => setCity(e.target.value)} placeholder="Delhi" />
          </label>
        </div>

        <label>Ask AI<input value={question} onChange={(e) => setQuestion(e.target.value)} /></label>

        <div className="btn-row">
          <button className="btn-primary" onClick={onSearch}>Search on Map</button>
          <button className="btn-primary" onClick={onNearby}>Nearby {category}</button>
          <button className="btn-primary" onClick={onCityList}>All listed {category} in city</button>
          <button className="btn-primary" onClick={onAskAI}>Ask AI with Data</button>
        </div>
      </div>

      <article className="glass-panel" style={{ padding: '1rem' }}>
        <iframe
          title="OpenStreetMap"
          src={osmEmbedUrl}
          className="map-embed"
        />
      </article>

      {aiAnswer && (
        <article className="glass-panel stack">
          <h3>AI Recommendation</h3>
          <p>{aiAnswer}</p>
        </article>
      )}

      <article className="glass-panel stack" style={{ padding: '1rem' }}>
        <h3>Places ({places.length})</h3>
        <ul>
          {places.slice(0, 30).map((place) => (
            <li key={place.id}>{place.name} — {place.address || 'address unavailable'}</li>
          ))}
        </ul>
      </article>
    </section>
  )
}

export default MapIntelligencePage
