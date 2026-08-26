import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import {
  ArrowLeft, Edit, Mail, Phone, MapPin, Calendar, GraduationCap,
  BookOpen, ClipboardCheck, CreditCard, FileText, Award, Activity,
  BarChart3, AlertCircle, CheckCircle, Download
} from 'lucide-react'
import { formatDate, formatCurrency } from '@/utils/cn'

const STUDENT = {
  id: '1',
  studentId: 'SS-2024-0001',
  name: 'Fatima Al-Hassan',
  email: 'fatima.alhassan@studysync.edu',
  phone: '+971-50-123-4567',
  department: 'Computer Science',
  program: 'BSc Computer Science',
  semester: 6,
  section: 'A',
  enrollmentDate: '2022-09-01',
  status: 'ACTIVE',
  gpa: 3.82,
  cgpa: 3.75,
  attendancePercentage: 91,
  gender: 'Female',
  dob: '2002-03-15',
  address: 'Villa 12, Al Qusais, Dubai, UAE',
  guardian: 'Hassan Al-Hassan',
  guardianPhone: '+971-50-987-6543',
  nationality: 'UAE',
}

const courses = [
  { id: '1', code: 'CS-401', title: 'Database Systems', credits: 3, grade: 'A', marks: 92, teacher: 'Dr. Maria Chen' },
  { id: '2', code: 'CS-402', title: 'Software Engineering', credits: 3, grade: 'A-', marks: 88, teacher: 'Prof. David Kim' },
  { id: '3', code: 'CS-403', title: 'Computer Networks', credits: 3, grade: 'B+', marks: 85, teacher: 'Dr. Ahmed Siddiqui' },
  { id: '4', code: 'MATH-301', title: 'Discrete Mathematics', credits: 3, grade: 'A', marks: 94, teacher: 'Dr. Lena Schmidt' },
  { id: '5', code: 'CS-404', title: 'Artificial Intelligence', credits: 3, grade: 'A+', marks: 97, teacher: 'Prof. James Wilson' },
]

const attendance = [
  { course: 'CS-401 Database Systems', total: 45, present: 43, absent: 2, percentage: 95.6 },
  { course: 'CS-402 Software Engineering', total: 42, present: 38, absent: 4, percentage: 90.5 },
  { course: 'CS-403 Computer Networks', total: 40, present: 36, absent: 4, percentage: 90.0 },
  { course: 'MATH-301 Discrete Mathematics', total: 38, present: 33, absent: 5, percentage: 86.8 },
  { course: 'CS-404 Artificial Intelligence', total: 44, present: 42, absent: 2, percentage: 95.5 },
]

const invoices = [
  { id: 'INV-001', desc: 'Tuition Fee – Sem 6', amount: 3500, paid: 3500, status: 'PAID', date: '2026-01-15' },
  { id: 'INV-002', desc: 'Library Fee – 2026', amount: 150, paid: 150, status: 'PAID', date: '2026-01-15' },
  { id: 'INV-003', desc: 'Activity Fee – Sem 6', amount: 200, paid: 100, status: 'PARTIAL', date: '2026-01-20' },
]

const assignments = [
  { id: '1', title: 'ER Diagram Design', course: 'CS-401', dueDate: '2026-08-20', submitted: '2026-08-19', marks: 47, total: 50, status: 'GRADED' },
  { id: '2', title: 'Sprint Planning Report', course: 'CS-402', dueDate: '2026-08-25', submitted: '2026-08-24', marks: 38, total: 40, status: 'GRADED' },
  { id: '3', title: 'Network Protocol Analysis', course: 'CS-403', dueDate: '2026-09-01', submitted: null, marks: null, total: 50, status: 'PENDING' },
]

const TABS = ['Overview', 'Courses', 'Attendance', 'Assignments', 'Fees', 'Documents', 'Activity']

