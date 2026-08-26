import { useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { useAuth } from '@/hooks/useAuth'
import { cn } from '@/utils/cn'
import {
  LayoutDashboard, Users, GraduationCap, BookOpen, Building2, ClipboardList,
  Calendar, BarChart3, Settings, FileText, CreditCard, Library, Bus, Home,
  UserCog, Bell, LogOut, ChevronDown, ChevronRight, Shield, Award,
  MessageSquare, Megaphone, ClipboardCheck, BookMarked, Banknote,
  UserCheck, Briefcase, MapPin, BedDouble, Receipt, PieChart, HelpCircle,
  DoorOpen, Activity
} from 'lucide-react'

interface NavItem {
  label: string
  path: string
  icon: React.ReactNode
  children?: { label: string; path: string }[]
  badge?: string | number
}

const adminNav: NavItem[] = [
  { label: 'Dashboard', path: '/admin/dashboard', icon: <LayoutDashboard className="w-4 h-4" /> },
  { label: 'Admissions', path: '/admin/admissions', icon: <DoorOpen className="w-4 h-4" />, children: [
    { label: 'Applications', path: '/admin/admissions/applications' },
    { label: 'Pending', path: '/admin/admissions/pending' },
    { label: 'Approved', path: '/admin/admissions/approved' },
    { label: 'Enrollment', path: '/admin/admissions/enrollment' },
  ]},
  { label: 'Students', path: '/admin/students', icon: <Users className="w-4 h-4" /> },
  { label: 'Academics', path: '/admin/academics', icon: <GraduationCap className="w-4 h-4" />, children: [
    { label: 'Departments', path: '/admin/departments' },
    { label: 'Programs', path: '/admin/programs' },
    { label: 'Courses', path: '/admin/courses' },
    { label: 'Subjects', path: '/admin/subjects' },
    { label: 'Enrollments', path: '/admin/enrollments' },
  ]},
  { label: 'Faculty', path: '/admin/teachers', icon: <UserCheck className="w-4 h-4" /> },
  { label: 'Attendance', path: '/admin/attendance', icon: <ClipboardCheck className="w-4 h-4" /> },
  { label: 'Assignments', path: '/admin/assignments', icon: <ClipboardList className="w-4 h-4" /> },
  { label: 'Exams', path: '/admin/exams', icon: <BookMarked className="w-4 h-4" />, children: [
    { label: 'Exam List', path: '/admin/exams/list' },
    { label: 'Schedule', path: '/admin/exams/schedule' },
    { label: 'Gradebook', path: '/admin/exams/gradebook' },
    { label: 'Results', path: '/admin/results' },
    { label: 'Report Cards', path: '/admin/results/report-cards' },
  ]},
  { label: 'Timetable', path: '/admin/timetable', icon: <Calendar className="w-4 h-4" /> },
  { label: 'Finance', path: '/admin/finance', icon: <Banknote className="w-4 h-4" />, children: [
    { label: 'Overview', path: '/admin/finance' },
    { label: 'Fee Structure', path: '/admin/fees/structure' },
    { label: 'Invoices', path: '/admin/fees/invoices' },
    { label: 'Payments', path: '/admin/fees/payments' },
    { label: 'Scholarships', path: '/admin/fees/scholarships' },
    { label: 'Expenses', path: '/admin/finance/expenses' },
    { label: 'Reports', path: '/admin/finance/reports' },
  ]},
  { label: 'Communication', path: '/admin/announcements', icon: <Megaphone className="w-4 h-4" />, children: [
    { label: 'Announcements', path: '/admin/announcements' },
    { label: 'Messages', path: '/admin/messages' },
    { label: 'Notifications', path: '/admin/notifications' },
  ]},
  { label: 'Calendar & Events', path: '/admin/calendar', icon: <Calendar className="w-4 h-4" /> },
  { label: 'Library', path: '/admin/library', icon: <Library className="w-4 h-4" /> },
  { label: 'Transport', path: '/admin/transport', icon: <Bus className="w-4 h-4" /> },
  { label: 'Hostel', path: '/admin/hostel', icon: <BedDouble className="w-4 h-4" /> },
  { label: 'HR', path: '/admin/hr', icon: <Briefcase className="w-4 h-4" /> },
  { label: 'Reports', path: '/admin/reports', icon: <PieChart className="w-4 h-4" /> },
  { label: 'Documents', path: '/admin/documents', icon: <FileText className="w-4 h-4" /> },
  { label: 'Certificates', path: '/admin/certificates', icon: <Award className="w-4 h-4" /> },
  { label: 'Users & RBAC', path: '/admin/users', icon: <Shield className="w-4 h-4" />, children: [
    { label: 'Users', path: '/admin/users' },
    { label: 'Roles', path: '/admin/roles' },
    { label: 'Permissions', path: '/admin/permissions' },
    { label: 'Audit Logs', path: '/admin/audit-logs' },
  ]},
  { label: 'Settings', path: '/admin/settings/general', icon: <Settings className="w-4 h-4" /> },
]

const teacherNav: NavItem[] = [
  { label: 'Dashboard', path: '/teacher/dashboard', icon: <LayoutDashboard className="w-4 h-4" /> },
  { label: 'My Courses', path: '/teacher/courses', icon: <BookOpen className="w-4 h-4" /> },
  { label: 'My Classes', path: '/teacher/classes', icon: <Users className="w-4 h-4" /> },
  { label: 'Students', path: '/teacher/students', icon: <GraduationCap className="w-4 h-4" /> },
  { label: 'Attendance', path: '/teacher/attendance', icon: <ClipboardCheck className="w-4 h-4" /> },
  { label: 'Assignments', path: '/teacher/assignments', icon: <ClipboardList className="w-4 h-4" /> },
  { label: 'Exams', path: '/teacher/exams', icon: <BookMarked className="w-4 h-4" /> },
  { label: 'Gradebook', path: '/teacher/gradebook', icon: <BarChart3 className="w-4 h-4" /> },
  { label: 'Timetable', path: '/teacher/timetable', icon: <Calendar className="w-4 h-4" /> },
  { label: 'Lesson Plans', path: '/teacher/lesson-plans', icon: <FileText className="w-4 h-4" /> },
  { label: 'Resources', path: '/teacher/resources', icon: <BookOpen className="w-4 h-4" /> },
  { label: 'Announcements', path: '/teacher/announcements', icon: <Megaphone className="w-4 h-4" /> },
  { label: 'Messages', path: '/teacher/messages', icon: <MessageSquare className="w-4 h-4" /> },
  { label: 'Leave', path: '/teacher/leave', icon: <Home className="w-4 h-4" /> },
  { label: 'Documents', path: '/teacher/documents', icon: <FileText className="w-4 h-4" /> },
  { label: 'Notifications', path: '/teacher/notifications', icon: <Bell className="w-4 h-4" /> },
  { label: 'Settings', path: '/teacher/settings', icon: <Settings className="w-4 h-4" /> },
]

const studentNav: NavItem[] = [
  { label: 'Dashboard', path: '/student/dashboard', icon: <LayoutDashboard className="w-4 h-4" /> },
  { label: 'My Courses', path: '/student/courses', icon: <BookOpen className="w-4 h-4" /> },
  { label: 'Subjects', path: '/student/subjects', icon: <BookMarked className="w-4 h-4" /> },
  { label: 'Timetable', path: '/student/timetable', icon: <Calendar className="w-4 h-4" /> },
  { label: 'Attendance', path: '/student/attendance', icon: <ClipboardCheck className="w-4 h-4" /> },
  { label: 'Assignments', path: '/student/assignments', icon: <ClipboardList className="w-4 h-4" /> },
  { label: 'Exams', path: '/student/exams', icon: <BookMarked className="w-4 h-4" /> },
  { label: 'Results', path: '/student/results', icon: <BarChart3 className="w-4 h-4" /> },
  { label: 'Grades', path: '/student/grades', icon: <Award className="w-4 h-4" /> },
  { label: 'Fees', path: '/student/fees', icon: <CreditCard className="w-4 h-4" /> },
  { label: 'Documents', path: '/student/documents', icon: <FileText className="w-4 h-4" /> },
  { label: 'Certificates', path: '/student/certificates', icon: <Award className="w-4 h-4" /> },
  { label: 'Announcements', path: '/student/announcements', icon: <Megaphone className="w-4 h-4" /> },
  { label: 'Messages', path: '/student/messages', icon: <MessageSquare className="w-4 h-4" /> },
  { label: 'Notifications', path: '/student/notifications', icon: <Bell className="w-4 h-4" /> },
  { label: 'Settings', path: '/student/settings', icon: <Settings className="w-4 h-4" /> },
]

function NavGroup({ item }: { item: NavItem }) {
  const location = useLocation()
  const isActive = location.pathname.startsWith(item.path)
  const [expanded, setExpanded] = useState(isActive)

  if (item.children) {
    return (
      <div>
        <button
          onClick={() => setExpanded(e => !e)}
          className={cn('sidebar-link', isActive && 'active')}
          style={{ justifyContent: 'space-between' }}
        >
          <span className="flex items-center gap-2.5">
            {item.icon}
            <span>{item.label}</span>
          </span>
          {expanded
            ? <ChevronDown className="w-3.5 h-3.5 opacity-60" />
            : <ChevronRight className="w-3.5 h-3.5 opacity-60" />
          }
        </button>
        {expanded && (
          <div className="ml-7 mt-0.5 flex flex-col gap-0.5 border-l border-slate-100 pl-3">
            {item.children.map(child => (
              <NavLink
                key={child.path}
                to={child.path}
                className={({ isActive }) =>
                  cn('text-sm py-1.5 px-2 rounded-md transition-colors block', isActive
                    ? 'text-blue-650 font-medium bg-blue-50'
                    : 'text-slate-500 hover:text-slate-800 hover:bg-slate-50'
                  )
                }
                end
              >
                {child.label}
              </NavLink>
            ))}
          </div>
        )}
      </div>
    )
  }

  return (
    <NavLink
      to={item.path}
      className={({ isActive }) => cn('sidebar-link', isActive && 'active')}
      end={item.path.split('/').length <= 2}
    >
      {item.icon}
      <span>{item.label}</span>
      {item.badge && (
        <span className="ml-auto text-xs bg-blue-100 text-blue-650 px-1.5 py-0.5 rounded-full font-medium">
          {item.badge}
        </span>
      )}
    </NavLink>
  )
}

interface SidebarProps {
  open: boolean
  role: 'admin' | 'teacher' | 'student'
}

export function Sidebar({ open, role }: SidebarProps) {
  const { user, logout } = useAuth()
  const navItems = role === 'admin' ? adminNav : role === 'teacher' ? teacherNav : studentNav

  return (
    <>
      {/* Mobile overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black/40 z-30 lg:hidden"
          onClick={() => {}}
        />
      )}

      <aside
        className={cn(
          'fixed top-0 left-0 h-full z-40 flex flex-col bg-white border-r border-slate-200 transition-all duration-300',
          open ? 'w-60 translate-x-0' : 'w-0 -translate-x-full lg:w-16 lg:translate-x-0'
        )}
        style={{ paddingTop: 'var(--topbar-h)' }}
      >
        {open && (
          <div className="flex flex-col flex-1 overflow-hidden">
            {/* User info */}
            <div className="px-3 py-3 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <div className="avatar w-8 h-8 text-xs shrink-0">
                  {user?.avatar
                    ? <img src={user.avatar} alt={user?.name} />
                    : user?.name?.slice(0, 2).toUpperCase()
                  }
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-semibold text-slate-800 truncate">{user?.name}</p>
                  <p className="text-xs text-slate-400 truncate">{user?.role?.replace('_', ' ')}</p>
                </div>
              </div>
            </div>

            {/* Nav items */}
            <nav className="flex-1 overflow-y-auto scrollbar-hide px-2 py-3 flex flex-col gap-0.5">
              {navItems.map(item => (
                <NavGroup key={item.path} item={item} />
              ))}
            </nav>

            {/* Footer */}
            <div className="px-2 py-3 border-t border-slate-100 flex flex-col gap-0.5">
              <NavLink to="/profile" className={({ isActive }) => cn('sidebar-link', isActive && 'active')}>
                <UserCog className="w-4 h-4" />
                Profile
              </NavLink>
              <NavLink to="/help" className={({ isActive }) => cn('sidebar-link', isActive && 'active')}>
                <HelpCircle className="w-4 h-4" />
                Help
              </NavLink>
              <button onClick={logout} className="sidebar-link text-red-500 hover:bg-red-50 hover:text-red-600">
                <LogOut className="w-4 h-4" />
                Sign out
              </button>
            </div>
          </div>
        )}
      </aside>
    </>
  )
}

// Keep old export for compatibility
export { Sidebar as AdminSidebar }
