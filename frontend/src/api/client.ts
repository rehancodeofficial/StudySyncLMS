import axios from 'axios'
import { auth } from '@/utils/auth'

const api = axios.create({
  baseURL: '/api',
  headers: { 'Content-Type': 'application/json' },
})

// Attach access token to every request
api.interceptors.request.use((config) => {
  const token = auth.getToken()
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

// Handle 401 — attempt token refresh
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const original = error.config
    if (error.response?.status === 401 && !original._retry) {
      original._retry = true
      try {
        const refreshToken = auth.getRefreshToken()
        const res = await axios.post('/api/auth/refresh', { refreshToken })
        const { token, user } = res.data
        auth.setSession(token, refreshToken!, user)
        original.headers.Authorization = `Bearer ${token}`
        return api(original)
      } catch {
        auth.clearSession()
        window.location.href = '/login'
      }
    }
    return Promise.reject(error)
  }
)

export default api
