import { useState } from 'react'
import { Search, Plus, Download, Edit, Trash2, Eye, ClipboardList } from 'lucide-react'
import { DataTable } from '@/components/ui/DataTable'
import { Dropdown } from '@/components/ui/Dropdown'
import { toast } from '@/components/ui/Toast'
import { formatDate } from '@/utils/cn'

const MOCK_ASSIGNMENTS = [
  { id: '1', title: 'ER Diagram Design', course: 'CS-401 Database Systems', teacher: 'Dr. Maria Chen', dueDate: '2026-08-25', submissions: 42, total: 45, status: 'GRADING' },
  { id: '2', title: 'Sprint Planning Report', course: 'CS-402 Software Eng.', teacher: 'Prof. David Kim', dueDate: '2026-08-28', submissions: 40, total: 42, status: 'PUBLISHED' },
  { id: '3', title: 'Network Protocol Analysis', course: 'CS-403 Computer Networks', teacher: 'Dr. Ahmed Siddiqui', dueDate: '2026-09-05', submissions: 15, total: 40, status: 'ACTIVE' },
  { id: '4', title: 'Calculus Assignment 1', course: 'MATH-301 Discrete Math', teacher: 'Dr. Lena Schmidt', dueDate: '2026-09-10', submissions: 0, total: 55, status: 'DRAFT' },
]

export function AssignmentsPage() {
  const [search, setSearch] = useState('')

  const columns = [
    {
      key: 'title', header: 'Assignment', sortable: true,
      render: (v: any, r: any) => (
        <div>
          <p className="text-sm font-medium text-slate-800 hover:text-blue-650 cursor-pointer">{v}</p>
          <p className="text-xs text-slate-500">{r.course}</p>
        </div>
      )
    },
    { key: 'teacher', header: 'Faculty', render: (v: any) => <span className="text-xs font-medium text-slate-700">{v}</span> },
    { key: 'dueDate', header: 'Due Date', sortable: true, render: (v: any) => <span className="text-xs text-slate-600">{formatDate(v)}</span> },
    {
      key: 'submissions', header: 'Submissions',
      render: (v: any, r: any) => {
        const pct = (v / r.total) * 100
        return (
          <div className="flex items-center gap-2">
            <span className="text-xs font-medium w-8">{v}/{r.total}</span>
            <div className="w-16 h-1.5 bg-slate-200 rounded-full overflow-hidden">
              <div className="h-full rounded-full bg-blue-500" style={{ width: `${pct}%` }} />
            </div>
          </div>
        )
      }
    },
    {
      key: 'status', header: 'Status',
      render: (v: any) => (
        <span className={`badge ${v === 'PUBLISHED' ? 'badge-green' : v === 'GRADING' ? 'badge-amber' : v === 'ACTIVE' ? 'badge-blue' : 'badge-gray'}`}>
          {v}
        </span>
      )
    },
    {
      key: 'id', header: '', width: '3rem',
      render: (_: any, r: any) => (
        <Dropdown items={[
          { label: 'View Details', icon: <Eye className="w-3.5 h-3.5" />, onClick: () => {} },
          { label: 'Edit', icon: <Edit className="w-3.5 h-3.5" />, onClick: () => {} },
          { label: 'Delete', icon: <Trash2 className="w-3.5 h-3.5" />, onClick: () => toast.error('Deleted', r.title), danger: true },
        ]} />
      )
    }
  ]

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="page-title">Assignments</h1>
          <p className="page-subtitle">Track course assignments and submissions</p>
        </div>
        <div className="flex gap-2">
          <button className="btn-secondary btn-sm"><Download className="w-3.5 h-3.5" /> Export</button>
          <button className="btn-primary btn-sm"><Plus className="w-3.5 h-3.5" /> New Assignment</button>
        </div>
      </div>

      <div className="card">
        <div className="p-4 border-b border-slate-100 flex gap-3">
          <div className="relative max-w-xs w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input placeholder="Search assignments…" className="input pl-9 text-xs h-9" value={search} onChange={e => setSearch(e.target.value)} />
          </div>
        </div>
        <DataTable columns={columns} data={MOCK_ASSIGNMENTS.filter(a => a.title.toLowerCase().includes(search.toLowerCase()) || a.course.toLowerCase().includes(search.toLowerCase()))} />
      </div>
    </div>
  )
}
