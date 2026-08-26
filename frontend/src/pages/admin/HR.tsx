import { Users, Search, Plus, Filter, MoreHorizontal, UserCheck, Briefcase } from 'lucide-react'
import { DataTable } from '@/components/ui/DataTable'
import type { TableColumn } from '@/types'

type StaffRow = { id: string; name: string; department: string; role: string; status: string; type: string }

const MOCK_STAFF: StaffRow[] = [
  { id: 'EMP-001', name: 'Alice Smith', department: 'Administration', role: 'Registrar', status: 'ACTIVE', type: 'Full-time' },
  { id: 'EMP-002', name: 'Robert Johnson', department: 'Computer Science', role: 'Professor', status: 'ACTIVE', type: 'Full-time' },
  { id: 'EMP-003', name: 'Eva Williams', department: 'Library', role: 'Librarian', status: 'ON_LEAVE', type: 'Part-time' },
  { id: 'EMP-004', name: 'Daniel Brown', department: 'Finance', role: 'Accountant', status: 'ACTIVE', type: 'Full-time' },
  { id: 'EMP-005', name: 'Sophie Davis', department: 'Mathematics', role: 'Assistant Professor', status: 'ACTIVE', type: 'Full-time' },
]

export function HRPage() {
  const columns: TableColumn<StaffRow>[] = [
    { key: 'id', header: 'Employee ID' },
    { key: 'name', header: 'Name', render: (val) => <span className="font-bold text-slate-800">{String(val)}</span> },
    { key: 'department', header: 'Department' },
    { key: 'role', header: 'Role' },
    { key: 'type', header: 'Employment Type' },
    { key: 'status', header: 'Status', render: (val) => (
      <span className={`badge ${val === 'ACTIVE' ? 'badge-green' : 'badge-amber'}`}>{String(val)}</span>
    ) },
    { key: 'id' as keyof StaffRow, header: '', render: () => (
      <button className="text-slate-400 hover:text-slate-600"><MoreHorizontal className="w-5 h-5" /></button>
    ) }
  ]

  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="page-title">Human Resources</h1>
          <p className="page-subtitle">Manage university staff, payroll, and leave requests.</p>
        </div>
        <button className="btn-primary"><Plus className="w-4 h-4 mr-2" /> Add Employee</button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="card p-6 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center"><Users className="w-6 h-6" /></div>
          <div>
            <p className="text-2xl font-extrabold text-slate-900">452</p>
            <p className="text-sm font-medium text-slate-500">Total Staff</p>
          </div>
        </div>
        <div className="card p-6 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-green-50 text-green-600 flex items-center justify-center"><UserCheck className="w-6 h-6" /></div>
          <div>
            <p className="text-2xl font-extrabold text-slate-900">438</p>
            <p className="text-sm font-medium text-slate-500">Present Today</p>
          </div>
        </div>
        <div className="card p-6 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center"><Briefcase className="w-6 h-6" /></div>
          <div>
            <p className="text-2xl font-extrabold text-slate-900">12</p>
            <p className="text-sm font-medium text-slate-500">Pending Leave Requests</p>
          </div>
        </div>
      </div>

      <div className="card p-4">
        <div className="flex gap-4 mb-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input placeholder="Search staff by name, ID, or department..." className="input pl-9 w-full" />
          </div>
          <button className="btn-secondary"><Filter className="w-4 h-4 mr-2" /> Filter</button>
        </div>
        <DataTable columns={columns} data={MOCK_STAFF} />
      </div>
    </div>
  )
}
