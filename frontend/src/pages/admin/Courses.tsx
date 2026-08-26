import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Search, Plus, Download, Edit, Trash2, Eye, BookOpen } from 'lucide-react'
import { DataTable } from '@/components/ui/DataTable'
import { Dropdown } from '@/components/ui/Dropdown'
import { toast } from '@/components/ui/Toast'
import type { Course, TableColumn, PaginationMeta } from '@/types'

const MOCK_COURSES: any[] = [
  { id: '1', code: 'CS-401', name: 'Database Systems', department: 'Computer Science', credits: 3, type: 'CORE', status: 'ACTIVE', enrolled: 145, maxCapacity: 150 },
  { id: '2', code: 'CS-402', name: 'Software Engineering', department: 'Computer Science', credits: 3, type: 'CORE', status: 'ACTIVE', enrolled: 142, maxCapacity: 150 },
  { id: '3', code: 'CS-403', name: 'Computer Networks', department: 'Computer Science', credits: 3, type: 'CORE', status: 'ACTIVE', enrolled: 138, maxCapacity: 150 },
  { id: '4', code: 'MATH-301', name: 'Discrete Mathematics', department: 'Mathematics', credits: 3, type: 'CORE', status: 'ACTIVE', enrolled: 210, maxCapacity: 250 },
  { id: '5', code: 'CS-404', name: 'Artificial Intelligence', department: 'Computer Science', credits: 3, type: 'ELECTIVE', status: 'ACTIVE', enrolled: 95, maxCapacity: 100 },
  { id: '6', code: 'BUS-201', name: 'Principles of Management', department: 'Business Administration', credits: 3, type: 'CORE', status: 'ACTIVE', enrolled: 180, maxCapacity: 200 },
  { id: '7', code: 'ENG-101', name: 'Engineering Mechanics', department: 'Engineering', credits: 4, type: 'CORE', status: 'ACTIVE', enrolled: 120, maxCapacity: 120 },
  { id: '8', code: 'MED-205', name: 'Human Anatomy', department: 'Medicine', credits: 4, type: 'CORE', status: 'ACTIVE', enrolled: 85, maxCapacity: 100 },
  { id: '9', code: 'LAW-301', name: 'Corporate Law', department: 'Law', credits: 3, type: 'CORE', status: 'INACTIVE', enrolled: 0, maxCapacity: 60 },
  { id: '10', code: 'ART-105', name: 'History of Modern Art', department: 'Arts & Design', credits: 2, type: 'ELECTIVE', status: 'ACTIVE', enrolled: 45, maxCapacity: 50 },
]

export function CoursesPage() {
  const [search, setSearch] = useState('')
  const [dept, setDept] = useState('All')
  const [page, setPage] = useState(1)
  const [selected, setSelected] = useState<string[]>([])
  const LIMIT = 8

  const filtered = MOCK_COURSES.filter(c => {
    const q = search.toLowerCase()
    const m = !q || c.name.toLowerCase().includes(q) || c.code.toLowerCase().includes(q)
    const d = dept === 'All' || c.department === dept
    return m && d
  })
  
  const paginated = filtered.slice((page - 1) * LIMIT, page * LIMIT)
  const meta: PaginationMeta = { page, limit: LIMIT, total: filtered.length, totalPages: Math.ceil(filtered.length / LIMIT) }
  const depts = ['All', ...Array.from(new Set(MOCK_COURSES.map(c => c.department)))]

  const columns: TableColumn<any>[] = [
    {
      key: 'code', header: 'Course Code', sortable: true,
      render: (v) => <span className="text-xs font-mono font-medium text-blue-650">{String(v)}</span>
    },
    {
      key: 'name', header: 'Course Name', sortable: true,
      render: (_, c) => (
        <div>
          <Link to={`/admin/courses/${c.id}`} className="text-sm font-medium text-slate-800 hover:text-blue-650 transition-colors">{c.name}</Link>
          <p className="text-xs text-slate-400">{c.department}</p>
        </div>
      )
    },
    { key: 'credits', header: 'Credits', sortable: true, render: (v) => <span className="text-xs font-medium">{String(v)}</span> },
    {
      key: 'type', header: 'Type', sortable: true,
      render: (v) => <span className={`badge ${v === 'CORE' ? 'badge-blue' : 'badge-purple'}`}>{String(v)}</span>
    },
    {
      key: 'enrolled', header: 'Enrollment', sortable: true,
      render: (_, c) => {
        const pct = (c.enrolled / c.maxCapacity) * 100
        return (
          <div className="flex items-center gap-2">
            <span className="text-xs font-medium">{c.enrolled}/{c.maxCapacity}</span>
            <div className="w-12 h-1.5 bg-slate-200 rounded-full overflow-hidden">
              <div className={`h-full rounded-full ${pct >= 100 ? 'bg-red-500' : pct > 80 ? 'bg-amber-500' : 'bg-green-500'}`} style={{ width: `${pct}%` }} />
            </div>
          </div>
        )
      }
    },
    {
      key: 'status', header: 'Status', sortable: true,
      render: (v) => <span className={v === 'ACTIVE' ? 'badge badge-green' : 'badge badge-gray'}>{String(v)}</span>
    },
    {
      key: 'id', header: '', width: '3rem',
      render: (_, c) => (
        <Dropdown items={[
          { label: 'View Details', icon: <Eye className="w-3.5 h-3.5" />, onClick: () => {} },
          { label: 'Edit Course', icon: <Edit className="w-3.5 h-3.5" />, onClick: () => {} },
          { label: 'Delete', icon: <Trash2 className="w-3.5 h-3.5" />, onClick: () => toast.error('Deleted', c.name), danger: true },
        ]} />
      )
    },
  ]

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="page-title">Courses</h1>
          <p className="page-subtitle">Manage university courses and catalog</p>
        </div>
        <div className="flex gap-2">
          <button className="btn-secondary btn-sm"><Download className="w-3.5 h-3.5" /> Export</button>
          <Link to="/admin/courses/new" className="btn-primary btn-sm"><Plus className="w-3.5 h-3.5" /> Add Course</Link>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: 'Total Courses', value: MOCK_COURSES.length },
          { label: 'Active', value: MOCK_COURSES.filter(c => c.status === 'ACTIVE').length },
          { label: 'Core', value: MOCK_COURSES.filter(c => c.type === 'CORE').length },
          { label: 'Electives', value: MOCK_COURSES.filter(c => c.type === 'ELECTIVE').length },
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
            <input placeholder="Search courses…" className="input pl-9 text-xs h-9" value={search} onChange={e => { setSearch(e.target.value); setPage(1) }} />
          </div>
          <select className="select text-xs h-9 w-auto" value={dept} onChange={e => { setDept(e.target.value); setPage(1) }}>
            {depts.map(d => <option key={d}>{d}</option>)}
          </select>
        </div>
        <DataTable columns={columns} data={paginated} selectable selectedIds={selected}
          onSelectAll={c => setSelected(c ? paginated.map(t => t.id) : [])}
          onSelectRow={(id, c) => setSelected(prev => c ? [...prev, id] : prev.filter(x => x !== id))}
          rowKey={t => t.id} pagination={meta} onPageChange={setPage}
          emptyIcon="📚" emptyTitle="No courses found" />
      </div>
    </div>
  )
}
