import { Calendar, PlayCircle, Clock, CheckCircle2, Trophy, MoreHorizontal, ChevronRight, FileText, Lock } from 'lucide-react'
import { Link } from 'react-router-dom'

const LEARNING_PATH = [
  { 
    id: '1', title: 'Foundations of Database Systems', duration: '2h 15m', status: 'COMPLETED', progress: 100,
    modules: [
      { id: 'm1', title: 'Introduction to Relational Algebra', type: 'video', duration: '45m', completed: true },
      { id: 'm2', title: 'Entity-Relationship Modeling', type: 'reading', duration: '30m', completed: true },
      { id: 'm3', title: 'Module 1 Quiz', type: 'quiz', duration: '1h', completed: true },
    ]
  },
  { 
    id: '2', title: 'Advanced SQL Queries', duration: '3h 45m', status: 'IN_PROGRESS', progress: 45,
    modules: [
      { id: 'm4', title: 'Joins and Subqueries', type: 'video', duration: '1h 15m', completed: true },
      { id: 'm5', title: 'Window Functions', type: 'video', duration: '1h', completed: false, current: true },
      { id: 'm6', title: 'Practice Exercises', type: 'assignment', duration: '1h 30m', completed: false },
    ]
  },
  { 
    id: '3', title: 'Database Optimization & Indexing', duration: '4h', status: 'LOCKED', progress: 0,
    modules: [
      { id: 'm7', title: 'B-Tree Indexes', type: 'video', duration: '1h 30m', completed: false },
      { id: 'm8', title: 'Query Execution Plans', type: 'reading', duration: '45m', completed: false },
      { id: 'm9', title: 'Final Assessment', type: 'exam', duration: '1.5h', completed: false },
    ]
  },
]

