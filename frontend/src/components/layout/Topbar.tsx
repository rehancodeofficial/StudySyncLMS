import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Menu, X, Bell, Search, ChevronDown, Settings, LogOut, User, HelpCircle } from 'lucide-react'
import { useAuth } from '@/hooks/useAuth'
import { cn } from '@/utils/cn'

interface TopbarProps {
  onMenuToggle: () => void
  sidebarOpen: boolean
}

const mockNotifications = [
  { id: '1', title: 'New assignment submitted', message: 'Ahmed Malik submitted CS-401 Assignment', time: '5 min ago', read: false, type: 'assignment' },
  { id: '2', title: 'Fee payment received', message: 'Sara Khan paid $1,200 for Semester 2', time: '1 hr ago', read: false, type: 'fee' },
  { id: '3', title: 'Exam scheduled', message: 'Final exams scheduled for Dec 15–20', time: '2 hrs ago', read: true, type: 'exam' },
  { id: '4', title: 'New admission application', message: 'Bilal Ahmed applied for BSc Computer Science', time: '3 hrs ago', read: true, type: 'admission' },
]

export function Topbar({ onMenuToggle, sidebarOpen }: TopbarProps) {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [notifOpen, setNotifOpen] = useState(false)
  const [userMenuOpen, setUserMenuOpen] = useState(false)
  const [notifications, setNotifications] = useState(mockNotifications)
  const notifRef = useRef<HTMLDivElement>(null)
  const userRef = useRef<HTMLDivElement>(null)

  const unreadCount = notifications.filter(n => !n.read).length

  useEffect(() => {
    function close(e: MouseEvent) {
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) setNotifOpen(false)
      if (userRef.current && !userRef.current.contains(e.target as Node)) setUserMenuOpen(false)
    }
    document.addEventListener('mousedown', close)
    return () => document.removeEventListener('mousedown', close)
  }, [])

  function markAllRead() {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })))
  }

  const notifIcons: Record<string, string> = {
    assignment: '📝', fee: '💰', exam: '📋', admission: '🎓', default: '🔔'
  }

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 bg-white topbar-shadow flex items-center px-4 gap-3"
      style={{ height: 'var(--topbar-h)' }}
    >
      {/* Menu toggle */}
      <button
        onClick={onMenuToggle}
        className="btn btn-ghost btn-icon btn-sm text-slate-500"
        aria-label="Toggle sidebar"
      >
        {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>

      {/* Logo */}
      <div className="flex items-center gap-2 shrink-0">
        <div className="w-7 h-7 rounded-lg overflow-hidden">
          <img src="/logo.png" alt="StudySync" className="w-full h-full object-contain" onError={e => { (e.target as HTMLImageElement).style.display = 'none' }} />
        </div>
        <span className="font-bold text-slate-800 text-sm hidden sm:block">StudySync</span>
      </div>

      {/* Search */}
      <div className="flex-1 max-w-md hidden md:block">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search students, courses, exams… (⌘K)"
            className="input pl-9 text-xs h-9 bg-slate-50 border-slate-200"
            readOnly
            onClick={() => {}}
          />
        </div>
      </div>

      <div className="flex items-center gap-1 ml-auto">
        {/* Mobile search icon */}
        <button className="btn btn-ghost btn-icon btn-sm md:hidden text-slate-500">
          <Search className="w-4 h-4" />
        </button>

        {/* Notifications */}
        <div ref={notifRef} className="relative">
          <button
            onClick={() => { setNotifOpen(o => !o); setUserMenuOpen(false) }}
            className="btn btn-ghost btn-icon btn-sm text-slate-500 relative"
            aria-label="Notifications"
          >
            <Bell className="w-4 h-4" />
            {unreadCount > 0 && (
              <span className="absolute top-0.5 right-0.5 w-4 h-4 bg-red-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                {unreadCount}
              </span>
            )}
          </button>

          {notifOpen && (
            <div className="absolute right-0 top-full mt-2 w-80 dropdown-menu">
              <div className="flex items-center justify-between p-3 border-b border-slate-100">
                <h3 className="text-sm font-semibold text-slate-800">Notifications</h3>
                {unreadCount > 0 && (
                  <button onClick={markAllRead} className="text-xs text-blue-650 hover:underline">Mark all read</button>
                )}
              </div>
              <div className="max-h-72 overflow-y-auto scrollbar-hide">
                {notifications.map(n => (
                  <div
                    key={n.id}
                    className={cn('p-3 flex gap-3 cursor-pointer hover:bg-slate-50 transition-colors', !n.read && 'bg-blue-50/40')}
                    onClick={() => setNotifications(prev => prev.map(x => x.id === n.id ? { ...x, read: true } : x))}
                  >
                    <span className="text-lg shrink-0">{notifIcons[n.type] ?? notifIcons.default}</span>
                    <div className="min-w-0">
                      <p className={cn('text-xs font-medium text-slate-800', !n.read && 'text-blue-800')}>{n.title}</p>
                      <p className="text-xs text-slate-500 truncate">{n.message}</p>
                      <p className="text-[10px] text-slate-400 mt-0.5">{n.time}</p>
                    </div>
                    {!n.read && <span className="w-2 h-2 rounded-full bg-blue-650 shrink-0 mt-1" />}
                  </div>
                ))}
              </div>
              <div className="p-2 border-t border-slate-100">
                <button
                  onClick={() => { navigate('/admin/notifications'); setNotifOpen(false) }}
                  className="w-full text-center text-xs text-blue-650 hover:underline py-1"
                >
                  View all notifications
                </button>
              </div>
            </div>
          )}
        </div>

        {/* User menu */}
        <div ref={userRef} className="relative">
          <button
            onClick={() => { setUserMenuOpen(o => !o); setNotifOpen(false) }}
            className="flex items-center gap-2 pl-2 pr-1 py-1 rounded-lg hover:bg-slate-100 transition-colors"
          >
            <div className="avatar w-7 h-7 text-xs">
              {user?.avatar
                ? <img src={user.avatar} alt={user?.name} className="w-full h-full object-cover rounded-full" />
                : <span>{user?.name?.slice(0, 2).toUpperCase() ?? 'U'}</span>
              }
            </div>
            <div className="text-left hidden sm:block">
              <p className="text-xs font-semibold text-slate-800 max-w-32 truncate">{user?.name}</p>
              <p className="text-[10px] text-slate-400">{user?.role?.replace(/_/g, ' ')}</p>
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 hidden sm:block" />
          </button>

          {userMenuOpen && (
            <div className="absolute right-0 top-full mt-2 w-52 dropdown-menu">
              <div className="px-3 py-2.5 border-b border-slate-100">
                <p className="text-xs font-semibold text-slate-800">{user?.name}</p>
                <p className="text-xs text-slate-400 truncate">{user?.email}</p>
              </div>
              <button onClick={() => { navigate('/profile'); setUserMenuOpen(false) }} className="dropdown-item">
                <User className="w-4 h-4" /> My Profile
              </button>
              <button onClick={() => { navigate('/admin/settings/general'); setUserMenuOpen(false) }} className="dropdown-item">
                <Settings className="w-4 h-4" /> Settings
              </button>
              <button onClick={() => { navigate('/help'); setUserMenuOpen(false) }} className="dropdown-item">
                <HelpCircle className="w-4 h-4" /> Help & Support
              </button>
              <div className="border-t border-slate-100 mt-1 pt-1">
                <button onClick={logout} className="dropdown-item danger">
                  <LogOut className="w-4 h-4" /> Sign out
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
