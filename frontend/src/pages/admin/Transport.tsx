import { Bus, Search, Plus, Filter, MapPin, Users } from 'lucide-react'

const ROUTES = [
  { id: 'RT-01', name: 'North Campus Loop', stops: 8, vehicle: 'Bus #12', driver: 'Ahmed Khan', students: 34, status: 'ACTIVE' },
  { id: 'RT-02', name: 'South Residential', stops: 5, vehicle: 'Bus #07', driver: 'Bilal Sheikh', students: 28, status: 'ACTIVE' },
  { id: 'RT-03', name: 'City Center Express', stops: 12, vehicle: 'Bus #03', driver: 'Usman Ali', students: 45, status: 'ACTIVE' },
  { id: 'RT-04', name: 'East Township', stops: 6, vehicle: 'Bus #09', driver: 'N/A', students: 0, status: 'SUSPENDED' },
]

export function TransportPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="page-title">Transport Management</h1>
          <p className="page-subtitle">Manage bus routes, vehicles, drivers, and student assignments.</p>
        </div>
        <button className="btn-primary"><Plus className="w-4 h-4 mr-2" /> Add Route</button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="card p-6 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center"><Bus className="w-6 h-6" /></div>
          <div>
            <p className="text-2xl font-extrabold text-slate-900">12</p>
            <p className="text-sm font-medium text-slate-500">Active Vehicles</p>
          </div>
        </div>
        <div className="card p-6 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-green-50 text-green-600 flex items-center justify-center"><MapPin className="w-6 h-6" /></div>
          <div>
            <p className="text-2xl font-extrabold text-slate-900">4</p>
            <p className="text-sm font-medium text-slate-500">Active Routes</p>
          </div>
        </div>
        <div className="card p-6 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center"><Users className="w-6 h-6" /></div>
          <div>
            <p className="text-2xl font-extrabold text-slate-900">107</p>
            <p className="text-sm font-medium text-slate-500">Students Enrolled</p>
          </div>
        </div>
      </div>

      <div className="card overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input placeholder="Search routes..." className="input pl-9 w-full" />
          </div>
          <button className="btn-secondary"><Filter className="w-4 h-4 mr-2" /> Filter</button>
        </div>
        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th>Route ID</th>
                <th>Route Name</th>
                <th>Stops</th>
                <th>Vehicle</th>
                <th>Driver</th>
                <th>Students</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {ROUTES.map(r => (
                <tr key={r.id} className="cursor-pointer hover:bg-slate-50">
                  <td className="font-mono text-xs text-slate-500">{r.id}</td>
                  <td className="font-bold text-slate-800">{r.name}</td>
                  <td>{r.stops}</td>
                  <td>{r.vehicle}</td>
                  <td>{r.driver}</td>
                  <td>{r.students}</td>
                  <td><span className={`badge ${r.status === 'ACTIVE' ? 'badge-green' : 'badge-red'}`}>{r.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
