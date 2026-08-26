import { Link } from 'react-router-dom'
export function NotFoundPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center text-center px-6">
      <div>
        <p className="text-8xl font-black text-gray-200 mb-4">404</p>
        <h2 className="text-navy-900 mb-2">Page not found</h2>
        <p className="text-slate-400 text-sm mb-8">The page you're looking for doesn't exist or has been moved.</p>
        <Link to="/" className="btn-primary">Go home</Link>
      </div>
    </div>
  )
}
