import { useState } from 'react'
import { Users, Search, TrendingUp, Download, Plus, GraduationCap, DollarSign, Activity, MoreHorizontal, FileText } from 'lucide-react'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Legend } from 'recharts'
import { Link } from 'react-router-dom'

const REVENUE_DATA = [
  { name: 'Jan', revenue: 4000, expenses: 2400 },
  { name: 'Feb', revenue: 3000, expenses: 1398 },
  { name: 'Mar', revenue: 2000, expenses: 9800 },
  { name: 'Apr', revenue: 2780, expenses: 3908 },
  { name: 'May', revenue: 1890, expenses: 4800 },
  { name: 'Jun', revenue: 2390, expenses: 3800 },
  { name: 'Jul', revenue: 3490, expenses: 4300 },
]

const ADMISSION_DATA = [
  { name: 'Jan', applications: 400, enrolled: 240 },
  { name: 'Feb', applications: 300, enrolled: 139 },
  { name: 'Mar', applications: 200, enrolled: 98 },
  { name: 'Apr', applications: 278, enrolled: 190 },
  { name: 'May', applications: 189, enrolled: 148 },
  { name: 'Jun', applications: 239, enrolled: 180 },
]

export function AdminDashboard() {
  return (
    <div className="flex flex-col gap-8 max-w-[1600px] mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">University Overview</h1>
          <p className="text-slate-500 mt-1">Key metrics and operational status for Fall 2026.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative hidden sm:block">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input placeholder="Search metrics..." className="input pl-9 h-10 w-64 rounded-xl border-slate-200 bg-white shadow-sm" />
          </div>
          <button className="btn-secondary h-10 rounded-xl px-4 shadow-sm"><Download className="w-4 h-4 mr-2" /> Export</button>
          <button className="btn-primary h-10 rounded-xl px-4 shadow-sm shadow-blue-600/20"><Plus className="w-4 h-4 mr-2" /> New Report</button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Total Students', value: '12,482', change: '+5.2%', up: true, icon: <Users className="w-5 h-5" />, color: 'blue' },
          { label: 'Active Faculty', value: '845', change: '+2.1%', up: true, icon: <GraduationCap className="w-5 h-5" />, color: 'indigo' },
          { label: 'Fee Collection', value: '$2.4M', change: '-1.4%', up: false, icon: <DollarSign className="w-5 h-5" />, color: 'emerald' },
          { label: 'Avg Attendance', value: '92.4%', change: '+0.8%', up: true, icon: <Activity className="w-5 h-5" />, color: 'amber' },
        ].map((kpi, i) => (
          <div key={i} className="bg-white rounded-3xl p-6 border border-slate-200/60 shadow-sm relative overflow-hidden group">
            <div className={`absolute -right-6 -top-6 w-24 h-24 bg-${kpi.color}-50 rounded-full opacity-50 group-hover:scale-150 transition-transform duration-500`}></div>
            <div className="relative z-10">
              <div className="flex justify-between items-start mb-6">
                <div className={`w-10 h-10 rounded-xl bg-${kpi.color}-50 border border-${kpi.color}-100 text-${kpi.color}-600 flex items-center justify-center`}>
                  {kpi.icon}
                </div>
                <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${kpi.up ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'}`}>
                  {kpi.change}
                </span>
              </div>
              <h3 className="text-3xl font-extrabold text-slate-900 tracking-tight">{kpi.value}</h3>
              <p className="text-sm font-medium text-slate-500 mt-1">{kpi.label}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Chart */}
        <div className="lg:col-span-2 bg-white rounded-3xl p-6 border border-slate-200/60 shadow-sm flex flex-col">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-lg font-bold text-slate-900">Revenue vs Expenses</h2>
              <p className="text-sm text-slate-500">Financial overview for the current fiscal year.</p>
            </div>
            <select className="select h-9 text-xs rounded-lg bg-slate-50">
              <option>This Year</option>
              <option>Last Year</option>
            </select>
          </div>
          <div className="flex-1 min-h-75">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={REVENUE_DATA} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2563eb" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#2563eb" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorExp" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f43f5e" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#f43f5e" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} dx={-10} tickFormatter={(value) => `$${value/1000}k`} />
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                  itemStyle={{ fontSize: '12px', fontWeight: 600 }}
                />
                <Area type="monotone" dataKey="revenue" stroke="#2563eb" strokeWidth={3} fillOpacity={1} fill="url(#colorRev)" />
                <Area type="monotone" dataKey="expenses" stroke="#f43f5e" strokeWidth={3} fillOpacity={1} fill="url(#colorExp)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Secondary Chart / Widget */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200/60 shadow-sm flex flex-col">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-lg font-bold text-slate-900">Admissions Funnel</h2>
            <button className="text-blue-600 hover:bg-blue-50 p-1.5 rounded-lg transition-colors"><MoreHorizontal className="w-5 h-5" /></button>
          </div>
          <div className="flex-1 min-h-62.5">
             <ResponsiveContainer width="100%" height="100%">
              <BarChart data={ADMISSION_DATA} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} />
                <Tooltip cursor={{ fill: '#f8fafc' }} contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                <Legend iconType="circle" wrapperStyle={{ fontSize: '12px', paddingTop: '20px' }} />
                <Bar dataKey="applications" fill="#cbd5e1" radius={[4, 4, 0, 0]} barSize={12} />
                <Bar dataKey="enrolled" fill="#3b82f6" radius={[4, 4, 0, 0]} barSize={12} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 pt-4 border-t border-slate-100 flex justify-between items-center">
            <div>
              <p className="text-sm font-bold text-slate-800">Conversion Rate</p>
              <p className="text-xs text-slate-500 mt-0.5">App to Enrollment</p>
            </div>
            <span className="text-lg font-extrabold text-blue-600">62.8%</span>
          </div>
        </div>
      </div>

      {/* Tables Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-3xl border border-slate-200/60 shadow-sm overflow-hidden flex flex-col">
          <div className="p-6 border-b border-slate-100 flex justify-between items-center">
            <h2 className="text-lg font-bold text-slate-900">Recent Applications</h2>
            <Link to="/admin/admissions" className="text-sm font-semibold text-blue-600 hover:text-blue-700">View All</Link>
          </div>
          <div className="p-2">
            {[1,2,3,4,5].map(i => (
              <div key={i} className="flex items-center justify-between p-3 hover:bg-slate-50 rounded-xl transition-colors cursor-pointer">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center text-slate-500 font-bold text-xs shrink-0">
                    S{i}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-800 leading-tight">Student Name {i}</p>
                    <p className="text-xs text-slate-500 mt-0.5">Applied for BSc Computer Science</p>
                  </div>
                </div>
                <span className="badge badge-blue">Review</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-3xl border border-slate-200/60 shadow-sm overflow-hidden flex flex-col">
          <div className="p-6 border-b border-slate-100 flex justify-between items-center">
            <h2 className="text-lg font-bold text-slate-900">System Alerts</h2>
          </div>
          <div className="p-4 flex flex-col gap-3">
             <div className="p-4 rounded-2xl bg-amber-50 border border-amber-100 flex gap-4">
                <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center text-amber-600 shrink-0"><FileText className="w-4 h-4" /></div>
                <div>
                  <h4 className="text-sm font-bold text-amber-900">Midterm Grading Overdue</h4>
                  <p className="text-xs text-amber-700/80 mt-1">3 courses have pending grades from faculty.</p>
                  <button className="text-xs font-bold text-amber-600 mt-2 hover:underline">Remind Faculty</button>
                </div>
             </div>
             <div className="p-4 rounded-2xl bg-red-50 border border-red-100 flex gap-4">
                <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center text-red-600 shrink-0"><DollarSign className="w-4 h-4" /></div>
                <div>
                  <h4 className="text-sm font-bold text-red-900">High Outstanding Fees</h4>
                  <p className="text-xs text-red-700/80 mt-1">Over $150k pending in current semester fees.</p>
                  <button className="text-xs font-bold text-red-600 mt-2 hover:underline">View Invoices</button>
                </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  )

}