import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { getCurrentUser, loginUser, registerUser } from '../services/api'

const AuthContext = createContext(null)

export function AuthProvider ({ children }) {
  const [token, setToken] = useState(localStorage.getItem('lip_token'))
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(Boolean(token))

  useEffect(() => {
    if (!token) return
    getCurrentUser()
      .then(setUser)
      .catch(() => {
        localStorage.removeItem('lip_token')
        setToken(null)
      })
      .finally(() => setLoading(false))
  }, [token])

  const login = async (credentials) => {
    const data = await loginUser(credentials)
    localStorage.setItem('lip_token', data.token)
    setToken(data.token)
    setUser(data.user)
  }

  const register = async (payload) => {
    const data = await registerUser(payload)
    localStorage.setItem('lip_token', data.token)
    setToken(data.token)
    setUser(data.user)
  }

  const logout = () => {
    localStorage.removeItem('lip_token')
    setToken(null)
    setUser(null)
  }

  const value = useMemo(() => ({ token, user, loading, login, register, logout }), [token, user, loading])

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth () {
  return useContext(AuthContext)
}
