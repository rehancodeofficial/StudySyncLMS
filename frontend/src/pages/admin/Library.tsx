import { Book, Search, Plus, Filter, MoreHorizontal } from 'lucide-react'
import { DataTable } from '@/components/ui/DataTable'
import type { TableColumn } from '@/types'

type BookRow = { id: string; title: string; author: string; category: string; status: string; copies: number }

const MOCK_BOOKS: BookRow[] = [
  { id: 'B-001', title: 'Introduction to Algorithms', author: 'Thomas H. Cormen', category: 'Computer Science', status: 'AVAILABLE', copies: 5 },
  { id: 'B-002', title: 'Clean Code', author: 'Robert C. Martin', category: 'Software Engineering', status: 'ISSUED', copies: 0 },
  { id: 'B-003', title: 'Calculus: Early Transcendentals', author: 'James Stewart', category: 'Mathematics', status: 'AVAILABLE', copies: 12 },
  { id: 'B-004', title: 'Physics for Scientists', author: 'Raymond A. Serway', category: 'Physics', status: 'AVAILABLE', copies: 3 },
  { id: 'B-005', title: 'Design Patterns', author: 'Erich Gamma', category: 'Computer Science', status: 'ISSUED', copies: 0 },
]

export function LibraryPage() {
  const columns: TableColumn<BookRow>[] = [
    { key: 'id', header: 'Book ID' },
    { key: 'title', header: 'Title', render: (val) => <span className="font-bold text-slate-800">{String(val)}</span> },
    { key: 'author', header: 'Author' },
    { key: 'category', header: 'Category' },
    { key: 'status', header: 'Status', render: (val) => (
      <span className={`badge ${val === 'AVAILABLE' ? 'badge-green' : 'badge-amber'}`}>{String(val)}</span>
    ) },
    { key: 'copies', header: 'Available Copies' },
    { key: 'id' as keyof BookRow, header: '', render: () => (
      <button className="text-slate-400 hover:text-slate-600"><MoreHorizontal className="w-5 h-5" /></button>
    ) }
  ]

  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="page-title">Library Management</h1>
          <p className="page-subtitle">Track book inventory, issues, and returns.</p>
        </div>
        <button className="btn-primary"><Plus className="w-4 h-4 mr-2" /> Add Book</button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="card p-6 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center"><Book className="w-6 h-6" /></div>
          <div>
            <p className="text-2xl font-extrabold text-slate-900">12,450</p>
            <p className="text-sm font-medium text-slate-500">Total Books</p>
          </div>
        </div>
        <div className="card p-6 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center"><Book className="w-6 h-6" /></div>
          <div>
            <p className="text-2xl font-extrabold text-slate-900">842</p>
            <p className="text-sm font-medium text-slate-500">Currently Issued</p>
          </div>
        </div>
        <div className="card p-6 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-red-50 text-red-600 flex items-center justify-center"><Book className="w-6 h-6" /></div>
          <div>
            <p className="text-2xl font-extrabold text-slate-900">15</p>
            <p className="text-sm font-medium text-slate-500">Overdue Returns</p>
          </div>
        </div>
      </div>

      <div className="card p-4">
        <div className="flex gap-4 mb-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input placeholder="Search books by title, author, or ID..." className="input pl-9 w-full" />
          </div>
          <button className="btn-secondary"><Filter className="w-4 h-4 mr-2" /> Filter</button>
        </div>
        <DataTable columns={columns} data={MOCK_BOOKS} />
      </div>
    </div>
  )
}
