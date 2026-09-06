import type { Role } from '@/types'

const TOKEN_KEY = 'studysync_token'
const USER_KEY = 'studysync_user'

export interface StoredUser {
  id: string
  name: string
  email: string
  role: Role
  organizationId?: number | null
  avatar?: string
}

export const roleRedirects: Record<Role, string> = {
  ROLE_SUPER_ADMIN: '/platform/dashboard',
  ROLE_ORG_ADMIN: '/admin/dashboard',
  ROLE_INSTRUCTOR: '/teacher/dashboard',
  ROLE_STUDENT: '/student/dashboard',
}


export function getToken(): string | null {
  return localStorage.getItem(TOKEN_KEY)
}

export function setToken(token: string): void {
  localStorage.setItem(TOKEN_KEY, token)
}

export function getUser(): StoredUser | null {
  const raw = localStorage.getItem(USER_KEY)
  if (!raw) return null
  try { return JSON.parse(raw) } catch { return null }
}

export function setUser(user: StoredUser): void {
  localStorage.setItem(USER_KEY, JSON.stringify(user))
}

export function clearAuth(): void {
  localStorage.removeItem(TOKEN_KEY)
  localStorage.removeItem(USER_KEY)
}

export function isAuthenticated(): boolean {
  return !!getToken() && !!getUser()
}

export function canAccess(user: StoredUser | null, requiredRoles: Role[]): boolean {
  if (!user) return false
  return requiredRoles.includes(user.role)
}
