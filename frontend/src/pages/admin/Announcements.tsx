import { useState } from 'react'
import { Bell, Plus, Search, Users, Clock } from 'lucide-react'

type Priority = 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT'
type Audience = 'ALL' | 'STUDENTS' | 'FACULTY' | 'STAFF'

const ANNOUNCEMENTS = [
  { id: '1', title: 'Fall 2026 Semester Commencement', body: 'Classes for the Fall 2026 semester will officially begin on September 1st. All students must ensure their fee payment and course enrollment is completed before that date.', priority: 'HIGH' as Priority, audience: 'ALL' as Audience, author: 'Admin Office', date: 'Aug 28, 2026', pinned: true },
  { id: '2', title: 'Mid-Term Exam Schedule Released', body: 'The official mid-term examination schedule for all departments is now available on the academic portal. Please check your respective schedules.', priority: 'MEDIUM' as Priority, audience: 'STUDENTS' as Audience, author: 'Exam Controller', date: 'Aug 25, 2026', pinned: false },
  { id: '3', title: 'Faculty Development Workshop', body: 'A mandatory faculty development workshop is scheduled for August 31st in the Conference Hall. All faculty members are required to attend.', priority: 'HIGH' as Priority, audience: 'FACULTY' as Audience, author: 'HR Department', date: 'Aug 24, 2026', pinned: false },
  { id: '4', title: 'Library New Arrivals', body: 'The library has received over 200 new books across multiple disciplines. Check the library portal for the updated catalog.', priority: 'LOW' as Priority, audience: 'ALL' as Audience, author: 'Library', date: 'Aug 22, 2026', pinned: false },
]

const PRIORITY_COLORS: Record<Priority, string> = {
  LOW: 'bg-slate-100 text-slate-600',
  MEDIUM: 'bg-blue-100 text-blue-700',
  HIGH: 'bg-amber-100 text-amber-700',
  URGENT: 'bg-red-100 text-red-700',
}

export function AnnouncementsPage() {
  const [selected, setSelected] = useState(ANNOUNCEMENTS[0])

  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="page-title">Announcements</h1>
          <p className="page-subtitle">Broadcast university-wide communications to students, faculty, and staff.</p>
        </div>
        <button className="btn-primary"><Plus className="w-4 h-4 mr-2" /> New Announcement</button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-150">
        {/* List */}
        <div className="card flex flex-col overflow-hidden">
          <div className="p-4 border-b border-slate-100">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input placeholder="Search announcements..." className="input pl-9 w-full" />
            </div>
          </div>
          <div className="flex-1 overflow-y-auto divide-y divide-slate-100">
            {ANNOUNCEMENTS.map(a => (
              <div
                key={a.id}
                onClick={() => setSelected(a)}
                className={`p-4 cursor-pointer hover:bg-slate-50 transition-colors ${selected.id === a.id ? 'bg-blue-50 border-l-2 border-blue-600' : ''}`}
              >
                <div className="flex items-start justify-between gap-2 mb-2">
                  <p className="text-sm font-bold text-slate-900 leading-tight line-clamp-1">{a.title}</p>
                  {a.pinned && <span className="text-[10px] px-1.5 py-0.5 rounded bg-blue-100 text-blue-600 font-bold shrink-0">📌 Pinned</span>}
                </div>
                <p className="text-xs text-slate-500 line-clamp-2">{a.body}</p>
                <div className="flex items-center gap-2 mt-2">
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase ${PRIORITY_COLORS[a.priority]}`}>{a.priority}</span>
                  <span className="text-[10px] text-slate-400 flex items-center gap-1"><Clock className="w-3 h-3" /> {a.date}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Detail */}
        <div className="lg:col-span-2 card p-8 flex flex-col overflow-y-auto">
          <div className="flex items-start justify-between mb-6">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-3">
                <span className={`badge ${PRIORITY_COLORS[selected.priority]} text-[10px] uppercase font-bold`}>{selected.priority}</span>
                <span className="text-[10px] text-slate-400 font-medium flex items-center gap-1"><Users className="w-3 h-3" /> {selected.audience}</span>
              </div>
              <h2 className="text-2xl font-extrabold text-slate-900 leading-tight">{selected.title}</h2>
            </div>
            <div className="flex gap-2 shrink-0 ml-4">
              <button className="btn-secondary btn-sm">Edit</button>
              <button className="btn-primary btn-sm">
                <Bell className="w-3.5 h-3.5 mr-1" /> Send
              </button>
            </div>
          </div>

          <div className="flex items-center gap-4 text-xs text-slate-500 pb-6 border-b border-slate-100 mb-6">
            <span>By <strong className="text-slate-700">{selected.author}</strong></span>
            <span>·</span>
            <span>{selected.date}</span>
          </div>

          <p className="text-slate-700 leading-relaxed text-base">{selected.body}</p>
        </div>
      </div>
    </div>
  )
}
