import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Search, Filter, Download, Plus, Edit, Eye, Trash2, UserCheck, UserX, MoreVertical, Upload } from 'lucide-react'
import { DataTable } from '@/components/ui/DataTable'
import { Dropdown } from '@/components/ui/Dropdown'
import { toast } from '@/components/ui/Toast'
import { formatDate } from '@/utils/cn'
import type { Student, TableColumn, PaginationMeta } from '@/types'

// ─── Seed Data ─────────────────────────────────────────────────────────────────
const MOCK_STUDENTS: Student[] = [
  { id: '1', studentId: 'SS-2024-0001', name: 'Fatima Al-Hassan', email: 'fatima.alhassan@studysync.edu', phone: '+971-50-123-4567', department: 'Computer Science', program: 'BSc Computer Science', semester: 6, section: 'A', enrollmentDate: '2022-09-01', status: 'ACTIVE', gpa: 3.82, attendancePercentage: 91 },
  { id: '2', studentId: 'SS-2024-0002', name: 'Omar Abdullah', email: 'omar.abdullah@studysync.edu', phone: '+971-55-234-5678', department: 'Business Administration', program: 'MBA', semester: 3, section: 'B', enrollmentDate: '2023-01-15', status: 'ACTIVE', gpa: 3.51, attendancePercentage: 86 },
  { id: '3', studentId: 'SS-2024-0003', name: 'Aisha Rahman', email: 'aisha.rahman@studysync.edu', department: 'Engineering', program: 'BEng Civil', semester: 4, section: 'A', enrollmentDate: '2023-09-01', status: 'ACTIVE', gpa: 3.70, attendancePercentage: 94 },
  { id: '4', studentId: 'SS-2024-0004', name: 'Khalid Al-Farsi', email: 'khalid.alfarsi@studysync.edu', department: 'Medicine', program: 'MBBS', semester: 7, section: 'C', enrollmentDate: '2021-09-01', status: 'ACTIVE', gpa: 3.92, attendancePercentage: 97 },
  { id: '5', studentId: 'SS-2024-0005', name: 'Nour Ibrahim', email: 'nour.ibrahim@studysync.edu', department: 'Law', program: 'LLB', semester: 2, section: 'A', enrollmentDate: '2024-01-15', status: 'ACTIVE', gpa: 3.45, attendancePercentage: 88 },
  { id: '6', studentId: 'SS-2024-0006', name: 'Sara Qureshi', email: 'sara.qureshi@studysync.edu', department: 'Computer Science', program: 'BSc CS', semester: 5, section: 'B', enrollmentDate: '2022-09-01', status: 'ACTIVE', gpa: 3.60, attendancePercentage: 89 },
  { id: '7', studentId: 'SS-2023-0031', name: 'Ahmed Hassan', email: 'ahmed.hassan@studysync.edu', department: 'Business Administration', program: 'BBA', semester: 8, section: 'A', enrollmentDate: '2021-09-01', status: 'GRADUATED', gpa: 3.74, attendancePercentage: 92 },
  { id: '8', studentId: 'SS-2024-0008', name: 'Mariam Farooq', email: 'mariam.farooq@studysync.edu', department: 'Arts & Design', program: 'BFA', semester: 3, section: 'A', enrollmentDate: '2023-09-01', status: 'ACTIVE', gpa: 3.88, attendancePercentage: 83 },
  { id: '9', studentId: 'SS-2024-0009', name: 'Bilal Ahmed', email: 'bilal.ahmed@studysync.edu', department: 'Engineering', program: 'BEng Electrical', semester: 6, section: 'B', enrollmentDate: '2022-09-01', status: 'SUSPENDED', gpa: 2.10, attendancePercentage: 55 },
  { id: '10', studentId: 'SS-2024-0010', name: 'Zainab Hassan', email: 'zainab.hassan@studysync.edu', department: 'Computer Science', program: 'BSc AI', semester: 4, section: 'C', enrollmentDate: '2023-09-01', status: 'ACTIVE', gpa: 3.95, attendancePercentage: 96 },
  { id: '11', studentId: 'SS-2024-0011', name: 'Tariq Mahmoud', email: 'tariq.mahmoud@studysync.edu', department: 'Medicine', program: 'MBBS', semester: 5, section: 'A', enrollmentDate: '2022-09-01', status: 'ACTIVE', gpa: 3.55, attendancePercentage: 90 },
  { id: '12', studentId: 'SS-2024-0012', name: 'Huda Al-Rashid', email: 'huda.alrashid@studysync.edu', department: 'Law', program: 'LLB', semester: 6, section: 'B', enrollmentDate: '2022-09-01', status: 'ACTIVE', gpa: 3.78, attendancePercentage: 93 },
]

