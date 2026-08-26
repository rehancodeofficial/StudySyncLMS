import { useState } from 'react'
import { Search, Plus, Calendar, Clock, FileText, CheckCircle, AlertTriangle, Eye, Edit, Trash2 } from 'lucide-react'
import { DataTable } from '@/components/ui/DataTable'
import { Dropdown } from '@/components/ui/Dropdown'
import { toast } from '@/components/ui/Toast'
import { formatDate } from '@/utils/cn'

const MOCK_EXAMS = [
  { id: '1', title: 'Fall 2026 Midterms', type: 'Midterm', startDate: '2026-10-15', endDate: '2026-10-25', status: 'SCHEDULED', subjects: 45, students: 4850 },
  { id: '2', title: 'CS-401 Final Project Presentation', type: 'Project', startDate: '2026-11-20', endDate: '2026-11-22', status: 'DRAFT', subjects: 1, students: 145 },
  { id: '3', title: 'Spring 2026 Finals', type: 'Final', startDate: '2026-05-10', endDate: '2026-05-25', status: 'COMPLETED', subjects: 120, students: 4900 },
  { id: '4', title: 'Medicine Year 3 OSCE', type: 'Practical', startDate: '2026-09-15', endDate: '2026-09-18', status: 'ONGOING', subjects: 1, students: 120 },
]

export function ExamsPage() {
  const [search, setSearch] = useState('')

  const columns = [
    {
      key: 'title', header: 'Exam Title', sortable: true,
      render: (v: any, r: any) => (
        <div>
          <p className="text-sm font-medium text-slate-800">{v}</p>
          <p className="text-xs text-slate-500">{r.type}</p>
        </div>
      )
    },
    { key: 'startDate', header: 'Date Range', render: (v: any, r: any) => <span className="text-xs text-slate-600">{formatDate(v)} — {formatDate(r.endDate)}</span> },
    { key: 'subjects', header: 'Subjects', render: (v: any) => <span className="text-xs font-medium">{v}</span> },
    { key: 'students', header: 'Students', render: (v: any) => <span className="text-xs text-slate-600">{v.toLocaleString()}</span> },
    {
      key: 'status', header: 'Status',
      render: (v: any) => (
        <span className={`badge ${v === 'COMPLETED' ? 'badge-green' : v === 'ONGOING' ? 'badge-blue' : v === 'SCHEDULED' ? 'badge-yellow' : 'badge-gray'}`}>
          {v}
        </span>
      )
    },
    {
      key: 'id', header: '', width: '3rem',
      render: (_: any, r: any) => (
        <Dropdown items={[
          { label: 'View Schedule', icon: <Calendar className="w-3.5 h-3.5" />, onClick: () => {} },
          { label: 'Edit Exam', icon: <Edit className="w-3.5 h-3.5" />, onClick: () => {} },
          { label: 'Delete', icon: <Trash2 className="w-3.5 h-3.5" />, onClick: () => toast.error('Deleted', r.title), danger: true },
        ]} />
      )
    }
  ]

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="page-title">Examinations</h1>
          <p className="page-subtitle">Manage university exams, schedules, and grading</p>
        </div>
        <button className="btn-primary btn-sm"><Plus className="w-3.5 h-3.5" /> Create Exam</button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="card p-5 border-blue-100 bg-blue-50/30">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center shrink-0"><Calendar className="w-5 h-5" /></div>
            <div>
              <p className="text-sm font-semibold text-slate-800">Next Upcoming Exam</p>
              <p className="text-xs text-slate-600 mt-1">Medicine Year 3 OSCE</p>
              <p className="text-xs font-medium text-blue-650 mt-1">Starts in 16 days</p>
            </div>
          </div>
        </div>
        <div className="card p-5">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center shrink-0"><AlertTriangle className="w-5 h-5" /></div>
            <div>
              <p className="text-sm font-semibold text-slate-800">Missing Grades</p>
              <p className="text-xs text-slate-600 mt-1">Spring 2026 Finals</p>
              <p className="text-xs font-medium text-amber-600 mt-1">3 subjects pending</p>
            </div>
          </div>
        </div>
        <div className="card p-5">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-green-100 text-green-600 flex items-center justify-center shrink-0"><CheckCircle className="w-5 h-5" /></div>
            <div>
              <p className="text-sm font-semibold text-slate-800">Results Published</p>
              <p className="text-xs text-slate-600 mt-1">Last published: Spring 2026</p>
              <button className="text-xs font-medium text-blue-650 mt-1 hover:underline">View Result Analytics</button>
            </div>
          </div>
        </div>
      </div>

      <div className="card">
        <div className="p-4 border-b border-slate-100">
          <div className="relative max-w-xs w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input placeholder="Search exams…" className="input pl-9 text-xs h-9" value={search} onChange={e => setSearch(e.target.value)} />
          </div>
        </div>
        <DataTable columns={columns} data={MOCK_EXAMS.filter(e => e.title.toLowerCase().includes(search.toLowerCase()))} />
      </div>
    </div>
  )
}
