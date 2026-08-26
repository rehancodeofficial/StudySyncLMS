import { useState } from 'react'
import { Search, Download, Calendar, CheckCircle, XCircle, AlertCircle, Eye, Mail } from 'lucide-react'
import { DataTable } from '@/components/ui/DataTable'
import { Dropdown } from '@/components/ui/Dropdown'
import { toast } from '@/components/ui/Toast'
import { formatCurrency, formatDate } from '@/utils/cn'

// Seed Data
const MOCK_ATTENDANCE = [
  { id: '1', course: 'CS-401 Database Systems', section: 'A', teacher: 'Dr. Maria Chen', totalStudents: 45, present: 41, absent: 3, late: 1, date: '2026-08-30' },
  { id: '2', course: 'CS-402 Software Engineering', section: 'B', teacher: 'Prof. David Kim', totalStudents: 42, present: 38, absent: 4, late: 0, date: '2026-08-30' },
  { id: '3', course: 'MATH-301 Discrete Math', section: 'A', teacher: 'Dr. Lena Schmidt', totalStudents: 55, present: 52, absent: 1, late: 2, date: '2026-08-30' },
  { id: '4', course: 'ENG-101 Mechanics', section: 'C', teacher: 'Prof. Robert Hayes', totalStudents: 60, present: 45, absent: 12, late: 3, date: '2026-08-30' },
  { id: '5', course: 'BUS-201 Management', section: 'A', teacher: 'Dr. Fatima Al-Rashid', totalStudents: 80, present: 75, absent: 5, late: 0, date: '2026-08-30' },
]

export function AttendancePage() {
  const [date, setDate] = useState('2026-08-30')
  const [search, setSearch] = useState('')

  const filtered = MOCK_ATTENDANCE.filter(a => a.course.toLowerCase().includes(search.toLowerCase()) || a.teacher.toLowerCase().includes(search.toLowerCase()))

  const columns = [
    {
      key: 'course', header: 'Course & Section', sortable: true,
      render: (_: any, r: any) => (
        <div>
          <p className="text-sm font-medium text-slate-800">{r.course}</p>
          <p className="text-xs text-slate-500">Section {r.section}</p>
        </div>
      )
    },
    { key: 'teacher', header: 'Faculty', sortable: true, render: (v: any) => <span className="text-xs font-medium">{v}</span> },
    { key: 'totalStudents', header: 'Total', render: (v: any) => <span className="text-xs">{v}</span> },
    {
      key: 'present', header: 'Present',
      render: (v: any, r: any) => <span className="text-xs font-semibold text-green-600">{v} ({Math.round((v / r.totalStudents) * 100)}%)</span>
    },
    { key: 'absent', header: 'Absent', render: (v: any) => <span className={`text-xs font-semibold ${v > 5 ? 'text-red-500' : 'text-slate-600'}`}>{v}</span> },
    { key: 'late', header: 'Late', render: (v: any) => <span className="text-xs text-amber-600 font-medium">{v}</span> },
    {
      key: 'id', header: '', width: '3rem',
      render: (_: any, r: any) => (
        <Dropdown items={[
          { label: 'View Details', icon: <Eye className="w-3.5 h-3.5" />, onClick: () => {} },
          { label: 'Email Absentees', icon: <Mail className="w-3.5 h-3.5" />, onClick: () => toast.success('Emails sent', `Notifications sent to ${r.absent} students`) },
        ]} />
      )
    }
  ]

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="page-title">Daily Attendance</h1>
          <p className="page-subtitle">Monitor university-wide attendance for {formatDate(date)}</p>
        </div>
        <div className="flex gap-2">
          <input type="date" className="input text-xs h-9 w-auto" value={date} onChange={e => setDate(e.target.value)} />
          <button className="btn-secondary btn-sm"><Download className="w-3.5 h-3.5" /> Export Report</button>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="stat-card">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center"><Calendar className="w-4 h-4" /></div>
            <p className="text-sm font-medium text-slate-600">Total Classes</p>
          </div>
          <p className="text-2xl font-bold text-slate-800">142</p>
        </div>
        <div className="stat-card">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-8 h-8 rounded-lg bg-green-50 text-green-600 flex items-center justify-center"><CheckCircle className="w-4 h-4" /></div>
            <p className="text-sm font-medium text-slate-600">Overall Present</p>
          </div>
          <p className="text-2xl font-bold text-slate-800">89.4%</p>
        </div>
        <div className="stat-card border-red-200">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-8 h-8 rounded-lg bg-red-50 text-red-600 flex items-center justify-center"><XCircle className="w-4 h-4" /></div>
            <p className="text-sm font-medium text-slate-600">High Absences</p>
          </div>
          <p className="text-2xl font-bold text-red-600">12 Classes</p>
          <p className="text-[10px] text-red-500 mt-1">Below 75% attendance</p>
        </div>
        <div className="stat-card">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center"><AlertCircle className="w-4 h-4" /></div>
            <p className="text-sm font-medium text-slate-600">Pending Submissions</p>
          </div>
          <p className="text-2xl font-bold text-slate-800">8</p>
          <p className="text-[10px] text-amber-600 mt-1">Faculty members</p>
        </div>
      </div>

      <div className="card">
        <div className="p-4 border-b border-slate-100 flex flex-col sm:flex-row justify-between gap-4">
          <div className="relative max-w-xs w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input placeholder="Search course or faculty…" className="input pl-9 text-xs h-9" value={search} onChange={e => setSearch(e.target.value)} />
          </div>
        </div>
        <DataTable columns={columns} data={filtered} />
      </div>
    </div>
  )
}
