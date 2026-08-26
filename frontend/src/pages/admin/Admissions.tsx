import { useState } from 'react'
import { Search, Plus, Filter, ChevronRight, Clock, CheckCircle2, XCircle } from 'lucide-react'

type Status = 'APPLIED' | 'REVIEW' | 'INTERVIEW' | 'ACCEPTED' | 'REJECTED'

const STATUSES: Status[] = ['APPLIED', 'REVIEW', 'INTERVIEW', 'ACCEPTED', 'REJECTED']

const STATUS_COLORS: Record<Status, string> = {
  APPLIED: 'border-slate-200 bg-slate-50',
  REVIEW: 'border-blue-200 bg-blue-50',
  INTERVIEW: 'border-amber-200 bg-amber-50',
  ACCEPTED: 'border-green-200 bg-green-50',
  REJECTED: 'border-red-200 bg-red-50',
}

const STATUS_BADGE: Record<Status, string> = {
  APPLIED: 'badge-blue',
  REVIEW: 'badge-blue',
  INTERVIEW: 'badge-amber',
  ACCEPTED: 'badge-green',
  REJECTED: 'badge-red',
}

const APPLICATIONS = [
  { id: 'APP-001', name: 'Omar Farooq', program: 'BSc Computer Science', date: 'Aug 20', score: 85, status: 'APPLIED' as Status },
  { id: 'APP-002', name: 'Hina Butt', program: 'BBA Business Admin', date: 'Aug 19', score: 91, status: 'REVIEW' as Status },
  { id: 'APP-003', name: 'Zain Ul Abideen', program: 'BEng Mechanical', date: 'Aug 18', score: 78, status: 'INTERVIEW' as Status },
  { id: 'APP-004', name: 'Mariam Akhtar', program: 'BSc Computer Science', date: 'Aug 17', score: 95, status: 'ACCEPTED' as Status },
  { id: 'APP-005', name: 'Saad Raza', program: 'MBBS Medicine', date: 'Aug 15', score: 62, status: 'REJECTED' as Status },
  { id: 'APP-006', name: 'Fatima Noor', program: 'BBA Business Admin', date: 'Aug 22', score: 88, status: 'APPLIED' as Status },
]

export function AdmissionsPage() {
  const [view, setView] = useState<'kanban' | 'table'>('table')

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="page-title">Admissions</h1>
          <p className="page-subtitle">Track applications from submission to enrollment.</p>
        </div>
        <div className="flex gap-2">
          <div className="flex rounded-lg border border-slate-200 overflow-hidden bg-white">
            <button onClick={() => setView('table')} className={`px-3 py-1.5 text-xs font-semibold transition-colors ${view === 'table' ? 'bg-slate-900 text-white' : 'text-slate-600 hover:bg-slate-50'}`}>Table</button>
            <button onClick={() => setView('kanban')} className={`px-3 py-1.5 text-xs font-semibold transition-colors ${view === 'kanban' ? 'bg-slate-900 text-white' : 'text-slate-600 hover:bg-slate-50'}`}>Kanban</button>
          </div>
          <button className="btn-primary"><Plus className="w-4 h-4 mr-2" /> New Application</button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {STATUSES.map(status => {
          const count = APPLICATIONS.filter(a => a.status === status).length
          return (
            <div key={status} className={`card p-4 border ${STATUS_COLORS[status]}`}>
              <p className="text-2xl font-extrabold text-slate-900">{count}</p>
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mt-1">{status}</p>
            </div>
          )
        })}
      </div>

      {/* Table View */}
      <div className="card overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input placeholder="Search applicants..." className="input pl-9 w-full" />
          </div>
          <button className="btn-secondary"><Filter className="w-4 h-4 mr-2" /> Filter</button>
        </div>
        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th>App. ID</th>
                <th>Applicant</th>
                <th>Program</th>
                <th>Applied On</th>
                <th>Score</th>
                <th>Status</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {APPLICATIONS.map(app => (
                <tr key={app.id} className="cursor-pointer hover:bg-slate-50">
                  <td className="font-mono text-xs text-slate-500">{app.id}</td>
                  <td className="font-bold text-slate-800">{app.name}</td>
                  <td className="text-slate-600">{app.program}</td>
                  <td>{app.date}</td>
                  <td>
                    <span className={`font-bold ${app.score >= 80 ? 'text-green-600' : app.score >= 65 ? 'text-amber-600' : 'text-red-600'}`}>
                      {app.score}%
                    </span>
                  </td>
                  <td><span className={`badge ${STATUS_BADGE[app.status]}`}>{app.status}</span></td>
                  <td><ChevronRight className="w-4 h-4 text-slate-400" /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
