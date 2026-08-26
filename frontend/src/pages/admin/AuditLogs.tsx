import { Activity, Clock, Search, Filter } from 'lucide-react'

type Action = 'CREATE' | 'UPDATE' | 'DELETE' | 'LOGIN' | 'LOGOUT'

const ACTION_COLORS: Record<Action, string> = {
  CREATE: 'badge-green',
  UPDATE: 'badge-blue',
  DELETE: 'badge-red',
  LOGIN: 'badge-purple',
  LOGOUT: 'badge-amber',
}

const LOGS = [
  { id: 1, user: 'Dr. Sarah Mitchell', action: 'UPDATE' as Action, resource: 'Student #S-1042 — Academic Records', ip: '192.168.1.10', time: '09:32 AM' },
  { id: 2, user: 'Prof. James Carter', action: 'CREATE' as Action, resource: 'Assignment — CS-401 Week 7', ip: '192.168.1.25', time: '09:15 AM' },
  { id: 3, user: 'Admin System', action: 'DELETE' as Action, resource: 'Draft Invoice #INV-2026-009', ip: '127.0.0.1', time: '08:55 AM' },
  { id: 4, user: 'Alex Johnson', action: 'LOGIN' as Action, resource: 'Student Portal', ip: '10.0.0.45', time: '08:30 AM' },
  { id: 5, user: 'Ms. Sana Raza', action: 'CREATE' as Action, resource: 'Invoice #INV-2026-020 for Student #S-1100', ip: '192.168.1.18', time: '08:12 AM' },
  { id: 6, user: 'Dr. Sarah Mitchell', action: 'LOGIN' as Action, resource: 'Admin Portal', ip: '192.168.1.10', time: '08:00 AM' },
]

export function AuditLogsPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="page-title">Audit Logs</h1>
          <p className="page-subtitle">A complete, tamper-proof record of all system actions and events.</p>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-green-50 border border-green-100">
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
          <span className="text-xs font-bold text-green-700">Live Monitoring</span>
        </div>
      </div>

      <div className="card overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input placeholder="Search logs by user, action, or resource..." className="input pl-9 w-full" />
          </div>
          <div className="flex gap-2">
            <select className="select h-10"><option>All Actions</option><option>CREATE</option><option>UPDATE</option><option>DELETE</option><option>LOGIN</option></select>
            <button className="btn-secondary"><Filter className="w-4 h-4 mr-2" /> Date Range</button>
          </div>
        </div>

        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th>#</th>
                <th>User</th>
                <th>Action</th>
                <th>Resource / Description</th>
                <th>IP Address</th>
                <th>Time</th>
              </tr>
            </thead>
            <tbody>
              {LOGS.map(log => (
                <tr key={log.id} className="hover:bg-slate-50">
                  <td className="text-slate-400 font-mono text-xs">{log.id}</td>
                  <td>
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full bg-slate-200 flex items-center justify-center text-slate-500 font-bold text-xs shrink-0">
                        {log.user.charAt(0)}
                      </div>
                      <span className="font-semibold text-slate-800 text-xs">{log.user}</span>
                    </div>
                  </td>
                  <td><span className={`badge ${ACTION_COLORS[log.action]}`}>{log.action}</span></td>
                  <td className="text-xs text-slate-600 max-w-xs truncate">{log.resource}</td>
                  <td className="font-mono text-xs text-slate-500">{log.ip}</td>
                  <td className="text-xs text-slate-500 flex items-center gap-1"><Clock className="w-3 h-3" />{log.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
