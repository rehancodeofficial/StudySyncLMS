import { DollarSign, TrendingUp, TrendingDown, CreditCard, Download } from 'lucide-react'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

const REVENUE_DATA = [
  { name: 'Jan', revenue: 45000, target: 40000 },
  { name: 'Feb', revenue: 52000, target: 45000 },
  { name: 'Mar', revenue: 48000, target: 50000 },
  { name: 'Apr', revenue: 61000, target: 50000 },
  { name: 'May', revenue: 59000, target: 55000 },
  { name: 'Jun', revenue: 75000, target: 60000 },
]

export function FinancePage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="page-title">Financial Overview</h1>
          <p className="page-subtitle">Track revenue, expenses, and fee collection across the university.</p>
        </div>
        <div className="flex gap-2">
          <button className="btn-secondary"><Download className="w-4 h-4 mr-2" /> Export Report</button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card p-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-10"><DollarSign className="w-16 h-16 text-blue-600" /></div>
          <p className="text-sm font-medium text-slate-500 mb-2">Total Revenue (YTD)</p>
          <h3 className="text-3xl font-extrabold text-slate-900">$2,450,000</h3>
          <p className="text-sm text-green-600 font-medium mt-2 flex items-center gap-1"><TrendingUp className="w-4 h-4" /> +12.5% from last year</p>
        </div>
        <div className="card p-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-10"><CreditCard className="w-16 h-16 text-emerald-600" /></div>
          <p className="text-sm font-medium text-slate-500 mb-2">Fee Collection Rate</p>
          <h3 className="text-3xl font-extrabold text-slate-900">92.4%</h3>
          <p className="text-sm text-green-600 font-medium mt-2 flex items-center gap-1"><TrendingUp className="w-4 h-4" /> +2.1% from last semester</p>
        </div>
        <div className="card p-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-10"><TrendingDown className="w-16 h-16 text-red-600" /></div>
          <p className="text-sm font-medium text-slate-500 mb-2">Outstanding Dues</p>
          <h3 className="text-3xl font-extrabold text-slate-900">$185,400</h3>
          <p className="text-sm text-red-600 font-medium mt-2 flex items-center gap-1"><TrendingDown className="w-4 h-4" /> 450 students pending</p>
        </div>
      </div>

      <div className="card p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-bold text-slate-900">Revenue Trends</h2>
          <select className="select h-9"><option>2026-2027</option></select>
        </div>
        <div className="h-75 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={REVENUE_DATA} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="colorRev2" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#2563eb" stopOpacity={0.2}/>
                  <stop offset="95%" stopColor="#2563eb" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} dy={10} />
              <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} tickFormatter={(val) => `$${val/1000}k`} />
              <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }} />
              <Area type="monotone" dataKey="revenue" stroke="#2563eb" strokeWidth={3} fillOpacity={1} fill="url(#colorRev2)" />
              <Area type="monotone" dataKey="target" stroke="#94a3b8" strokeDasharray="5 5" strokeWidth={2} fill="none" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}
