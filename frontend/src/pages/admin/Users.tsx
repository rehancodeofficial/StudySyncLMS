import { useState } from 'react'
import { Users, Search, Plus, Filter, Shield, MoreHorizontal } from 'lucide-react'

type Role = 'SUPER_ADMIN' | 'UNIVERSITY_ADMIN' | 'FACULTY' | 'STUDENT' | 'ACCOUNTANT' | 'LIBRARIAN'

const MOCK_USERS = [
  { id: '1', name: 'Dr. Sarah Mitchell', email: 'sarah.mitchell@studysync.edu', role: 'UNIVERSITY_ADMIN' as Role, status: 'ACTIVE', lastLogin: '2h ago' },
  { id: '2', name: 'Prof. James Carter', email: 'james.carter@studysync.edu', role: 'FACULTY' as Role, status: 'ACTIVE', lastLogin: '1d ago' },
  { id: '3', name: 'Alex Johnson', email: 'alex.johnson@studysync.edu', role: 'STUDENT' as Role, status: 'ACTIVE', lastLogin: '3h ago' },
  { id: '4', name: 'Ms. Sana Raza', email: 'sana.raza@studysync.edu', role: 'ACCOUNTANT' as Role, status: 'ACTIVE', lastLogin: '5h ago' },
  { id: '5', name: 'Mr. Kareem Ibrahim', email: 'kareem.ibrahim@studysync.edu', role: 'LIBRARIAN' as Role, status: 'INACTIVE', lastLogin: '7d ago' },
]

const ROLE_BADGE: Record<Role, string> = {
  SUPER_ADMIN: 'badge-red',
  UNIVERSITY_ADMIN: 'badge-blue',
  FACULTY: 'badge-purple',
  STUDENT: 'badge-green',
  ACCOUNTANT: 'badge-amber',
  LIBRARIAN: 'badge-blue',
}

export function UsersPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="page-title">User Management</h1>
          <p className="page-subtitle">Manage system users, roles, and access permissions.</p>
        </div>
        <button className="btn-primary"><Plus className="w-4 h-4 mr-2" /> Add User</button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { role: 'Admins', count: 8, icon: '🛡️' },
          { role: 'Faculty', count: 845, icon: '👩‍🏫' },
          { role: 'Students', count: 12482, icon: '🎓' },
          { role: 'Other Staff', count: 150, icon: '👥' },
        ].map(r => (
          <div key={r.role} className="card p-5">
            <div className="text-2xl mb-2">{r.icon}</div>
            <p className="text-2xl font-extrabold text-slate-900">{r.count.toLocaleString()}</p>
            <p className="text-sm font-medium text-slate-500">{r.role}</p>
          </div>
        ))}
      </div>

      <div className="card overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input placeholder="Search users by name or email..." className="input pl-9 w-full" />
          </div>
          <button className="btn-secondary"><Filter className="w-4 h-4 mr-2" /> Filter</button>
        </div>
        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Status</th>
                <th>Last Login</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {MOCK_USERS.map(u => (
                <tr key={u.id} className="hover:bg-slate-50 cursor-pointer">
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center font-bold text-slate-500 text-xs shrink-0">
                        {u.name.charAt(0)}
                      </div>
                      <span className="font-bold text-slate-800">{u.name}</span>
                    </div>
                  </td>
                  <td className="text-slate-500">{u.email}</td>
                  <td><span className={`badge ${ROLE_BADGE[u.role]}`}><Shield className="w-3 h-3 mr-1" />{u.role}</span></td>
                  <td><span className={`badge ${u.status === 'ACTIVE' ? 'badge-green' : 'badge-red'}`}>{u.status}</span></td>
                  <td className="text-slate-500">{u.lastLogin}</td>
                  <td><button className="text-slate-400 hover:text-slate-600"><MoreHorizontal className="w-5 h-5" /></button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
