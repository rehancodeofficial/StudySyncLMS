import { User, Role } from '@/types'

const TOKEN_KEY = 'studysync_token'
const REFRESH_TOKEN_KEY = 'studysync_refresh'
const USER_KEY = 'studysync_user'

export const auth = {
  getToken: () => localStorage.getItem(TOKEN_KEY),
  getRefreshToken: () => localStorage.getItem(REFRESH_TOKEN_KEY),
  getUser: (): User | null => {
    const u = localStorage.getItem(USER_KEY)
    return u ? JSON.parse(u) : null
  },
  setSession: (token: string, refresh: string, user: User) => {
    localStorage.setItem(TOKEN_KEY, token)
    localStorage.setItem(REFRESH_TOKEN_KEY, refresh)
    localStorage.setItem(USER_KEY, JSON.stringify(user))
  },
  clearSession: () => {
    localStorage.removeItem(TOKEN_KEY)
    localStorage.removeItem(REFRESH_TOKEN_KEY)
    localStorage.removeItem(USER_KEY)
  },
  isAuthenticated: () => !!localStorage.getItem(TOKEN_KEY),
}

export const roleRedirects: Record<Role, string> = {
  SUPER_ADMIN: '/admin/dashboard',
  UNIVERSITY_ADMIN: '/admin/dashboard',
  DEPARTMENT_ADMIN: '/admin/dashboard',
  FACULTY: '/teacher/dashboard',
  STUDENT: '/student/dashboard',
  ACCOUNTANT: '/admin/finance',
  LIBRARIAN: '/admin/library',
  HR: '/admin/hr',
  RECEPTIONIST: '/admin/admissions',
  TRANSPORT_MANAGER: '/admin/transport',
}

export const canAccess = (user: User | null, requiredRoles: Role[]): boolean => {
  if (!user) return false
  return requiredRoles.includes(user.role)
}
