import { Home, Search, Plus, Filter, Users, BedDouble } from 'lucide-react'

const HOSTELS = [
  { id: 'H-01', name: 'Al-Biruni Hostel (Boys)', totalRooms: 80, occupied: 72, available: 8, warden: 'Dr. Tariq Mahmood' },
  { id: 'H-02', name: 'Fatima Jinnah Hostel (Girls)', totalRooms: 60, occupied: 55, available: 5, warden: 'Ms. Sana Raza' },
  { id: 'H-03', name: 'New Block A (Boys)', totalRooms: 40, occupied: 30, available: 10, warden: 'Mr. Rizwan Iqbal' },
]

export function HostelPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="page-title">Hostel Management</h1>
          <p className="page-subtitle">Manage hostel blocks, room allocations, and residents.</p>
        </div>
        <button className="btn-primary"><Plus className="w-4 h-4 mr-2" /> Add Block</button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="card p-6 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center"><Home className="w-6 h-6" /></div>
          <div>
            <p className="text-2xl font-extrabold text-slate-900">180</p>
            <p className="text-sm font-medium text-slate-500">Total Rooms</p>
          </div>
        </div>
        <div className="card p-6 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center"><Users className="w-6 h-6" /></div>
          <div>
            <p className="text-2xl font-extrabold text-slate-900">157</p>
            <p className="text-sm font-medium text-slate-500">Occupied</p>
          </div>
        </div>
        <div className="card p-6 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-green-50 text-green-600 flex items-center justify-center"><BedDouble className="w-6 h-6" /></div>
          <div>
            <p className="text-2xl font-extrabold text-slate-900">23</p>
            <p className="text-sm font-medium text-slate-500">Available Rooms</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {HOSTELS.map(h => (
          <div key={h.id} className="card p-6 flex flex-col gap-4">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-bold text-slate-900 leading-tight">{h.name}</h3>
                <p className="text-xs text-slate-500 mt-1">Warden: {h.warden}</p>
              </div>
              <span className="badge badge-blue">{h.id}</span>
            </div>
            
            <div className="flex flex-col gap-1.5">
              <div className="flex justify-between items-center text-xs">
                <span className="font-medium text-slate-600">Occupancy</span>
                <span className="font-bold text-slate-800">{h.occupied}/{h.totalRooms}</span>
              </div>
              <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-blue-600 rounded-full" style={{ width: `${(h.occupied / h.totalRooms) * 100}%` }} />
              </div>
            </div>

            <div className="flex justify-between items-center pt-2 border-t border-slate-100">
              <span className="text-xs text-slate-500">{h.available} rooms available</span>
              <button className="text-xs font-semibold text-blue-600 hover:underline">View Rooms</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
