import axios from 'axios'

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:4000/api',
  timeout: 12000
})

export const fetchDashboard = async () => {
  const { data } = await apiClient.get('/location/dashboard')
  return data.data
}

export const analyzeLocation = async (payload) => {
  const { data } = await apiClient.post('/location/analyze', payload)
  return data.data
}

export const askAdvisor = async (payload) => {
  const { data } = await apiClient.post('/location/advisor', payload)
  return data.data
}
