import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { User } from '@/types'
import { auth } from '@/utils/auth'

interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
  login: (token: string, refresh: string, user: User) => void
  logout: () => void
}

const AuthContext = createContext<AuthContextType | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(auth.getUser())

  useEffect(() => {
    setUser(auth.getUser())
  }, [])

  const login = (token: string, refresh: string, userData: User) => {
    auth.setSession(token, refresh, userData)
    setUser(userData)
  }

  const logout = () => {
    auth.clearSession()
    setUser(null)
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
