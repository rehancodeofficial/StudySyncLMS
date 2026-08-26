import { useState, useEffect } from 'react'
import { X, CheckCircle, AlertTriangle, Info, XCircle } from 'lucide-react'

export type ToastType = 'success' | 'error' | 'warning' | 'info'

interface Toast {
  id: string
  type: ToastType
  title: string
  message?: string
}

let toastListeners: ((toasts: Toast[]) => void)[] = []
let currentToasts: Toast[] = []

function notifyListeners() {
  toastListeners.forEach(l => l([...currentToasts]))
}

export const toast = {
  success: (title: string, message?: string) => addToast('success', title, message),
  error: (title: string, message?: string) => addToast('error', title, message),
  warning: (title: string, message?: string) => addToast('warning', title, message),
  info: (title: string, message?: string) => addToast('info', title, message),
}

function addToast(type: ToastType, title: string, message?: string) {
  const id = Math.random().toString(36).slice(2)
  currentToasts = [...currentToasts, { id, type, title, message }]
  notifyListeners()
  setTimeout(() => {
    currentToasts = currentToasts.filter(t => t.id !== id)
    notifyListeners()
  }, 4500)
}

const icons = {
  success: <CheckCircle className="w-5 h-5 text-green-500" />,
  error: <XCircle className="w-5 h-5 text-red-500" />,
  warning: <AlertTriangle className="w-5 h-5 text-yellow-500" />,
  info: <Info className="w-5 h-5 text-blue-500" />,
}

const styles = {
  success: 'border-l-green-500',
  error: 'border-l-red-500',
  warning: 'border-l-yellow-500',
  info: 'border-l-blue-500',
}

export function Toaster() {
  const [toasts, setToasts] = useState<Toast[]>([])

  useEffect(() => {
    toastListeners.push(setToasts)
    return () => { toastListeners = toastListeners.filter(l => l !== setToasts) }
  }, [])

  if (toasts.length === 0) return null

  return (
    <div className="fixed bottom-6 right-6 z-200 flex flex-col gap-2 pointer-events-none">
      {toasts.map(t => (
        <div
          key={t.id}
          className={`pointer-events-auto bg-white rounded-lg border border-slate-200 border-l-4 ${styles[t.type]} shadow-lg p-4 max-w-sm w-full flex gap-3 items-start`}
          style={{ animation: 'slideInRight 0.3s ease' }}
        >
          <div className="shrink-0 mt-0.5">{icons[t.type]}</div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-slate-800">{t.title}</p>
            {t.message && <p className="text-xs text-slate-500 mt-0.5">{t.message}</p>}
          </div>
          <button
            onClick={() => setToasts(prev => prev.filter(x => x.id !== t.id))}
            className="shrink-0 text-slate-400 hover:text-slate-600"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ))}
      <style>{`@keyframes slideInRight { from { transform: translateX(100%); opacity: 0; } to { transform: translateX(0); opacity: 1; } }`}</style>
    </div>
  )
}
