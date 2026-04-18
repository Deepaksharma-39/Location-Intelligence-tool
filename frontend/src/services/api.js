import axios from 'axios'

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:4000/api',
  timeout: 15000
})

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('lip_token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export const registerUser = async (payload) => {
  const { data } = await apiClient.post('/auth/register', payload)
  return data.data
}

export const loginUser = async (payload) => {
  const { data } = await apiClient.post('/auth/login', payload)
  return data.data
}

export const getCurrentUser = async () => {
  const { data } = await apiClient.get('/auth/me')
  return data.data
}

export const fetchDashboard = async () => {
  const { data } = await apiClient.get('/location/dashboard')
  return data.data
}

export const analyzeLocation = async (payload) => {
  const { data } = await apiClient.post('/location/analyze', payload)
  return data.data
}

export const geocodeLocation = async (query) => {
  const { data } = await apiClient.get('/map/geocode', { params: { query } })
  return data.data
}

export const findNearbyPlaces = async (payload) => {
  const { data } = await apiClient.post('/map/nearby', payload)
  return data.data
}

export const findCityPlaces = async (payload) => {
  const { data } = await apiClient.post('/map/city', payload)
  return data.data
}

export const askIntelligence = async (payload) => {
  const { data } = await apiClient.post('/intelligence/ask', payload)
  return data.data
}

export const askAdvisor = async (payload) => {
  const { data } = await apiClient.post('/location/advisor', payload)
  return data.data
}
