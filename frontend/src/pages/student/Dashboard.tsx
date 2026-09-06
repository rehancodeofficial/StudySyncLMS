import { useEffect, useState } from 'react'
import { Calendar, Clock, Trophy, MoreHorizontal, FileText, ChevronRight, BookOpen, Star, CheckCircle, Clock3 } from 'lucide-react'
import { Link } from 'react-router-dom'
import api from '@/api/client'
import { useAuth } from '@/hooks/useAuth'

// Mock Data for UI enhancements
const MOCK_SUBMISSIONS = [
  { id: 1, title: 'Database Schema Design', course: 'Database Systems', date: '2026-09-10', status: 'Pending', color: 'text-amber-500 bg-amber-50 border-amber-200' },
  { id: 2, title: 'Network Security Audit', course: 'Cybersecurity', date: '2026-09-08', status: 'Graded', color: 'text-emerald-500 bg-emerald-50 border-emerald-200' },
  { id: 3, title: 'React UI Components', course: 'Frontend Dev', date: '2026-09-05', status: 'Graded', color: 'text-emerald-500 bg-emerald-50 border-emerald-200' },
  { id: 4, title: 'Midterm Essay', course: 'Software Eng', date: '2026-09-01', status: 'Late', color: 'text-rose-500 bg-rose-50 border-rose-200' }
]

const MOCK_ACTIVITY = [
  { day: 'Mon', hours: 2.5 },
  { day: 'Tue', hours: 3.8 },
  { day: 'Wed', hours: 1.5 },
  { day: 'Thu', hours: 4.2 },
  { day: 'Fri', hours: 2.0 },
  { day: 'Sat', hours: 5.5 },
  { day: 'Sun', hours: 3.0 },
]

