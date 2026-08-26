import { Link } from 'react-router-dom'
import { GraduationCap } from 'lucide-react'

export function ForgotPasswordPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-8">
      <div className="w-full max-w-sm card p-8">
        <div className="flex items-center gap-2 mb-6">
          <div className="w-8 h-8 bg-blue-650 rounded-lg flex items-center justify-center">
            <GraduationCap className="w-5 h-5 text-white" />
          </div>
          <span className="font-bold text-navy-900">StudySync</span>
        </div>
        <h2 className="mb-1">Reset password</h2>
        <p className="text-slate-400 text-sm mb-6">Enter your email and we'll send you a reset link.</p>
        <div className="flex flex-col gap-4">
          <div>
            <label className="label">Email address</label>
            <input type="email" className="input" placeholder="name@university.edu" />
          </div>
          <button className="btn-primary w-full">Send Reset Link</button>
        </div>
        <p className="text-center text-xs text-slate-400 mt-4">
          <Link to="/login" className="text-blue-650 hover:underline">← Back to sign in</Link>
        </p>
      </div>
    </div>
  )
}
