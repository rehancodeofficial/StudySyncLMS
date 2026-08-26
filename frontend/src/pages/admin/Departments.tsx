import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Search, Plus, Download, Edit, Trash2, Eye, Building2, Users, GraduationCap, BookOpen } from 'lucide-react'
import { DataTable } from '@/components/ui/DataTable'
import { Dropdown } from '@/components/ui/Dropdown'
import { toast } from '@/components/ui/Toast'
import type { Department, TableColumn, PaginationMeta } from '@/types'

const MOCK_DEPARTMENTS: any[] = [
  { id: '1', code: 'CS', name: 'Computer Science', head: 'Dr. Maria Chen', established: '2005', facultyCount: 24, studentCount: 1320, programCount: 4, status: 'ACTIVE' },
  { id: '2', code: 'BA', name: 'Business Administration', head: 'Dr. Fatima Al-Rashid', established: '2008', facultyCount: 18, studentCount: 980, programCount: 3, status: 'ACTIVE' },
  { id: '3', code: 'ENG', name: 'Engineering', head: 'Prof. Robert Hayes', established: '2010', facultyCount: 32, studentCount: 860, programCount: 5, status: 'ACTIVE' },
  { id: '4', code: 'MED', name: 'Medicine', head: 'Dr. Nadia Hassan', established: '2015', facultyCount: 45, studentCount: 640, programCount: 2, status: 'ACTIVE' },
  { id: '5', code: 'ART', name: 'Arts & Design', head: 'Prof. Sarah Jenkins', established: '2018', facultyCount: 12, studentCount: 520, programCount: 2, status: 'ACTIVE' },
  { id: '6', code: 'LAW', name: 'Law', head: 'Dr. James Smith', established: '2012', facultyCount: 15, studentCount: 420, programCount: 2, status: 'ACTIVE' },
  { id: '7', code: 'EDU', name: 'Education', head: 'Dr. Lisa Wong', established: '2020', facultyCount: 8, studentCount: 210, programCount: 1, status: 'INACTIVE' },
]

export function DepartmentsPage() {
  const [search, setSearch] = useState('')
  const [status, setStatus] = useState('All')
  const [page, setPage] = useState(1)
  const LIMIT = 8

  const filtered = MOCK_DEPARTMENTS.filter(d => {
    const q = search.toLowerCase()
    const m = !q || d.name.toLowerCase().includes(q) || d.code.toLowerCase().includes(q)
    const s = status === 'All' || d.status === status
    return m && s
  })
  
  const paginated = filtered.slice((page - 1) * LIMIT, page * LIMIT)
  const meta: PaginationMeta = { page, limit: LIMIT, total: filtered.length, totalPages: Math.ceil(filtered.length / LIMIT) }

  const columns: TableColumn<any>[] = [
    {
      key: 'name', header: 'Department', sortable: true,
      render: (_, d) => (
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-650 flex items-center justify-center shrink-0">
            <Building2 className="w-5 h-5" />
          </div>
          <div>
            <Link to={`/admin/departments/${d.id}`} className="text-sm font-medium text-slate-800 hover:text-blue-650 transition-colors">{d.name}</Link>
            <p className="text-xs text-slate-400 font-mono mt-0.5">{d.code} · Est. {d.established}</p>
          </div>
        </div>
      )
    },
    {
      key: 'head', header: 'Head of Department', sortable: true,
      render: (v) => <span className="text-xs font-medium text-slate-700">{String(v)}</span>
    },
    {
      key: 'stats', header: 'Statistics',
      render: (_, d) => (
        <div className="flex gap-4">
          <div className="flex items-center gap-1.5 text-xs text-slate-600" title="Students">
            <Users className="w-3.5 h-3.5 text-slate-400" />
            <span>{d.studentCount.toLocaleString()}</span>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-slate-600" title="Faculty">
            <GraduationCap className="w-3.5 h-3.5 text-slate-400" />
            <span>{d.facultyCount}</span>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-slate-600" title="Programs">
            <BookOpen className="w-3.5 h-3.5 text-slate-400" />
            <span>{d.programCount}</span>
          </div>
        </div>
      )
    },
    {
      key: 'status', header: 'Status', sortable: true,
      render: (v) => <span className={v === 'ACTIVE' ? 'badge badge-green' : 'badge badge-gray'}>{String(v)}</span>
    },
    {
      key: 'id', header: '', width: '3rem',
      render: (_, d) => (
        <Dropdown items={[
          { label: 'View Details', icon: <Eye className="w-3.5 h-3.5" />, onClick: () => {} },
          { label: 'Edit Department', icon: <Edit className="w-3.5 h-3.5" />, onClick: () => {} },
          { label: 'Delete', icon: <Trash2 className="w-3.5 h-3.5" />, onClick: () => toast.error('Deleted', d.name), danger: true },
        ]} />
      )
    },
  ]

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="page-title">Departments</h1>
          <p className="page-subtitle">Manage academic departments and faculties</p>
        </div>
        <div className="flex gap-2">
          <button className="btn-secondary btn-sm"><Download className="w-3.5 h-3.5" /> Export</button>
          <Link to="/admin/departments/new" className="btn-primary btn-sm"><Plus className="w-3.5 h-3.5" /> Add Department</Link>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: 'Total Departments', value: MOCK_DEPARTMENTS.length },
          { label: 'Active', value: MOCK_DEPARTMENTS.filter(d => d.status === 'ACTIVE').length },
          { label: 'Total Faculty', value: MOCK_DEPARTMENTS.reduce((sum, d) => sum + d.facultyCount, 0) },
          { label: 'Total Programs', value: MOCK_DEPARTMENTS.reduce((sum, d) => sum + d.programCount, 0) },
        ].map(s => (
          <div key={s.label} className="stat-card flex items-center gap-3">
            <p className="text-2xl font-bold text-slate-800">{s.value}</p>
            <p className="text-sm text-slate-500">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="card">
        <div className="p-4 flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1 max-w-xs">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input placeholder="Search departments…" className="input pl-9 text-xs h-9" value={search} onChange={e => { setSearch(e.target.value); setPage(1) }} />
          </div>
          <select className="select text-xs h-9 w-auto" value={status} onChange={e => { setStatus(e.target.value); setPage(1) }}>
            {['All', 'ACTIVE', 'INACTIVE'].map(s => <option key={s}>{s}</option>)}
          </select>
        </div>
        <DataTable columns={columns} data={paginated} rowKey={d => d.id} pagination={meta} onPageChange={setPage}
          emptyIcon="🏢" emptyTitle="No departments found" />
      </div>
    </div>
  )
}
