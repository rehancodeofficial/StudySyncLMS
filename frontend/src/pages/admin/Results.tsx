import { useState } from 'react'
import { Search, Download, Award, FileText, CheckCircle, TrendingUp, Printer, Send } from 'lucide-react'
import { DataTable } from '@/components/ui/DataTable'
import { Dropdown } from '@/components/ui/Dropdown'
import { toast } from '@/components/ui/Toast'

const MOCK_RESULTS = [
  { id: '1', studentId: 'SS-2024-0001', name: 'Fatima Al-Hassan', program: 'BSc Computer Science', semester: 6, gpa: 3.82, cgpa: 3.75, status: 'PUBLISHED' },
  { id: '2', studentId: 'SS-2024-0002', name: 'Omar Abdullah', program: 'MBA', semester: 3, gpa: 3.51, cgpa: 3.60, status: 'PUBLISHED' },
  { id: '3', studentId: 'SS-2024-0003', name: 'Aisha Rahman', program: 'BEng Civil', semester: 4, gpa: 3.70, cgpa: 3.65, status: 'PUBLISHED' },
  { id: '4', studentId: 'SS-2024-0009', name: 'Bilal Ahmed', program: 'BEng Electrical', semester: 6, gpa: 2.10, cgpa: 2.25, status: 'WITHHELD' },
  { id: '5', studentId: 'SS-2024-0010', name: 'Zainab Hassan', program: 'BSc AI', semester: 4, gpa: 3.95, cgpa: 3.90, status: 'PUBLISHED' },
]

export function ResultsPage() {
  const [search, setSearch] = useState('')
  const [program, setProgram] = useState('All')
  
  const filtered = MOCK_RESULTS.filter(r => 
    (r.name.toLowerCase().includes(search.toLowerCase()) || r.studentId.toLowerCase().includes(search.toLowerCase())) &&
    (program === 'All' || r.program === program)
  )

  const columns = [
    {
      key: 'name', header: 'Student', sortable: true,
      render: (_: any, r: any) => (
        <div className="flex items-center gap-3">
          <div className="avatar w-8 h-8 text-xs shrink-0">{r.name.split(' ').map((n: string) => n[0]).join('').slice(0, 2)}</div>
          <div>
            <p className="text-sm font-medium text-slate-800">{r.name}</p>
            <p className="text-xs text-slate-400">{r.studentId}</p>
          </div>
        </div>
      )
    },
    { key: 'program', header: 'Program', render: (v: any, r: any) => <span className="text-xs text-slate-600">{v} · Sem {r.semester}</span> },
    { key: 'gpa', header: 'GPA', sortable: true, render: (v: any) => <span className={`text-xs font-semibold ${v >= 3.5 ? 'text-green-600' : v >= 2.5 ? 'text-amber-600' : 'text-red-600'}`}>{v.toFixed(2)}</span> },
    { key: 'cgpa', header: 'CGPA', sortable: true, render: (v: any) => <span className="text-xs font-medium text-slate-700">{v.toFixed(2)}</span> },
    {
      key: 'status', header: 'Status',
      render: (v: any) => <span className={`badge ${v === 'PUBLISHED' ? 'badge-green' : 'badge-red'}`}>{v}</span>
    },
    {
      key: 'id', header: '', width: '3rem',
      render: (_: any, r: any) => (
        <Dropdown items={[
          { label: 'View Transcript', icon: <FileText className="w-3.5 h-3.5" />, onClick: () => {} },
          { label: 'Print Report Card', icon: <Printer className="w-3.5 h-3.5" />, onClick: () => {} },
          { label: 'Email Result', icon: <Send className="w-3.5 h-3.5" />, onClick: () => toast.success('Sent', `Result emailed to ${r.name}`) },
        ]} />
      )
    }
  ]

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="page-title">Results & Gradebook</h1>
          <p className="page-subtitle">Manage student academic records, GPA, and transcripts</p>
        </div>
        <div className="flex gap-2">
          <button className="btn-secondary btn-sm"><Download className="w-3.5 h-3.5" /> Export All</button>
          <button className="btn-primary btn-sm"><Award className="w-3.5 h-3.5" /> Publish Results</button>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="stat-card">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center"><CheckCircle className="w-4 h-4" /></div>
            <p className="text-sm font-medium text-slate-600">Results Published</p>
          </div>
          <p className="text-2xl font-bold text-slate-800">4,850</p>
          <p className="text-[10px] text-slate-400 mt-1">Spring 2026 Semester</p>
        </div>
        <div className="stat-card">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-8 h-8 rounded-lg bg-green-50 text-green-600 flex items-center justify-center"><TrendingUp className="w-4 h-4" /></div>
            <p className="text-sm font-medium text-slate-600">Average CGPA</p>
          </div>
          <p className="text-2xl font-bold text-slate-800">3.12</p>
          <p className="text-[10px] text-green-600 mt-1">↑ 0.05 from last semester</p>
        </div>
        <div className="stat-card">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center"><Award className="w-4 h-4" /></div>
            <p className="text-sm font-medium text-slate-600">Dean's List</p>
          </div>
          <p className="text-2xl font-bold text-slate-800">428</p>
          <p className="text-[10px] text-slate-400 mt-1">Students with GPA {'>'} 3.75</p>
        </div>
        <div className="stat-card border-red-200">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-8 h-8 rounded-lg bg-red-50 text-red-600 flex items-center justify-center"><FileText className="w-4 h-4" /></div>
            <p className="text-sm font-medium text-slate-600">Academic Warning</p>
          </div>
          <p className="text-2xl font-bold text-red-600">84</p>
          <p className="text-[10px] text-red-500 mt-1">Students with CGPA {'<'} 2.0</p>
        </div>
      </div>

      <div className="card">
        <div className="p-4 border-b border-slate-100 flex gap-3">
          <div className="relative max-w-xs w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input placeholder="Search student…" className="input pl-9 text-xs h-9" value={search} onChange={e => setSearch(e.target.value)} />
          </div>
          <select className="select text-xs h-9 w-auto" value={program} onChange={e => setProgram(e.target.value)}>
            <option value="All">All Programs</option>
            <option value="BSc Computer Science">BSc Computer Science</option>
            <option value="MBA">MBA</option>
            <option value="BEng Civil">BEng Civil</option>
            <option value="BEng Electrical">BEng Electrical</option>
          </select>
        </div>
        <DataTable columns={columns} data={filtered} />
      </div>
    </div>
  )
}
