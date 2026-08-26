import { Calendar, Users, FileText, CheckCircle2, Clock, PlayCircle, MoreHorizontal, MessageSquare, AlertCircle } from 'lucide-react'
import { Link } from 'react-router-dom'

const SCHEDULE = [
  { id: '1', course: 'CS-401 Database Systems', time: '09:00 AM - 10:30 AM', room: 'Lab 3', type: 'Lecture' },
  { id: '2', course: 'CS-402 Software Engineering', time: '11:00 AM - 12:30 PM', room: 'Room 204', type: 'Lecture' },
  { id: '3', course: 'Office Hours', time: '02:00 PM - 04:00 PM', room: 'Faculty Block 4A', type: 'Meeting' },
]

const TASKS = [
  { id: '1', title: 'Grade Database Midterms', course: 'CS-401', deadline: 'Today, 5:00 PM', count: 45, priority: 'high' },
  { id: '2', title: 'Review Final Project Proposals', course: 'CS-402', deadline: 'Tomorrow, 12:00 PM', count: 12, priority: 'medium' },
  { id: '3', title: 'Upload Week 6 Lecture Slides', course: 'CS-401', deadline: 'Monday, 9:00 AM', count: 1, priority: 'low' },
]

export function TeacherDashboard() {
  return (
    <div className="flex flex-col lg:flex-row gap-8 max-w-[1600px] mx-auto">
      {/* Main Content Area */}
      <div className="flex-1 flex flex-col gap-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Good morning, Professor Carter!</h1>
            <p className="text-slate-500 mt-1">You have 2 classes and 3 pending tasks today.</p>
          </div>
          <button className="btn-primary btn-sm rounded-xl shadow-sm shadow-blue-600/20">
            <PlusIcon className="w-4 h-4 mr-1.5" /> Quick Action
          </button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-linear-to-br from-blue-600 to-indigo-700 rounded-3xl p-6 text-white shadow-xl shadow-blue-900/10 relative overflow-hidden">
            <div className="absolute top-0 right-0 -mr-8 -mt-8 w-32 h-32 bg-white rounded-full blur-2xl opacity-20"></div>
            <div className="relative z-10 flex flex-col h-full justify-between">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-sm border border-white/20 flex items-center justify-center">
                  <Users className="w-5 h-5" />
                </div>
                <p className="font-semibold text-blue-100">Total Students</p>
              </div>
              <div>
                <p className="text-4xl font-extrabold tracking-tight">284</p>
                <p className="text-sm text-blue-200 mt-1">Across 3 active courses</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm flex flex-col justify-between">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-green-50 border border-green-100 text-green-600 flex items-center justify-center">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <p className="font-semibold text-slate-600">Avg. Attendance</p>
            </div>
            <div>
              <p className="text-4xl font-extrabold tracking-tight text-slate-900">94.2%</p>
              <p className="text-sm text-green-600 font-medium mt-1">↑ 2.1% from last week</p>
            </div>
          </div>
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm flex flex-col justify-between">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-100 text-amber-600 flex items-center justify-center">
                <FileText className="w-5 h-5" />
              </div>
              <p className="font-semibold text-slate-600">Ungraded Items</p>
            </div>
            <div>
              <p className="text-4xl font-extrabold tracking-tight text-slate-900">57</p>
              <p className="text-sm text-amber-600 font-medium mt-1">Needs your attention</p>
            </div>
          </div>
        </div>

        {/* Schedule Section */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 lg:p-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-lg font-bold text-slate-900">Today's Schedule</h2>
            <Link to="/teacher/courses" className="text-sm font-semibold text-blue-600 hover:text-blue-700">View Weekly Timetable</Link>
          </div>
          
          <div className="flex flex-col gap-4">
            {SCHEDULE.map(item => (
              <div key={item.id} className="flex flex-col md:flex-row md:items-center gap-4 p-4 rounded-2xl border border-slate-100 hover:border-blue-100 hover:bg-blue-50/30 transition-colors group">
                <div className="flex items-center gap-4 min-w-50">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center shadow-sm ${item.type === 'Lecture' ? 'bg-blue-600 text-white shadow-blue-600/30' : 'bg-slate-100 text-slate-600'}`}>
                    {item.type === 'Lecture' ? <PlayCircle className="w-5 h-5" /> : <Users className="w-5 h-5" />}
                  </div>
                  <div>
                    <p className="font-bold text-slate-900 group-hover:text-blue-700 transition-colors">{item.time}</p>
                    <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mt-0.5">{item.type}</p>
                  </div>
                </div>
                
                <div className="flex-1 md:border-l md:border-slate-100 md:pl-6">
                  <p className="font-bold text-slate-800">{item.course}</p>
                  <p className="text-sm text-slate-500 flex items-center gap-1.5 mt-1">
                    <Clock className="w-3.5 h-3.5" /> {item.room}
                  </p>
                </div>
                
                <div className="flex gap-2">
                  <button className="btn-secondary bg-white text-xs py-2 shadow-sm rounded-xl hidden md:block">Take Attendance</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Column - Sidebar Widgets */}
      <div className="lg:w-90 shrink-0 flex flex-col gap-6">
        
        {/* Task Manager Widget */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-bold text-slate-900">Task Manager</h3>
            <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs font-bold">3</span>
          </div>
          
          <div className="flex flex-col gap-4">
            {TASKS.map(task => (
              <div key={task.id} className="relative pl-4">
                <div className={`absolute left-0 top-1.5 bottom-1.5 w-1 rounded-full ${task.priority === 'high' ? 'bg-red-500' : task.priority === 'medium' ? 'bg-amber-500' : 'bg-blue-500'}`}></div>
                <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="text-sm font-bold text-slate-800 leading-tight">{task.title}</h4>
                  </div>
                  <p className="text-xs text-slate-500 mb-3">{task.course}</p>
                  <div className="flex justify-between items-center text-[10px] font-semibold text-slate-500 uppercase tracking-wider">
                    <span className="flex items-center gap-1"><Clock className="w-3 h-3 text-slate-400" /> {task.deadline}</span>
                    <span className="bg-white px-2 py-1 rounded-md border border-slate-200">{task.count} Items</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <button className="w-full mt-6 py-2.5 text-sm font-bold text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded-xl transition-colors border border-slate-200">
            Open Gradebook
          </button>
        </div>

        {/* Quick Communications */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-bold text-slate-900">Recent Messages</h3>
            <button className="text-blue-600 hover:bg-blue-50 p-1.5 rounded-lg transition-colors"><MoreHorizontal className="w-5 h-5" /></button>
          </div>
          
          <div className="flex flex-col gap-4">
            {[1, 2, 3].map(i => (
              <div key={i} className="flex gap-3 items-start group cursor-pointer">
                <div className="w-10 h-10 rounded-full bg-slate-200 shrink-0"></div>
                <div className="flex-1 min-w-0 border-b border-slate-100 pb-4 group-last:border-0 group-last:pb-0">
                  <div className="flex justify-between items-center mb-0.5">
                    <p className="text-sm font-bold text-slate-900 truncate">Student Name {i}</p>
                    <span className="text-[10px] text-slate-400 font-medium">10:42 AM</span>
                  </div>
                  <p className="text-xs text-slate-500 truncate">Question about the upcoming midterm format...</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  )
}

function PlusIcon(props: any) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <line x1="12" y1="5" x2="12" y2="19" />
      <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  )
}
