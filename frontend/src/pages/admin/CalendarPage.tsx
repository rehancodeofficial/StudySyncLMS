import { Link } from 'react-router-dom'
import { Plus } from 'lucide-react'

export function CalendarPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h2>Academic Calendar</h2>
          <p className="text-slate-400 text-sm mt-0.5">Manage academic calendar across your institution.</p>
        </div>
        <Link to="#" className="btn-primary">
          <Plus className="w-4 h-4" /> Add Event
        </Link>
      </div>
      <div className="card p-12 text-center">
        <p className="text-slate-400 text-sm">Loading academic calendar data...</p>
      </div>
    </div>
  )
}
