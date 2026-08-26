import { useState } from 'react'
import { Calendar as CalendarIcon, Filter, Plus, Printer, Download, Clock } from 'lucide-react'

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']
const TIMESLOTS = ['08:00 AM', '09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM']

const MOCK_SCHEDULE = [
  { day: 'Monday', time: '09:00 AM', duration: 2, course: 'CS-401 Database Systems', type: 'Lecture', room: 'Hall A', faculty: 'Dr. Maria Chen', color: 'bg-blue-50 border-blue-200 text-blue-700' },
  { day: 'Monday', time: '11:00 AM', duration: 1, course: 'CS-403 Computer Networks', type: 'Tutorial', room: 'Room 204', faculty: 'Dr. Ahmed Siddiqui', color: 'bg-green-50 border-green-200 text-green-700' },
  { day: 'Tuesday', time: '10:00 AM', duration: 2, course: 'MATH-301 Discrete Math', type: 'Lecture', room: 'Hall B', faculty: 'Dr. Lena Schmidt', color: 'bg-purple-50 border-purple-200 text-purple-700' },
  { day: 'Wednesday', time: '09:00 AM', duration: 3, course: 'CS-402 Software Eng.', type: 'Lab', room: 'Lab 1', faculty: 'Prof. David Kim', color: 'bg-amber-50 border-amber-200 text-amber-700' },
  { day: 'Thursday', time: '02:00 PM', duration: 2, course: 'CS-404 AI', type: 'Lecture', room: 'Hall A', faculty: 'Prof. James Wilson', color: 'bg-pink-50 border-pink-200 text-pink-700' },
]

export function TimetablePage() {
  const [program, setProgram] = useState('BSc Computer Science')
  const [semester, setSemester] = useState('Semester 6')

  const getSlot = (day: string, time: string) => {
    return MOCK_SCHEDULE.find(s => s.day === day && s.time === time)
  }

  // Check if a cell is spanned by an earlier event
  const isSpanned = (day: string, timeIdx: number) => {
    for (let i = 1; i <= 3; i++) {
      if (timeIdx - i < 0) continue
      const prevSlot = getSlot(day, TIMESLOTS[timeIdx - i])
      if (prevSlot && prevSlot.duration > i) return true
    }
    return false
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="page-title">Master Timetable</h1>
          <p className="page-subtitle">Schedule and view classes across all departments</p>
        </div>
        <div className="flex gap-2">
          <button className="btn-secondary btn-sm"><Printer className="w-3.5 h-3.5" /> Print</button>
          <button className="btn-secondary btn-sm"><Download className="w-3.5 h-3.5" /> Export PDF</button>
          <button className="btn-primary btn-sm"><Plus className="w-3.5 h-3.5" /> Add Class</button>
        </div>
      </div>

      <div className="card p-4 flex flex-col sm:flex-row gap-3">
        <select className="select text-xs h-9 flex-1 sm:max-w-50" value={program} onChange={e => setProgram(e.target.value)}>
          <option>BSc Computer Science</option>
          <option>BBA Business Admin</option>
          <option>BEng Mechanical</option>
        </select>
        <select className="select text-xs h-9 flex-1 sm:max-w-37.5" value={semester} onChange={e => setSemester(e.target.value)}>
          <option>Semester 1</option>
          <option>Semester 2</option>
          <option>Semester 3</option>
          <option>Semester 4</option>
          <option>Semester 5</option>
          <option>Semester 6</option>
        </select>
        <div className="flex items-center gap-2 ml-auto text-xs text-slate-500 font-medium">
          <Clock className="w-4 h-4" /> Fall 2026 Term
        </div>
      </div>

      <div className="card overflow-x-auto">
        <div className="min-w-200">
          <div className="grid grid-cols-[100px_repeat(5,1fr)] border-b border-slate-200 bg-slate-50">
            <div className="p-3 border-r border-slate-200 text-center font-semibold text-xs text-slate-500 uppercase tracking-wider">Time</div>
            {DAYS.map(day => (
              <div key={day} className="p-3 border-r border-slate-200 text-center font-semibold text-xs text-slate-700 uppercase tracking-wider">{day}</div>
            ))}
          </div>

          <div className="flex flex-col">
            {TIMESLOTS.map((time, timeIdx) => (
              <div key={time} className="grid grid-cols-[100px_repeat(5,1fr)] border-b border-slate-100">
                <div className="p-3 border-r border-slate-100 flex items-center justify-center text-xs font-medium text-slate-500 bg-slate-50/50">
                  {time}
                </div>
                {DAYS.map(day => {
                  if (isSpanned(day, timeIdx)) return null // Render nothing, let grid span handle it
                  
                  const slot = getSlot(day, time)
                  if (!slot) return <div key={day} className="p-2 border-r border-slate-100 min-h-20" />

                  return (
                    <div
                      key={day}
                      className="p-1 border-r border-slate-100 relative"
                      style={{ gridRow: `span ${slot.duration}` }}
                    >
                      <div className={`h-full w-full rounded-lg border p-2 flex flex-col gap-1 cursor-pointer transition-shadow hover:shadow-md ${slot.color}`}>
                        <div className="flex justify-between items-start">
                          <span className="text-[10px] font-bold uppercase tracking-wide opacity-80">{slot.type}</span>
                          <span className="text-[10px] font-semibold opacity-90">{slot.room}</span>
                        </div>
                        <p className="text-xs font-bold leading-tight">{slot.course}</p>
                        <p className="text-[10px] mt-auto font-medium opacity-90">{slot.faculty}</p>
                      </div>
                    </div>
                  )
                })}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
