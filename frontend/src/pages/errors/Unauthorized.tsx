import { Link } from 'react-router-dom'
export function UnauthorizedPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center text-center px-6">
      <div>
        <p className="text-8xl font-black text-gray-200 mb-4">401</p>
        <h2 className="text-navy-900 mb-2">Unauthorized</h2>
        <p className="text-slate-400 text-sm mb-8">You don't have permission to view this page.</p>
        <Link to="/login" className="btn-primary">Sign in</Link>
      </div>
    </div>
  )
}
