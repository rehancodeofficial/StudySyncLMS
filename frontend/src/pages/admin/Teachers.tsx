import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Search, Plus, Download, Mail, Phone, Eye, Edit } from 'lucide-react'
import { Dropdown } from '@/components/ui/Dropdown'
import { toast } from '@/components/ui/Toast'
import { DataTable } from '@/components/ui/DataTable'
import { formatDate } from '@/utils/cn'
import type { Teacher, TableColumn, PaginationMeta } from '@/types'

const MOCK_TEACHERS: Teacher[] = [
  { id: '1', employeeId: 'TCH-001', name: 'Dr. Maria Chen', email: 'maria.chen@studysync.edu', phone: '+971-50-111-2222', department: 'Computer Science', qualification: 'PhD Computer Science (MIT)', specialization: 'Machine Learning & AI', joinDate: '2018-09-01', status: 'ACTIVE', courseCount: 3, studentCount: 210 },
  { id: '2', employeeId: 'TCH-002', name: 'Prof. David Kim', email: 'david.kim@studysync.edu', phone: '+971-55-333-4444', department: 'Computer Science', qualification: 'PhD Software Engineering (Stanford)', specialization: 'Software Architecture', joinDate: '2019-01-15', status: 'ACTIVE', courseCount: 2, studentCount: 145 },
  { id: '3', employeeId: 'TCH-003', name: 'Dr. Ahmed Siddiqui', email: 'ahmed.siddiqui@studysync.edu', phone: '+971-50-555-6666', department: 'Computer Science', qualification: 'PhD Networking (Cambridge)', specialization: 'Computer Networks & Security', joinDate: '2017-09-01', status: 'ACTIVE', courseCount: 3, studentCount: 195 },
  { id: '4', employeeId: 'TCH-004', name: 'Dr. Lena Schmidt', email: 'lena.schmidt@studysync.edu', phone: '+971-55-777-8888', department: 'Mathematics', qualification: 'PhD Mathematics (Oxford)', specialization: 'Discrete Mathematics & Statistics', joinDate: '2020-03-01', status: 'ACTIVE', courseCount: 4, studentCount: 280 },
  { id: '5', employeeId: 'TCH-005', name: 'Prof. James Wilson', email: 'james.wilson@studysync.edu', phone: '+971-50-999-0000', department: 'Computer Science', qualification: 'PhD AI (Carnegie Mellon)', specialization: 'Artificial Intelligence', joinDate: '2016-09-01', status: 'ACTIVE', courseCount: 2, studentCount: 120 },
  { id: '6', employeeId: 'TCH-006', name: 'Dr. Fatima Al-Rashid', email: 'fatima.alrashid@studysync.edu', phone: '+971-55-123-4567', department: 'Business Administration', qualification: 'PhD Business (INSEAD)', specialization: 'Strategic Management', joinDate: '2021-09-01', status: 'ACTIVE', courseCount: 3, studentCount: 185 },
  { id: '7', employeeId: 'TCH-007', name: 'Prof. Robert Hayes', email: 'robert.hayes@studysync.edu', department: 'Engineering', qualification: 'PhD Civil Engineering (ETH)', specialization: 'Structural Engineering', joinDate: '2015-09-01', status: 'ON_LEAVE', courseCount: 0, studentCount: 0 },
  { id: '8', employeeId: 'TCH-008', name: 'Dr. Nadia Hassan', email: 'nadia.hassan@studysync.edu', department: 'Medicine', qualification: 'MD, PhD Clinical Medicine', specialization: 'Internal Medicine', joinDate: '2020-09-01', status: 'ACTIVE', courseCount: 2, studentCount: 96 },
]

const statusColors: Record<string, string> = {
  ACTIVE: 'badge badge-green',
  INACTIVE: 'badge badge-gray',
  ON_LEAVE: 'badge badge-yellow',
}