export function StudentDashboard() {
  const { user } = useAuth()
  const [enrollments, setEnrollments] = useState<any[]>([])
  
  useEffect(() => {
    if (user?.id) {
      api.get(`/enrollments/student/${user.id}`)
         .then(res => setEnrollments(res.data))
         .catch(err => console.error(err))
    }
  }, [user])

  const maxHours = Math.max(...MOCK_ACTIVITY.map(a => a.hours))

  return (
    <div className="flex flex-col gap-8 max-w-7xl mx-auto pb-10">
      
      {/* Header & Quick Stats */}
      <div className="flex flex-col gap-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
              Hello, {user?.name || 'Student'} 👋
            </h1>
            <p className="text-slate-500 mt-2 text-sm md:text-base">Let's learn something new today!</p>
          </div>
          <div className="text-sm font-medium text-slate-500 bg-white px-4 py-2 rounded-xl shadow-sm border border-slate-100 flex items-center gap-2">
            <Calendar className="w-4 h-4 text-blue-500" />
            {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
          </div>
        </div>

        {/* KPI Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm flex flex-col hover:shadow-md transition-shadow relative overflow-hidden group">
            <div className="absolute -right-4 -top-4 w-16 h-16 rounded-full bg-blue-50 group-hover:scale-150 transition-transform duration-500 z-0"></div>
            <div className="relative z-10 flex items-center justify-between mb-4">
              <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center">
                <BookOpen className="w-5 h-5" />
              </div>
            </div>
            <h3 className="text-2xl font-bold text-slate-900 relative z-10">{enrollments.length}</h3>
            <p className="text-sm font-medium text-slate-500 relative z-10">Active Courses</p>
          </div>

          <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm flex flex-col hover:shadow-md transition-shadow relative overflow-hidden group">
            <div className="absolute -right-4 -top-4 w-16 h-16 rounded-full bg-amber-50 group-hover:scale-150 transition-transform duration-500 z-0"></div>
            <div className="relative z-10 flex items-center justify-between mb-4">
              <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center">
                <Clock3 className="w-5 h-5" />
              </div>
            </div>
            <h3 className="text-2xl font-bold text-slate-900 relative z-10">3</h3>
            <p className="text-sm font-medium text-slate-500 relative z-10">Pending Assignments</p>
          </div>

          <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm flex flex-col hover:shadow-md transition-shadow relative overflow-hidden group">
            <div className="absolute -right-4 -top-4 w-16 h-16 rounded-full bg-emerald-50 group-hover:scale-150 transition-transform duration-500 z-0"></div>
            <div className="relative z-10 flex items-center justify-between mb-4">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center">
                <CheckCircle className="w-5 h-5" />
              </div>
            </div>
            <h3 className="text-2xl font-bold text-slate-900 relative z-10">12</h3>
            <p className="text-sm font-medium text-slate-500 relative z-10">Completed Modules</p>
          </div>

          <div className="bg-linear-to-br from-blue-600 to-indigo-700 rounded-2xl p-5 border border-indigo-500 shadow-sm flex flex-col hover:shadow-md transition-shadow relative overflow-hidden group text-white">
             <div className="absolute right-0 top-0 w-32 h-32 rounded-full bg-white/10 blur-xl group-hover:scale-125 transition-transform duration-500 z-0"></div>
            <div className="relative z-10 flex items-center justify-between mb-4">
              <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center backdrop-blur-md">
                <Star className="w-5 h-5" />
              </div>
            </div>
            <h3 className="text-2xl font-bold relative z-10">A-</h3>
            <p className="text-sm font-medium text-blue-100 relative z-10">Overall Grade</p>
          </div>
        </div>
      </div>

      {/* Main Grid */}
      <div className="flex flex-col lg:flex-row gap-8">
        
        {/* Left Column (Courses & Submissions) */}
        <div className="flex-1 flex flex-col gap-8">
          
          {/* Active Courses */}
          <div className="bg-white rounded-3xl p-6 md:p-8 border border-slate-100 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold text-slate-900">Continue Learning</h2>
              <Link to="/student/courses" className="text-sm font-medium text-blue-600 hover:text-blue-700 flex items-center gap-1">
                View All <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {enrollments.length === 0 ? (
                <div className="col-span-2 text-center text-slate-500 py-10 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
                  You are not currently enrolled in any courses.
                </div>
              ) : (
                enrollments.map((enrollment) => (
                  <div key={enrollment.id} className="bg-slate-50 rounded-2xl p-5 border border-slate-100 hover:border-blue-200 hover:bg-blue-50/50 transition-colors group cursor-pointer relative overflow-hidden">
                    <div className="flex gap-4 items-start mb-6">
                      <div className="w-12 h-12 rounded-xl bg-linear-to-br from-blue-500 to-indigo-600 flex items-center justify-center shrink-0 shadow-sm shadow-blue-500/20">
                        <span className="text-white font-bold text-lg">{enrollment.course.title.charAt(0)}</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-base font-bold text-slate-900 truncate">{enrollment.course.title}</h3>
                        <p className="text-sm text-slate-500 truncate mt-0.5">{enrollment.course.code}</p>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between text-xs font-medium">
                        <span className="text-slate-500">Progress</span>
                        <span className="text-blue-700">{enrollment.progress || 0}%</span>
                      </div>
                      <div className="h-2 w-full bg-slate-200 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-blue-600 rounded-full transition-all duration-1000 ease-out" 
                          style={{ width: `${enrollment.progress || 0}%` }}
                        />
                      </div>
                    </div>

                    <Link to={`/student/courses/${enrollment.course.id}`} className="absolute inset-0 z-10">
                      <span className="sr-only">View Course</span>
                    </Link>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Recent Submissions Table */}
          <div className="bg-white rounded-3xl p-6 md:p-8 border border-slate-100 shadow-sm">
             <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold text-slate-900">Recent Assignments</h2>
              <button className="text-slate-400 hover:text-slate-600"><MoreHorizontal className="w-5 h-5" /></button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="text-xs text-slate-500 uppercase bg-slate-50 border-b border-slate-100">
                  <tr>
                    <th className="px-4 py-3 font-semibold rounded-tl-xl">Assignment Name</th>
                    <th className="px-4 py-3 font-semibold">Course</th>
                    <th className="px-4 py-3 font-semibold">Due Date</th>
                    <th className="px-4 py-3 font-semibold rounded-tr-xl">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {MOCK_SUBMISSIONS.map((sub, idx) => (
                    <tr key={sub.id} className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors">
                      <td className="px-4 py-4 font-medium text-slate-900">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                            <FileText className="w-4 h-4" />
                          </div>
                          {sub.title}
                        </div>
                      </td>
                      <td className="px-4 py-4 text-slate-600">{sub.course}</td>
                      <td className="px-4 py-4 text-slate-600">{sub.date}</td>
                      <td className="px-4 py-4">
                        <span className={`px-2.5 py-1 text-[11px] uppercase tracking-wider font-bold rounded-md border ${sub.color}`}>
                          {sub.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>

        {/* Right Column (Sidebar) */}
        <div className="lg:w-85 shrink-0 flex flex-col gap-8">
          
          {/* Study Activity Chart (CSS Mock) */}
          <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-bold text-slate-900">Study Activity</h3>
              <span className="text-xs font-medium text-slate-500 bg-slate-50 px-2 py-1 rounded-md">This Week</span>
            </div>

            <div className="flex items-end justify-between h-32 gap-2 mt-4">
              {MOCK_ACTIVITY.map((data, idx) => (
                <div key={data.day} className="flex flex-col items-center gap-2 flex-1 group">
                  <div className="w-full bg-blue-50 rounded-md relative flex items-end overflow-hidden" style={{ height: '100px' }}>
                    <div 
                      className="w-full bg-blue-500 rounded-md transition-all duration-700 ease-out group-hover:bg-blue-600"
                      style={{ height: `${(data.hours / maxHours) * 100}%` }}
                    ></div>
                  </div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase">{data.day}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Urgent Deadline Alert */}
          <div className="bg-navy-950 rounded-3xl p-6 text-white shadow-xl shadow-navy-900/10 relative overflow-hidden">
            <div className="absolute top-0 right-0 -mr-12 -mt-12 w-40 h-40 bg-rose-500 rounded-full blur-3xl opacity-30"></div>
            <div className="absolute bottom-0 left-0 -ml-12 -mb-12 w-40 h-40 bg-blue-500 rounded-full blur-3xl opacity-30"></div>
            
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-4">
                <span className="px-2 py-1 bg-rose-500/20 text-rose-300 border border-rose-500/30 rounded-md text-[10px] font-bold uppercase tracking-wider">
                  Due Soon
                </span>
              </div>
              <h3 className="text-lg font-bold leading-tight mb-2">Database Schema Design Project</h3>
              <p className="text-slate-400 text-sm mb-6">Database Systems</p>
              
              <div className="flex gap-3 mb-6">
                <div className="bg-white/10 rounded-xl p-2.5 flex-1 backdrop-blur-md border border-white/10 text-center">
                  <span className="block text-xl font-bold">02</span>
                  <span className="text-[9px] uppercase tracking-wider text-slate-400">Days</span>
                </div>
                <div className="bg-white/10 rounded-xl p-2.5 flex-1 backdrop-blur-md border border-white/10 text-center">
                  <span className="block text-xl font-bold">14</span>
                  <span className="text-[9px] uppercase tracking-wider text-slate-400">Hours</span>
                </div>
              </div>
              
              <button className="w-full py-2.5 bg-white text-navy-950 hover:bg-blue-50 transition-colors rounded-xl text-sm font-bold shadow-md">
                Start Assignment
              </button>
            </div>
          </div>

          {/* Schedule */}
          <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-bold text-slate-900">Upcoming Classes</h3>
              <button className="text-blue-600 hover:bg-blue-50 p-1.5 rounded-lg transition-colors"><MoreHorizontal className="w-5 h-5" /></button>
            </div>
            
            <div className="flex flex-col gap-5">
              <div className="flex gap-4 items-start">
                <div className="w-12 h-12 flex flex-col items-center justify-center rounded-xl bg-blue-50 text-blue-600 shrink-0">
                  <span className="text-xs font-bold uppercase">Today</span>
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-900">Database Systems Lab</p>
                  <div className="flex items-center gap-1.5 mt-1">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    <span className="text-xs font-medium text-slate-500">10:00 AM - 12:00 PM</span>
                  </div>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="w-12 h-12 flex flex-col items-center justify-center rounded-xl bg-slate-50 text-slate-600 border border-slate-100 shrink-0">
                  <span className="text-xs font-bold uppercase">Tmw</span>
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-900">Software Engineering</p>
                  <div className="flex items-center gap-1.5 mt-1">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    <span className="text-xs font-medium text-slate-500">02:00 PM - 03:30 PM</span>
                  </div>
                </div>
              </div>
            </div>
            
            <button className="w-full mt-6 py-2.5 text-sm font-bold text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded-xl transition-colors border border-slate-200">
              View Full Schedule
            </button>
          </div>

        </div>
      </div>
    </div>
  )
}
