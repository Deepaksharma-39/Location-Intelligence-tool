import { useState } from 'react'
import { MapContainer, Marker, Popup, TileLayer, useMapEvents } from 'react-leaflet'
import { askIntelligence, findCityPlaces, findNearbyPlaces, geocodeLocation } from '../services/api'

function ClickPin ({ onPick }) {
  useMapEvents({
    click: (e) => {
      onPick({ lat: e.latlng.lat, lng: e.latlng.lng })
    }
  })
  return null
}

function MapIntelligencePage () {
  const [center, setCenter] = useState({ lat: 28.6139, lng: 77.209 })
  const [query, setQuery] = useState('Delhi')
  const [category, setCategory] = useState('cafe')
  const [city, setCity] = useState('Delhi')
  const [question, setQuestion] = useState('Give me footfall details and nearby cafe, hotels, theatre and gym opportunities.')
  const [places, setPlaces] = useState([])
  const [aiAnswer, setAiAnswer] = useState('')

  const onSearch = async () => {
    const data = await geocodeLocation(query)
    if (data.length > 0) {
      setCenter({ lat: data[0].lat, lng: data[0].lng })
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
        <p className="muted">Pin/search any location, list nearby businesses, and ask AI strategy questions.</p>
      </header>

      <div className="glass-panel stack map-controls">
        <label>Search Location<input value={query} onChange={(e) => setQuery(e.target.value)} /></label>
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
        <MapContainer center={[center.lat, center.lng]} zoom={13} style={{ height: '420px', borderRadius: '14px' }}>
          <TileLayer
            attribution='&copy; OpenStreetMap contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <ClickPin onPick={setCenter} />
          <Marker position={[center.lat, center.lng]}>
            <Popup>Pinned location</Popup>
          </Marker>
          {places.slice(0, 25).map((place) => (
            <Marker key={place.id} position={[place.lat, place.lng]}>
              <Popup>{place.name}</Popup>
            </Marker>
          ))}
        </MapContainer>
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
