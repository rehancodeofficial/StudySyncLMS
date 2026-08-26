import { FileText, Search, Plus, Filter, MoreHorizontal, CheckCircle, Clock, AlertCircle } from 'lucide-react'
import { DataTable } from '@/components/ui/DataTable'
import type { TableColumn } from '@/types'

type Invoice = { id: string; student: string; amount: string; date: string; status: string; type: string }

const MOCK_INVOICES: Invoice[] = [
  { id: 'INV-2026-001', student: 'Sarah Jenkins', amount: '$4,500', date: 'Aug 15, 2026', status: 'PAID', type: 'Tuition Fee' },
  { id: 'INV-2026-002', student: 'Michael Chen', amount: '$4,500', date: 'Aug 15, 2026', status: 'PENDING', type: 'Tuition Fee' },
  { id: 'INV-2026-003', student: 'Emma Wilson', amount: '$1,200', date: 'Aug 10, 2026', status: 'OVERDUE', type: 'Hostel Fee' },
  { id: 'INV-2026-004', student: 'James Rodriguez', amount: '$4,500', date: 'Aug 15, 2026', status: 'PAID', type: 'Tuition Fee' },
  { id: 'INV-2026-005', student: 'Aisha Patel', amount: '$300', date: 'Aug 20, 2026', status: 'PENDING', type: 'Transport Fee' },
]

export function InvoicesPage() {
  const columns: TableColumn<Invoice>[] = [
    { key: 'id', header: 'Invoice ID' },
    { key: 'student', header: 'Student Name' },
    { key: 'type', header: 'Fee Type' },
    { key: 'amount', header: 'Amount' },
    { key: 'date', header: 'Issue Date' },
    { key: 'status', header: 'Status', render: (val: any) => (
      <span className={`badge ${val === 'PAID' ? 'badge-green' : val === 'PENDING' ? 'badge-amber' : 'badge-red'}`}>
        {val === 'PAID' && <CheckCircle className="w-3 h-3 mr-1" />}
        {val === 'PENDING' && <Clock className="w-3 h-3 mr-1" />}
        {val === 'OVERDUE' && <AlertCircle className="w-3 h-3 mr-1" />}
        {val}
      </span>
    ) },
    { key: 'id' as keyof Invoice, header: '', render: () => (
      <button className="text-slate-400 hover:text-slate-600"><MoreHorizontal className="w-5 h-5" /></button>
    ) }
  ]

  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="page-title">Invoices</h1>
          <p className="page-subtitle">Manage student fee invoices and track payments.</p>
        </div>
        <button className="btn-primary"><Plus className="w-4 h-4 mr-2" /> Generate Invoice</button>
      </div>

      <div className="card p-4">
        <div className="flex gap-4 mb-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input placeholder="Search by student name or invoice ID..." className="input pl-9 w-full" />
          </div>
          <button className="btn-secondary"><Filter className="w-4 h-4 mr-2" /> Filter</button>
        </div>
        <DataTable columns={columns} data={MOCK_INVOICES} />
      </div>
    </div>
  )
}