export function TeachersPage() {
  const [search, setSearch] = useState('')
  const [dept, setDept] = useState('All')
  const [status, setStatus] = useState('All')
  const [page, setPage] = useState(1)
  const [selected, setSelected] = useState<string[]>([])
  const LIMIT = 8

  const filtered = MOCK_TEACHERS.filter(t => {
    const q = search.toLowerCase()
    const m = !q || t.name.toLowerCase().includes(q) || t.employeeId.toLowerCase().includes(q) || t.email.toLowerCase().includes(q)
    const d = dept === 'All' || t.department === dept
    const s = status === 'All' || t.status === status
    return m && d && s
  })
  const paginated = filtered.slice((page - 1) * LIMIT, page * LIMIT)
  const meta: PaginationMeta = { page, limit: LIMIT, total: filtered.length, totalPages: Math.ceil(filtered.length / LIMIT) }
  const depts = ['All', ...Array.from(new Set(MOCK_TEACHERS.map(t => t.department)))]

  const columns: TableColumn<Teacher>[] = [
    {
      key: 'name', header: 'Faculty Member', sortable: true,
      render: (_, t) => (
        <div className="flex items-center gap-3">
          <div className="avatar w-9 h-9 text-xs shrink-0">{t.name.split(' ').map(n => n[0]).join('').slice(0, 2)}</div>
          <div>
            <Link to={`/admin/teachers/${t.id}`} className="text-sm font-medium text-slate-800 hover:text-blue-650">{t.name}</Link>
            <p className="text-xs text-slate-400">{t.employeeId}</p>
          </div>
        </div>
      )
    },
    {
      key: 'department', header: 'Department / Specialization', sortable: true,
      render: (_, t) => (
        <div>
          <p className="text-xs font-medium text-slate-700">{t.department}</p>
          <p className="text-xs text-slate-400 truncate max-w-56">{t.specialization}</p>
        </div>
      )
    },
    { key: 'qualification', header: 'Qualification', render: (v) => <span className="text-xs text-slate-600 max-w-48 block truncate">{String(v)}</span> },
    {
      key: 'courseCount', header: 'Courses', sortable: true,
      render: (v) => <span className="badge badge-blue">{String(v)}</span>
    },
    {
      key: 'studentCount', header: 'Students', sortable: true,
      render: (v) => <span className="text-xs font-medium text-slate-700">{Number(v).toLocaleString()}</span>
    },
    {
      key: 'status', header: 'Status', sortable: true,
      render: (v) => <span className={statusColors[String(v)] ?? 'badge badge-gray'}>{String(v).replace('_', ' ')}</span>
    },
    { key: 'joinDate', header: 'Joined', sortable: true, render: (v) => <span className="text-xs text-slate-500">{formatDate(String(v))}</span> },
    {
      key: 'id', header: '', width: '3rem',
      render: (_, t) => (
        <Dropdown items={[
          { label: 'View Profile', icon: <Eye className="w-3.5 h-3.5" />, onClick: () => {} },
          { label: 'Edit', icon: <Edit className="w-3.5 h-3.5" />, onClick: () => {} },
          { label: 'Send Email', icon: <Mail className="w-3.5 h-3.5" />, onClick: () => toast.info('Email', `Opening email to ${t.name}`) },
          { label: 'Remove', icon: <Edit className="w-3.5 h-3.5" />, onClick: () => toast.error('Removed', t.name), danger: true },
        ]} />
      )
    },
  ]

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="page-title">Faculty</h1>
          <p className="page-subtitle">{MOCK_TEACHERS.filter(t => t.status === 'ACTIVE').length} active · {MOCK_TEACHERS.length} total</p>
        </div>
        <div className="flex gap-2">
          <button onClick={() => toast.success('Exported', 'Faculty list exported')} className="btn-secondary btn-sm"><Download className="w-3.5 h-3.5" /> Export</button>
          <Link to="/admin/teachers/new" className="btn-primary btn-sm"><Plus className="w-3.5 h-3.5" /> Add Faculty</Link>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3">
        {[
          { label: 'Total Faculty', value: MOCK_TEACHERS.length },
          { label: 'Active', value: MOCK_TEACHERS.filter(t => t.status === 'ACTIVE').length },
          { label: 'On Leave', value: MOCK_TEACHERS.filter(t => t.status === 'ON_LEAVE').length },
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
            <input placeholder="Search faculty…" className="input pl-9 text-xs h-9" value={search}
              onChange={e => { setSearch(e.target.value); setPage(1) }} />
          </div>
          <select className="select text-xs h-9 w-auto" value={dept} onChange={e => { setDept(e.target.value); setPage(1) }}>
            {depts.map(d => <option key={d}>{d}</option>)}
          </select>
          <select className="select text-xs h-9 w-auto" value={status} onChange={e => { setStatus(e.target.value); setPage(1) }}>
            {['All', 'ACTIVE', 'ON_LEAVE', 'INACTIVE'].map(s => <option key={s}>{s}</option>)}
          </select>
        </div>
        <DataTable columns={columns} data={paginated} selectable selectedIds={selected}
          onSelectAll={c => setSelected(c ? paginated.map(t => t.id) : [])}
          onSelectRow={(id, c) => setSelected(prev => c ? [...prev, id] : prev.filter(x => x !== id))}
          rowKey={t => t.id} pagination={meta} onPageChange={setPage}
          emptyIcon="👨‍🏫" emptyTitle="No faculty found" />
      </div>
    </div>
  )
}
