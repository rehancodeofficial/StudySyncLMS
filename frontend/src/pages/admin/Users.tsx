import { useState } from 'react'
import api from '@/api/client'

export function UsersPage() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState('student')
  const [success, setSuccess] = useState('')
  const [error, setError] = useState('')

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault()
    setError(''); setSuccess('')
    api.post('/auth/register', { name, email, password, roles: [role] })
       .then(res => {
         setSuccess(res.data.message || 'User registered successfully')
         setName(''); setEmail(''); setPassword('')
       })
       .catch(err => {
         setError(err.response?.data?.message || 'Registration failed')
       })
  }

  return (
    <div className="max-w-4xl mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6">User Management</h1>
      
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        <h2 className="text-lg font-bold mb-4">Register New User</h2>
        <form onSubmit={handleRegister} className="flex flex-col gap-4 max-w-lg">
          <div>
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-1 block">Full Name</label>
            <input required value={name} onChange={e => setName(e.target.value)} className="w-full border border-slate-200 rounded-lg px-3 py-2" />
          </div>
          <div>
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-1 block">Email</label>
            <input required type="email" value={email} onChange={e => setEmail(e.target.value)} className="w-full border border-slate-200 rounded-lg px-3 py-2" />
          </div>
          <div>
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-1 block">Password</label>
            <input required type="password" value={password} onChange={e => setPassword(e.target.value)} className="w-full border border-slate-200 rounded-lg px-3 py-2" minLength={6} />
          </div>
          <div>
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-1 block">Role</label>
            <select value={role} onChange={e => setRole(e.target.value)} className="w-full border border-slate-200 rounded-lg px-3 py-2">
              <option value="student">Student</option>
              <option value="instructor">Instructor</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          
          {success && <div className="text-sm font-medium text-green-600 bg-green-50 p-2 rounded">{success}</div>}
          {error && <div className="text-sm font-medium text-red-600 bg-red-50 p-2 rounded">{error}</div>}
          
          <button type="submit" className="bg-blue-600 text-white font-bold py-2.5 rounded-lg hover:bg-blue-500 mt-2">
            Register User
          </button>
        </form>
      </div>
    </div>
  )
}