const statusColors: Record<string, string> = {
  ACTIVE: 'badge badge-green',
  INACTIVE: 'badge badge-gray',
  GRADUATED: 'badge badge-blue',
  SUSPENDED: 'badge badge-red',
}

const departments = ['All Departments', 'Computer Science', 'Business Administration', 'Engineering', 'Medicine', 'Law', 'Arts & Design']
const statusOptions = ['All Status', 'ACTIVE', 'INACTIVE', 'GRADUATED', 'SUSPENDED']
const semesters = ['All Semesters', '1', '2', '3', '4', '5', '6', '7', '8']

export function StudentsPage() {
  const [search, setSearch] = useState('')
  const [dept, setDept] = useState('All Departments')
  const [status, setStatus] = useState('All Status')
  const [semester, setSemester] = useState('All Semesters')
  const [selected, setSelected] = useState<string[]>([])
  const [page, setPage] = useState(1)
  const LIMIT = 10

  const filtered = MOCK_STUDENTS.filter(s => {
    const q = search.toLowerCase()
    const matchSearch = !q || s.name.toLowerCase().includes(q) || s.email.toLowerCase().includes(q) || s.studentId.toLowerCase().includes(q)
    const matchDept = dept === 'All Departments' || s.department === dept
    const matchStatus = status === 'All Status' || s.status === status
    const matchSem = semester === 'All Semesters' || String(s.semester) === semester
    return matchSearch && matchDept && matchStatus && matchSem
  })

  const paginated = filtered.slice((page - 1) * LIMIT, page * LIMIT)
  const meta: PaginationMeta = { page, limit: LIMIT, total: filtered.length, totalPages: Math.ceil(filtered.length / LIMIT) }

  const columns: TableColumn<Student>[] = [
    {
      key: 'name', header: 'Student', sortable: true,
      render: (_, s) => (
        <div className="flex items-center gap-3">
          <div className="avatar w-8 h-8 text-xs shrink-0">
            {s.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()}
          </div>
          <div>
            <Link to={`/admin/students/${s.id}`} className="text-sm font-medium text-slate-800 hover:text-blue-650 transition-colors">{s.name}</Link>
            <p className="text-xs text-slate-400">{s.studentId}</p>
          </div>
        </div>
      )
    },
    {
      key: 'department', header: 'Department', sortable: true,
      render: (_, s) => (
        <div>
          <p className="text-xs font-medium text-slate-700">{s.department}</p>
          <p className="text-xs text-slate-400">{s.program}</p>
        </div>
      )
    },
    {
      key: 'semester', header: 'Sem / Sec', sortable: true,
      render: (_, s) => <span className="text-xs text-slate-600">Sem {s.semester} · {s.section}</span>
    },
    {
      key: 'gpa', header: 'GPA', sortable: true,
      render: (v) => {
        const g = Number(v)
        return <span className={`text-xs font-semibold ${g >= 3.5 ? 'text-green-600' : g >= 2.5 ? 'text-amber-600' : 'text-red-600'}`}>{g.toFixed(2)}</span>
      }
    },
    {
      key: 'attendancePercentage', header: 'Attendance', sortable: true,
      render: (v) => {
        const a = Number(v)
        return (
          <div className="flex items-center gap-2">
            <div className="w-16 h-1.5 bg-slate-200 rounded-full overflow-hidden">
              <div className="h-full rounded-full" style={{ width: `${a}%`, backgroundColor: a >= 85 ? '#16A34A' : a >= 70 ? '#F59E0B' : '#DC2626' }} />
            </div>
            <span className={`text-xs font-medium ${a >= 85 ? 'text-green-600' : a >= 70 ? 'text-amber-600' : 'text-red-600'}`}>{a}%</span>
          </div>
        )
      }
    },
    {
      key: 'status', header: 'Status', sortable: true,
      render: (v) => <span className={statusColors[String(v)] ?? 'badge badge-gray'}>{String(v)}</span>
    },
    {
      key: 'enrollmentDate', header: 'Enrolled', sortable: true,
      render: (v) => <span className="text-xs text-slate-500">{formatDate(String(v))}</span>
    },
    {
      key: 'id', header: '', width: '3rem',
      render: (_, s) => (
        <Dropdown
          items={[
            { label: 'View Profile', icon: <Eye className="w-3.5 h-3.5" />, onClick: () => {} },
            { label: 'Edit Student', icon: <Edit className="w-3.5 h-3.5" />, onClick: () => {} },
            { label: 'View Attendance', icon: <UserCheck className="w-3.5 h-3.5" />, onClick: () => {} },
            { label: 'View Fees', icon: <UserCheck className="w-3.5 h-3.5" />, onClick: () => {} },
            { label: 'Suspend Student', icon: <UserX className="w-3.5 h-3.5" />, onClick: () => toast.warning('Student suspended', s.name), danger: true },
          ]}
        />
      )
    },
  ]

  function handleBulkAction(action: string) {
    if (selected.length === 0) { toast.warning('No students selected', 'Please select at least one student'); return }
    toast.success(`Bulk ${action}`, `Action applied to ${selected.length} student(s)`)
    setSelected([])
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Page header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="page-title">Students</h1>
          <p className="page-subtitle">Manage all enrolled students · {filtered.length} total</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="btn-secondary btn-sm" onClick={() => toast.info('Importing students...', 'CSV import started')}>
            <Upload className="w-3.5 h-3.5" /> Import
          </button>
          <button className="btn-secondary btn-sm" onClick={() => toast.success('Export started', 'Student list is being exported')}>
            <Download className="w-3.5 h-3.5" /> Export
          </button>
          <Link to="/admin/students/new" className="btn-primary btn-sm">
            <Plus className="w-3.5 h-3.5" /> Add Student
          </Link>
        </div>
      </div>

      {/* Stats bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: 'Total', value: MOCK_STUDENTS.length, color: 'blue' },
          { label: 'Active', value: MOCK_STUDENTS.filter(s => s.status === 'ACTIVE').length, color: 'green' },
          { label: 'Graduated', value: MOCK_STUDENTS.filter(s => s.status === 'GRADUATED').length, color: 'blue' },
          { label: 'Suspended', value: MOCK_STUDENTS.filter(s => s.status === 'SUSPENDED').length, color: 'red' },
        ].map(stat => (
          <div key={stat.label} className="stat-card flex items-center gap-3">
            <p className="text-2xl font-bold text-slate-800">{stat.value}</p>
            <p className="text-sm text-slate-500">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="card">
        <div className="p-4 flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1 max-w-xs">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search by name, ID, email…"
              className="input pl-9 text-xs h-9"
              value={search}
              onChange={e => { setSearch(e.target.value); setPage(1) }}
            />
          </div>
          <select className="select text-xs h-9 w-auto" value={dept} onChange={e => { setDept(e.target.value); setPage(1) }}>
            {departments.map(d => <option key={d}>{d}</option>)}
          </select>
          <select className="select text-xs h-9 w-auto" value={status} onChange={e => { setStatus(e.target.value); setPage(1) }}>
            {statusOptions.map(s => <option key={s}>{s}</option>)}
          </select>
          <select className="select text-xs h-9 w-auto" value={semester} onChange={e => { setSemester(e.target.value); setPage(1) }}>
            {semesters.map(s => <option key={s}>{s}</option>)}
          </select>
        </div>

        {/* Bulk actions bar */}
        {selected.length > 0 && (
          <div className="mx-4 mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg flex items-center gap-3">
            <span className="text-xs text-blue-700 font-medium">{selected.length} selected</span>
            <div className="flex gap-2 ml-auto">
              <button onClick={() => handleBulkAction('export')} className="btn-secondary btn-xs">Export</button>
              <button onClick={() => handleBulkAction('email')} className="btn-secondary btn-xs">Send Email</button>
              <button onClick={() => handleBulkAction('delete')} className="btn-danger btn-xs">Delete</button>
              <button onClick={() => setSelected([])} className="btn-ghost btn-xs">Clear</button>
            </div>
          </div>
        )}

        {/* Table */}
        <DataTable
          columns={columns}
          data={paginated}
          selectable
          selectedIds={selected}
          onSelectAll={checked => setSelected(checked ? paginated.map(s => s.id) : [])}
          onSelectRow={(id, checked) => setSelected(prev => checked ? [...prev, id] : prev.filter(x => x !== id))}
          rowKey={s => s.id}
          pagination={meta}
          onPageChange={setPage}
          emptyIcon="👥"
          emptyTitle="No students found"
          emptyDescription="Try adjusting your search or filters."
        />
      </div>
    </div>
  )
}
