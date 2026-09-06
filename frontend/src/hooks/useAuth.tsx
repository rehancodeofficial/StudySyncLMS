import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { StoredUser } from '@/utils/auth'
import { getToken, getUser, setToken, setUser, clearAuth } from '@/utils/auth'

interface AuthContextType {
  user: StoredUser | null
  isAuthenticated: boolean
  login: (token: string, user: StoredUser) => void
  logout: () => void
}

const AuthContext = createContext<AuthContextType | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setAuthUser] = useState<StoredUser | null>(getUser())

  useEffect(() => {
    setAuthUser(getUser())
  }, [])

  const login = (token: string, userData: StoredUser) => {
    setToken(token)
    setUser(userData)
    setAuthUser(userData)
  }

  const logout = () => {
    clearAuth()
    setAuthUser(null)
    window.location.href = '/login'
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
