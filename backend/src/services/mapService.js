import axios from 'axios'
import { env } from '../config/env.js'

const http = axios.create({ timeout: 12000 })

export const geocodeLocation = async (query) => {
  const { data } = await http.get(`${env.nominatimUrl}/search`, {
    params: { q: query, format: 'json', addressdetails: 1, limit: 5 },
    headers: { 'User-Agent': 'location-intelligence-platform/1.0' }
  })

  return data.map((item) => ({
    placeId: item.place_id,
    displayName: item.display_name,
    lat: Number(item.lat),
    lng: Number(item.lon),
    type: item.type
  }))
}

const buildAroundQuery = ({ lat, lng, radius, category }) => `
[out:json][timeout:25];
(
  node["amenity"="${category}"](around:${radius},${lat},${lng});
  way["amenity"="${category}"](around:${radius},${lat},${lng});
  relation["amenity"="${category}"](around:${radius},${lat},${lng});
);
out center tags;
`

const buildCityQuery = ({ city, category }) => `
[out:json][timeout:25];
area["name"="${city}"]->.searchArea;
(
  node["amenity"="${category}"](area.searchArea);
  way["amenity"="${category}"](area.searchArea);
  relation["amenity"="${category}"](area.searchArea);
);
out center tags;
`

export const searchNearbyPlaces = async ({ lat, lng, radius = 2000, category = 'cafe' }) => {
  const query = buildAroundQuery({ lat, lng, radius, category })
  const { data } = await http.post(env.overpassEndpoint, query, {
    headers: { 'Content-Type': 'text/plain' }
  })

  return (data.elements || []).map((el) => ({
    id: el.id,
    name: el.tags?.name || `Unnamed ${category}`,
    category,
    lat: el.lat || el.center?.lat,
    lng: el.lon || el.center?.lon,
    address: [el.tags?.['addr:street'], el.tags?.['addr:city']].filter(Boolean).join(', ')
  }))
}

export const searchCityPlaces = async ({ city, category = 'cafe' }) => {
  const query = buildCityQuery({ city, category })
  const { data } = await http.post(env.overpassEndpoint, query, {
    headers: { 'Content-Type': 'text/plain' }
  })

  return (data.elements || []).slice(0, 100).map((el) => ({
    id: el.id,
    name: el.tags?.name || `Unnamed ${category}`,
    category,
    lat: el.lat || el.center?.lat,
    lng: el.lon || el.center?.lon,
    address: [el.tags?.['addr:street'], el.tags?.['addr:city']].filter(Boolean).join(', ')
  }))
}
