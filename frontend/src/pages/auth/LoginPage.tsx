import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Eye, EyeOff, GraduationCap, Loader2 } from 'lucide-react'
import { useAuth } from '@/hooks/useAuth'
import { roleRedirects } from '@/utils/auth'

const schema = z.object({
  email: z.string().email('Enter a valid email'),
  password: z.string().min(6, 'Password is at least 6 characters'),
  remember: z.boolean().optional(),
})
type FormData = z.infer<typeof schema>

const DEMO_ACCOUNTS = [
  { label: 'Admin', email: 'admin@studysync.com', password: 'password123', role: 'ROLE_ADMIN' },
  { label: 'Teacher', email: 'instructor@studysync.com', password: 'password123', role: 'ROLE_INSTRUCTOR' },
  { label: 'Student', email: 'student@studysync.com', password: 'password123', role: 'ROLE_STUDENT' },
]

export function LoginPage() {
  const navigate = useNavigate()
  const { login } = useAuth()
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const { register, handleSubmit, setValue, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
  })

  const fillDemo = (email: string, password: string) => {
    setValue('email', email)
    setValue('password', password)
  }

  const onSubmit = async (data: FormData) => {
    setLoading(true)
    setError('')
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: data.email, password: data.password })
      })

      if (!response.ok) {
        setError('Invalid email or password.')
        return
      }

      const resData = await response.json()
      
      const loggedInUser = {
        id: resData.id,
        email: resData.email,
        name: resData.name,
        role: resData.roles[0], // Extract primary role
        institutionId: 'inst_1',
      }
      
      login(resData.token, loggedInUser) // Pass token and user directly
      navigate(roleRedirects[loggedInUser.role as keyof typeof roleRedirects] || '/')
    } catch (e) {
      setError('An error occurred. Please check if the backend is running.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Left branding panel */}
      <div className="hidden lg:flex lg:w-1/2 bg-navy-950 flex-col justify-between p-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-br from-navy-950 via-blue-650/20 to-navy-950" />
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-16">
            <div className="w-10 h-10 bg-blue-650 rounded-xl flex items-center justify-center">
              <img src="/logo.png" alt="StudySync Logo" className="w-8 h-8 object-contain" />
            </div>
            <span className="text-white font-bold text-xl">StudySync</span>
          </div>
          <h1 className="text-white text-4xl font-bold leading-tight mb-4">
            Smart University Management Platform
          </h1>
          <p className="text-blue-100/70 text-lg leading-relaxed">
            Streamline academic operations, empower faculty, and deliver exceptional learning experiences.
          </p>
        </div>
        <div className="relative z-10 grid grid-cols-2 gap-4">
          {[
            { n: '12,000+', label: 'Students Managed' },
            { n: '850+', label: 'Faculty Members' },
            { n: '200+', label: 'Courses Available' },
            { n: '98%', label: 'Satisfaction Rate' },
          ].map(stat => (
            <div key={stat.label} className="bg-white/5 rounded-xl p-4 border border-white/10">
              <p className="text-white font-bold text-2xl">{stat.n}</p>
              <p className="text-blue-100/60 text-sm mt-0.5">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Right login panel */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-sm">
          <div className="lg:hidden flex items-center gap-2 mb-8">
            <div className="w-8 h-8 bg-blue-650 rounded-lg flex items-center justify-center">
              <GraduationCap className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-navy-900 text-lg">StudySync</span>
          </div>

          <h2 className="text-navy-900 mb-1">Welcome back</h2>
          <p className="text-slate-400 text-sm mb-8">Sign in to your account to continue.</p>

          {/* Demo accounts */}
          <div className="mb-6 p-4 bg-blue-50 border border-blue-100 rounded-xl">
            <p className="text-xs font-semibold text-blue-650 mb-3">Quick Demo Access</p>
            <div className="flex gap-2 flex-wrap">
              {DEMO_ACCOUNTS.map(a => (
                <button
                  key={a.role}
                  onClick={() => fillDemo(a.email, a.password)}
                  className="text-xs px-3 py-1.5 bg-white border border-blue-200 text-blue-650 rounded-full hover:bg-blue-650 hover:text-white transition-colors"
                >
                  {a.label}
                </button>
              ))}
            </div>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
            <div>
              <label className="label">Email address</label>
              <input {...register('email')} type="email" className={`input ${errors.email ? 'input-error' : ''}`} placeholder="name@university.edu" />
              {errors.email && <p className="error-msg">{errors.email.message}</p>}
            </div>
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="label mb-0!">Password</label>
                <Link to="/forgot-password" className="text-xs text-blue-650 hover:underline">Forgot?</Link>
              </div>
              <div className="relative">
                <input
                  {...register('password')}
                  type={showPassword ? 'text' : 'password'}
                  className={`input pr-10 ${errors.password ? 'input-error' : ''}`}
                  placeholder="••••••••"
                />
                <button type="button" onClick={() => setShowPassword(s => !s)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {errors.password && <p className="error-msg">{errors.password.message}</p>}
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-error text-xs rounded-btn px-3 py-2">
                {error}
              </div>
            )}

            <button type="submit" disabled={loading} className="btn-primary w-full py-2.5 mt-1">
              {loading && <Loader2 className="w-4 h-4 animate-spin" />}
              Sign in
            </button>
          </form>

          <p className="text-center text-xs text-slate-400 mt-6">
            Don't have an account?{' '}
            <Link to="/register" className="text-blue-650 hover:underline font-medium">Register</Link>
          </p>
        </div>
      </div>
    </div>
  )
}