export function StudentDetailPage() {
  const { id } = useParams()
  const [tab, setTab] = useState('Overview')

  const gradeColor = (g: string) => {
    if (g.startsWith('A')) return 'badge-green'
    if (g.startsWith('B')) return 'badge-blue'
    if (g.startsWith('C')) return 'badge-yellow'
    return 'badge-red'
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2">
        <Link to="/admin/students" className="btn btn-ghost btn-sm text-slate-500">
          <ArrowLeft className="w-4 h-4" /> Students
        </Link>
        <span className="text-slate-300">/</span>
        <span className="text-sm text-slate-600">{STUDENT.name}</span>
      </div>

      {/* Profile Header */}
      <div className="card">
        <div className="p-6 flex flex-col sm:flex-row gap-6 items-start">
          <div className="avatar w-20 h-20 text-xl shrink-0">
            {STUDENT.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-start gap-3 justify-between">
              <div>
                <h1 className="text-xl font-bold text-slate-800">{STUDENT.name}</h1>
                <p className="text-sm text-slate-500 mt-0.5">{STUDENT.studentId} · {STUDENT.program} · Semester {STUDENT.semester}{STUDENT.section}</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="badge badge-green">{STUDENT.status}</span>
                <Link to={`/admin/students/${id}/edit`} className="btn-secondary btn-sm">
                  <Edit className="w-3.5 h-3.5" /> Edit
                </Link>
              </div>
            </div>
            <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="flex items-center gap-2 text-sm text-slate-600">
                <Mail className="w-4 h-4 text-slate-400" />
                <span className="truncate text-xs">{STUDENT.email}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-600">
                <Phone className="w-4 h-4 text-slate-400" />
                <span className="text-xs">{STUDENT.phone}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-600">
                <MapPin className="w-4 h-4 text-slate-400" />
                <span className="text-xs truncate">{STUDENT.address}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-600">
                <Calendar className="w-4 h-4 text-slate-400" />
                <span className="text-xs">Enrolled {formatDate(STUDENT.enrollmentDate)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* KPI row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 border-t border-slate-100 divide-x divide-slate-100">
          {[
            { label: 'GPA', value: STUDENT.gpa.toFixed(2), icon: '🎯', color: 'text-blue-650' },
            { label: 'CGPA', value: STUDENT.cgpa.toFixed(2), icon: '📊', color: 'text-purple-600' },
            { label: 'Attendance', value: `${STUDENT.attendancePercentage}%`, icon: '✅', color: 'text-green-600' },
            { label: 'Active Courses', value: courses.length, icon: '📚', color: 'text-amber-600' },
          ].map(k => (
            <div key={k.label} className="p-4 text-center">
              <span className="text-lg">{k.icon}</span>
              <p className={`text-xl font-bold mt-1 ${k.color}`}>{k.value}</p>
              <p className="text-xs text-slate-400">{k.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-slate-200 -mb-2">
        <div className="flex gap-0 overflow-x-auto scrollbar-hide">
          {TABS.map(t => (
            <button key={t} onClick={() => setTab(t)} className={`tab-btn ${tab === t ? 'active' : ''}`}>{t}</button>
          ))}
        </div>
      </div>

      {/* Tab: Overview */}
      {tab === 'Overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="lg:col-span-2 flex flex-col gap-4">
            {/* Personal Info */}
            <div className="card">
              <div className="card-header"><h3 className="text-sm font-semibold">Personal Information</h3></div>
              <div className="card-body grid grid-cols-2 gap-4">
                {[
                  { label: 'Full Name', value: STUDENT.name },
                  { label: 'Gender', value: STUDENT.gender },
                  { label: 'Date of Birth', value: formatDate(STUDENT.dob) },
                  { label: 'Nationality', value: STUDENT.nationality },
                  { label: 'Guardian', value: STUDENT.guardian },
                  { label: 'Guardian Phone', value: STUDENT.guardianPhone },
                ].map(f => (
                  <div key={f.label}>
                    <p className="text-xs text-slate-400">{f.label}</p>
                    <p className="text-sm font-medium text-slate-700 mt-0.5">{f.value}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Academic Summary */}
            <div className="card">
              <div className="card-header"><h3 className="text-sm font-semibold">Current Semester Performance</h3></div>
              <div className="table-container">
                <table className="table">
                  <thead>
                    <tr><th>Course</th><th>Teacher</th><th>Credits</th><th>Marks</th><th>Grade</th></tr>
                  </thead>
                  <tbody>
                    {courses.map(c => (
                      <tr key={c.id}>
                        <td>
                          <p className="text-xs font-medium">{c.code}</p>
                          <p className="text-xs text-slate-400">{c.title}</p>
                        </td>
                        <td className="text-xs text-slate-500">{c.teacher}</td>
                        <td className="text-xs">{c.credits} cr</td>
                        <td className="text-xs font-medium">{c.marks}/100</td>
                        <td><span className={`badge ${gradeColor(c.grade)}`}>{c.grade}</span></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Sidebar cards */}
          <div className="flex flex-col gap-4">
            <div className="card">
              <div className="card-header"><h3 className="text-sm font-semibold">Quick Actions</h3></div>
              <div className="card-body flex flex-col gap-2">
                {[
                  { label: 'Download ID Card', icon: <Award className="w-4 h-4" />, action: () => {} },
                  { label: 'Generate Transcript', icon: <FileText className="w-4 h-4" />, action: () => {} },
                  { label: 'Send Email', icon: <Mail className="w-4 h-4" />, action: () => {} },
                  { label: 'View Timetable', icon: <Calendar className="w-4 h-4" />, action: () => {} },
                  { label: 'Enroll in Course', icon: <BookOpen className="w-4 h-4" />, action: () => {} },
                ].map(a => (
                  <button key={a.label} onClick={a.action} className="btn-secondary text-xs justify-start gap-2.5 w-full">
                    <span className="text-slate-500">{a.icon}</span>{a.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="card">
              <div className="card-header"><h3 className="text-sm font-semibold">Fee Summary</h3></div>
              <div className="card-body flex flex-col gap-3">
                {[
                  { label: 'Total Charged', value: formatCurrency(3850) },
                  { label: 'Total Paid', value: formatCurrency(3750), green: true },
                  { label: 'Outstanding', value: formatCurrency(100), red: true },
                ].map(f => (
                  <div key={f.label} className="flex items-center justify-between">
                    <span className="text-xs text-slate-500">{f.label}</span>
                    <span className={`text-xs font-semibold ${f.green ? 'text-green-600' : f.red ? 'text-red-600' : 'text-slate-700'}`}>{f.value}</span>
                  </div>
                ))}
                <Link to={`/admin/students/${id}/fees`} className="btn-primary btn-sm w-full text-center mt-1">Record Payment</Link>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab: Courses */}
      {tab === 'Courses' && (
        <div className="card">
          <div className="card-header">
            <h3 className="text-sm font-semibold">Enrolled Courses — Semester 6</h3>
            <span className="badge badge-blue">{courses.length} courses</span>
          </div>
          <div className="table-container">
            <table className="table">
              <thead><tr><th>Code</th><th>Course</th><th>Credits</th><th>Teacher</th><th>Marks</th><th>Grade</th></tr></thead>
              <tbody>
                {courses.map(c => (
                  <tr key={c.id}>
                    <td className="text-xs font-mono text-blue-650">{c.code}</td>
                    <td className="text-xs font-medium">{c.title}</td>
                    <td className="text-xs">{c.credits}</td>
                    <td className="text-xs text-slate-500">{c.teacher}</td>
                    <td>
                      <div className="flex items-center gap-2">
                        <div className="w-16 h-1.5 bg-slate-200 rounded-full overflow-hidden">
                          <div className="h-full rounded-full bg-blue-500" style={{ width: `${c.marks}%` }} />
                        </div>
                        <span className="text-xs">{c.marks}%</span>
                      </div>
                    </td>
                    <td><span className={`badge ${gradeColor(c.grade)}`}>{c.grade}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab: Attendance */}
      {tab === 'Attendance' && (
        <div className="card">
          <div className="card-header">
            <h3 className="text-sm font-semibold">Attendance by Course</h3>
            <span className="text-xs text-slate-500">Overall: {STUDENT.attendancePercentage}%</span>
          </div>
          <div className="table-container">
            <table className="table">
              <thead><tr><th>Course</th><th>Total Classes</th><th>Present</th><th>Absent</th><th>Percentage</th></tr></thead>
              <tbody>
                {attendance.map((a, i) => (
                  <tr key={i}>
                    <td className="text-xs font-medium">{a.course}</td>
                    <td className="text-xs">{a.total}</td>
                    <td className="text-xs text-green-600 font-medium">{a.present}</td>
                    <td className="text-xs text-red-500">{a.absent}</td>
                    <td>
                      <div className="flex items-center gap-2">
                        <div className="w-20 h-1.5 bg-slate-200 rounded-full overflow-hidden">
                          <div className="h-full rounded-full" style={{ width: `${a.percentage}%`, backgroundColor: a.percentage >= 85 ? '#16A34A' : '#F59E0B' }} />
                        </div>
                        <span className={`text-xs font-medium ${a.percentage >= 85 ? 'text-green-600' : 'text-amber-600'}`}>{a.percentage.toFixed(1)}%</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab: Assignments */}
      {tab === 'Assignments' && (
        <div className="card">
          <div className="card-header"><h3 className="text-sm font-semibold">Assignments</h3></div>
          <div className="table-container">
            <table className="table">
              <thead><tr><th>Title</th><th>Course</th><th>Due Date</th><th>Submitted</th><th>Marks</th><th>Status</th></tr></thead>
              <tbody>
                {assignments.map(a => (
                  <tr key={a.id}>
                    <td className="text-xs font-medium">{a.title}</td>
                    <td className="text-xs text-slate-500">{a.course}</td>
                    <td className="text-xs text-slate-500">{formatDate(a.dueDate)}</td>
                    <td className="text-xs">{a.submitted ? formatDate(a.submitted) : <span className="text-slate-400">—</span>}</td>
                    <td className="text-xs">{a.marks !== null ? `${a.marks}/${a.total}` : '—'}</td>
                    <td>
                      <span className={`badge ${a.status === 'GRADED' ? 'badge-green' : a.status === 'PENDING' ? 'badge-yellow' : 'badge-red'}`}>{a.status}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab: Fees */}
      {tab === 'Fees' && (
        <div className="flex flex-col gap-4">
          <div className="card">
            <div className="card-header">
              <h3 className="text-sm font-semibold">Fee History</h3>
              <button className="btn-secondary btn-sm"><Download className="w-3.5 h-3.5" /> Statement</button>
            </div>
            <div className="table-container">
              <table className="table">
                <thead><tr><th>Invoice</th><th>Description</th><th>Amount</th><th>Paid</th><th>Status</th><th>Date</th></tr></thead>
                <tbody>
                  {invoices.map(inv => (
                    <tr key={inv.id}>
                      <td className="text-xs font-mono text-blue-650">{inv.id}</td>
                      <td className="text-xs">{inv.desc}</td>
                      <td className="text-xs font-medium">{formatCurrency(inv.amount)}</td>
                      <td className="text-xs text-green-600">{formatCurrency(inv.paid)}</td>
                      <td><span className={`badge ${inv.status === 'PAID' ? 'badge-green' : 'badge-yellow'}`}>{inv.status}</span></td>
                      <td className="text-xs text-slate-500">{formatDate(inv.date)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Tab: Documents */}
      {tab === 'Documents' && (
        <div className="card">
          <div className="card-header">
            <h3 className="text-sm font-semibold">Student Documents</h3>
            <button className="btn-primary btn-sm"><FileText className="w-3.5 h-3.5" /> Upload</button>
          </div>
          <div className="card-body">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {[
                { name: 'National ID Copy', size: '342 KB', date: '2022-09-01', type: 'ID' },
                { name: 'High School Certificate', size: '1.2 MB', date: '2022-09-01', type: 'Certificate' },
                { name: 'Enrollment Letter', size: '280 KB', date: '2022-09-05', type: 'Letter' },
                { name: 'Medical Certificate', size: '520 KB', date: '2023-01-10', type: 'Medical' },
                { name: 'Photo ID', size: '180 KB', date: '2022-09-01', type: 'Photo' },
              ].map((doc, i) => (
                <div key={i} className="p-4 border border-slate-200 rounded-xl hover:border-blue-300 transition-colors cursor-pointer group">
                  <div className="text-3xl mb-2">📄</div>
                  <p className="text-xs font-medium text-slate-700 group-hover:text-blue-650">{doc.name}</p>
                  <p className="text-xs text-slate-400 mt-0.5">{doc.size} · {formatDate(doc.date)}</p>
                  <span className="badge badge-gray mt-2">{doc.type}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Tab: Activity */}
      {tab === 'Activity' && (
        <div className="card">
          <div className="card-header"><h3 className="text-sm font-semibold">Recent Activity</h3></div>
          <div className="divide-y divide-slate-100">
            {[
              { icon: '📝', text: 'Submitted "ER Diagram Design" assignment', time: '2 hours ago' },
              { icon: '✅', text: 'Marked present in CS-401 Database Systems', time: '4 hours ago' },
              { icon: '💰', text: 'Partial payment of $100 received for Activity Fee', time: '1 day ago' },
              { icon: '📚', text: 'Enrolled in CS-404 Artificial Intelligence', time: '2 days ago' },
              { icon: '🔐', text: 'Password changed', time: '5 days ago' },
              { icon: '📋', text: 'Grade posted for CS-401 Quiz 3 — 47/50', time: '1 week ago' },
            ].map((a, i) => (
              <div key={i} className="p-4 flex items-start gap-3">
                <span className="text-xl shrink-0">{a.icon}</span>
                <div>
                  <p className="text-xs text-slate-700">{a.text}</p>
                  <p className="text-xs text-slate-400 mt-0.5">{a.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