export function StudentDashboard() {
  return (
    <div className="flex flex-col lg:flex-row gap-8 max-w-7xl mx-auto">
      {/* Left Column - Learning Path */}
      <div className="flex-1 flex flex-col gap-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Your Learning Path</h1>
            <p className="text-slate-500 mt-1">CS-401 Database Systems</p>
          </div>
          <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-xl border border-slate-200 shadow-sm">
            <Trophy className="w-4 h-4 text-amber-500" />
            <span className="text-sm font-bold text-slate-800">Rank: Top 10%</span>
          </div>
        </div>

        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-8">
          <div className="flex items-center justify-between mb-8 pb-8 border-b border-slate-100">
            <div>
              <h2 className="text-lg font-bold text-slate-900">Course Progress</h2>
              <p className="text-sm text-slate-500 mt-1">You're doing great! Keep it up.</p>
            </div>
            <div className="text-right">
              <span className="text-3xl font-extrabold text-blue-600">45%</span>
              <p className="text-xs font-medium text-slate-400 mt-1 uppercase tracking-wider">Completed</p>
            </div>
          </div>

          <div className="relative">
            {/* Vertical timeline line */}
            <div className="absolute left-6 top-10 bottom-10 w-0.5 bg-slate-100"></div>

            <div className="flex flex-col gap-10">
              {LEARNING_PATH.map((section, idx) => (
                <div key={section.id} className="relative z-10 flex gap-6">
                  {/* Status Node */}
                  <div className="shrink-0 mt-1">
                    {section.status === 'COMPLETED' ? (
                      <div className="w-12 h-12 rounded-full bg-green-50 border-2 border-green-500 flex items-center justify-center text-green-600 shadow-[0_0_0_8px_white]">
                        <CheckCircle2 className="w-6 h-6" />
                      </div>
                    ) : section.status === 'IN_PROGRESS' ? (
                      <div className="w-12 h-12 rounded-full bg-blue-50 border-2 border-blue-600 flex items-center justify-center text-blue-600 shadow-[0_0_0_8px_white] relative">
                        <div className="absolute inset-0 rounded-full border-t-2 border-blue-400 animate-spin"></div>
                        <PlayCircle className="w-5 h-5 fill-current" />
                      </div>
                    ) : (
                      <div className="w-12 h-12 rounded-full bg-slate-50 border-2 border-slate-200 flex items-center justify-center text-slate-400 shadow-[0_0_0_8px_white]">
                        <Lock className="w-5 h-5" />
                      </div>
                    )}
                  </div>

                  {/* Section Content */}
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className={`text-lg font-bold ${section.status === 'LOCKED' ? 'text-slate-400' : 'text-slate-900'}`}>{section.title}</h3>
                        <div className="flex items-center gap-3 mt-2">
                          <span className="flex items-center gap-1.5 text-xs font-medium text-slate-500">
                            <Clock className="w-3.5 h-3.5" /> {section.duration}
                          </span>
                          <span className="w-1 h-1 rounded-full bg-slate-300"></span>
                          <span className="text-xs font-medium text-slate-500">{section.modules.length} Modules</span>
                        </div>
                      </div>
                      {section.status === 'IN_PROGRESS' && (
                        <button className="btn-primary btn-sm rounded-full shadow-md shadow-blue-600/20">Resume</button>
                      )}
                    </div>

                    {/* Modules List */}
                    <div className="bg-slate-50 rounded-2xl p-2 border border-slate-100 flex flex-col gap-1">
                      {section.modules.map(mod => (
                        <div key={mod.id} className={`flex items-center justify-between p-3 rounded-xl transition-colors ${mod.current ? 'bg-white shadow-sm border border-slate-200' : 'hover:bg-slate-100/50 border border-transparent'}`}>
                          <div className="flex items-center gap-4">
                            <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${mod.completed ? 'bg-green-100 text-green-600' : mod.current ? 'bg-blue-100 text-blue-600' : 'bg-slate-200 text-slate-400'}`}>
                              {mod.type === 'video' ? <PlayCircle className="w-4 h-4" /> : <FileText className="w-4 h-4" />}
                            </div>
                            <div>
                              <p className={`text-sm font-semibold ${mod.completed || mod.current ? 'text-slate-800' : 'text-slate-500'}`}>{mod.title}</p>
                              <p className="text-[10px] text-slate-400 font-medium uppercase tracking-wider mt-0.5">{mod.type} • {mod.duration}</p>
                            </div>
                          </div>
                          {mod.completed && <CheckCircle2 className="w-5 h-5 text-green-500" />}
                          {mod.current && <span className="text-xs font-bold text-blue-600 px-3 py-1 bg-blue-50 rounded-full">Current</span>}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Right Column - Sidebar Widgets */}
      <div className="lg:w-[320px] shrink-0 flex flex-col gap-6">
        <div className="bg-slate-900 rounded-3xl p-6 text-white shadow-xl shadow-slate-900/10 relative overflow-hidden">
          <div className="absolute top-0 right-0 -mr-8 -mt-8 w-32 h-32 bg-blue-500 rounded-full blur-2xl opacity-50"></div>
          <div className="relative z-10">
            <h3 className="text-lg font-bold mb-1">Upcoming Deadline</h3>
            <p className="text-slate-400 text-sm mb-6">Database Schema Design Project</p>
            
            <div className="flex gap-4 mb-6">
              <div className="bg-white/10 rounded-xl p-3 flex-1 backdrop-blur-sm border border-white/10 text-center">
                <span className="block text-2xl font-bold">02</span>
                <span className="text-[10px] uppercase tracking-wider text-slate-400">Days</span>
              </div>
              <div className="bg-white/10 rounded-xl p-3 flex-1 backdrop-blur-sm border border-white/10 text-center">
                <span className="block text-2xl font-bold">14</span>
                <span className="text-[10px] uppercase tracking-wider text-slate-400">Hours</span>
              </div>
            </div>
            
            <button className="w-full py-3 bg-blue-600 hover:bg-blue-500 transition-colors rounded-xl text-sm font-bold shadow-lg shadow-blue-600/30">
              Submit Assignment
            </button>
          </div>
        </div>

        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-bold text-slate-900">Your Schedule</h3>
            <button className="text-blue-600 hover:bg-blue-50 p-1.5 rounded-lg transition-colors"><MoreHorizontal className="w-5 h-5" /></button>
          </div>
          
          <div className="flex flex-col gap-4">
            <div className="flex gap-4">
              <div className="w-12 flex flex-col items-center justify-center border border-slate-100 rounded-xl bg-slate-50 shrink-0">
                <span className="text-xs font-bold text-blue-600">AUG</span>
                <span className="text-lg font-extrabold text-slate-800">30</span>
              </div>
              <div>
                <p className="text-sm font-bold text-slate-800">Database Systems Lab</p>
                <div className="flex items-center gap-2 mt-1">
                  <Clock className="w-3.5 h-3.5 text-slate-400" />
                  <span className="text-xs text-slate-500">10:00 AM - 12:00 PM</span>
                </div>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-12 flex flex-col items-center justify-center border border-slate-100 rounded-xl bg-slate-50 shrink-0">
                <span className="text-xs font-bold text-slate-500">AUG</span>
                <span className="text-lg font-extrabold text-slate-800">31</span>
              </div>
              <div>
                <p className="text-sm font-bold text-slate-800">Software Engineering</p>
                <div className="flex items-center gap-2 mt-1">
                  <Clock className="w-3.5 h-3.5 text-slate-400" />
                  <span className="text-xs text-slate-500">02:00 PM - 03:30 PM</span>
                </div>
              </div>
            </div>
          </div>
          
          <button className="w-full mt-6 py-2.5 text-sm font-bold text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded-xl transition-colors border border-slate-200">
            View Full Calendar
          </button>
        </div>
      </div>
    </div>
  )
}
