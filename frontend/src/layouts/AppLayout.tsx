import { useState } from 'react'
import { Outlet, Navigate } from 'react-router-dom'
import { Topbar } from '@/components/layout/Topbar'
import { Sidebar } from '@/components/layout/AdminSidebar'
import { Toaster } from '@/components/ui/Toast'
import { useAuth } from '@/hooks/useAuth'
import { cn } from '@/utils/cn'

function AppShell({ role, allowedRoles }: { role: 'admin' | 'teacher' | 'student', allowedRoles: string[] }) {
  const { isAuthenticated, user } = useAuth()
  const [sidebarOpen, setSidebarOpen] = useState(true)

  if (!isAuthenticated) return <Navigate to="/login" replace />
  if (user && !allowedRoles.includes(user.role)) {
    if (user.role === 'ROLE_INSTRUCTOR') return <Navigate to="/teacher/dashboard" replace />
    if (user.role === 'ROLE_STUDENT') return <Navigate to="/student/dashboard" replace />
    return <Navigate to="/admin/dashboard" replace />
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <Topbar onMenuToggle={() => setSidebarOpen(o => !o)} sidebarOpen={sidebarOpen} />
      <Sidebar open={sidebarOpen} role={role} />
      <main
        className={cn(
          'transition-all duration-300 min-h-screen pt-(--topbar-h)',
          sidebarOpen ? 'lg:pl-60' : 'lg:pl-0'
        )}
      >
        <div className="p-6">
          <Outlet />
        </div>
      </main>
      <Toaster />
    </div>
  )
}

const ADMIN_ROLES = ['ROLE_ADMIN']
const TEACHER_ROLES = ['ROLE_INSTRUCTOR']
const STUDENT_ROLES = ['ROLE_STUDENT']

export function AdminLayout() {
  return <AppShell role="admin" allowedRoles={ADMIN_ROLES} />
}

export function TeacherLayout() {
  return <AppShell role="teacher" allowedRoles={TEACHER_ROLES} />
}

export function StudentLayout() {
  return <AppShell role="student" allowedRoles={STUDENT_ROLES} />
}
