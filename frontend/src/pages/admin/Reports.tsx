import { BarChart2, Download, FileText, Filter, TrendingUp } from 'lucide-react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts'

const DEPT_DATA = [
  { name: 'CS', students: 1200, passed: 1100, failed: 100 },
  { name: 'BBA', students: 800, passed: 720, failed: 80 },
  { name: 'MechEng', students: 450, passed: 390, failed: 60 },
  { name: 'Medicine', students: 300, passed: 280, failed: 20 },
  { name: 'Math', students: 250, passed: 220, failed: 30 },
]

const REPORT_TYPES = [
  { id: '1', title: 'Academic Performance Report', desc: 'Student GPA & CGPA analysis across departments', icon: '🎓', color: 'bg-blue-50 border-blue-100' },
  { id: '2', title: 'Attendance Summary Report', desc: 'Monthly attendance rates for all courses & faculty', icon: '📅', color: 'bg-green-50 border-green-100' },
  { id: '3', title: 'Fee Collection Report', desc: 'Revenue, outstanding dues, and payment trends', icon: '💰', color: 'bg-amber-50 border-amber-100' },
  { id: '4', title: 'Admissions Conversion Report', desc: 'Application to enrollment funnel analysis', icon: '📊', color: 'bg-purple-50 border-purple-100' },
  { id: '5', title: 'Faculty Workload Report', desc: 'Course assignments, teaching hours per faculty member', icon: '👩‍🏫', color: 'bg-rose-50 border-rose-100' },
  { id: '6', title: 'Library Usage Report', desc: 'Book issuance, overdue returns, and catalog stats', icon: '📚', color: 'bg-indigo-50 border-indigo-100' },
]

export function ReportsPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="page-title">Reports & Analytics</h1>
          <p className="page-subtitle">Generate, export, and schedule custom university reports.</p>
        </div>
        <div className="flex gap-2">
          <button className="btn-secondary"><Filter className="w-4 h-4 mr-2" /> Filter</button>
          <button className="btn-primary"><Download className="w-4 h-4 mr-2" /> Export All</button>
        </div>
      </div>

      {/* Quick Report Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {REPORT_TYPES.map(r => (
          <div key={r.id} className={`card p-5 border flex items-start gap-4 hover:shadow-md transition-shadow cursor-pointer group ${r.color}`}>
            <div className="text-2xl">{r.icon}</div>
            <div className="flex-1">
              <h3 className="text-sm font-bold text-slate-900 group-hover:text-blue-600 transition-colors">{r.title}</h3>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">{r.desc}</p>
              <button className="mt-3 text-xs font-bold text-blue-600 flex items-center gap-1 hover:gap-2 transition-all">
                <Download className="w-3.5 h-3.5" /> Generate Report
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Main Chart */}
      <div className="card p-6">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-lg font-bold text-slate-900">Department-wise Academic Performance</h2>
            <p className="text-sm text-slate-500 mt-1">Students passed vs failed breakdown per department</p>
          </div>
          <select className="select h-9"><option>Fall 2026</option></select>
        </div>
        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={DEPT_DATA} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} dy={10} />
              <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} />
              <Tooltip cursor={{ fill: '#f8fafc' }} contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
              <Legend iconType="circle" wrapperStyle={{ fontSize: '12px', paddingTop: '20px' }} />
              <Bar dataKey="passed" fill="#22c55e" radius={[4, 4, 0, 0]} barSize={24} />
              <Bar dataKey="failed" fill="#f43f5e" radius={[4, 4, 0, 0]} barSize={24} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}
