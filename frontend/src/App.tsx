import { Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from '@/hooks/useAuth'
import { AdminLayout, TeacherLayout, StudentLayout } from '@/layouts/AppLayout'

// Auth pages
import { LoginPage } from '@/pages/auth/LoginPage'
import { RegisterPage } from '@/pages/auth/RegisterPage'
import { ForgotPasswordPage } from '@/pages/auth/ForgotPasswordPage'

// Public pages
import { LandingPage } from '@/pages/public/LandingPage'

// Admin pages
import { AdminDashboard } from '@/pages/admin/Dashboard'
import { StudentsPage } from '@/pages/admin/Students'
import { StudentDetailPage } from '@/pages/admin/StudentDetail'
import { AddStudentPage } from '@/pages/admin/AddStudent'
import { TeachersPage } from '@/pages/admin/Teachers'
import { CoursesPage } from '@/pages/admin/Courses'
import { DepartmentsPage } from '@/pages/admin/Departments'
import { AttendancePage } from '@/pages/admin/Attendance'
import { AssignmentsPage } from '@/pages/admin/Assignments'
import { ExamsPage } from '@/pages/admin/Exams'
import { ResultsPage } from '@/pages/admin/Results'
import { FinancePage } from '@/pages/admin/Finance'
import { InvoicesPage } from '@/pages/admin/Invoices'
import { LibraryPage } from '@/pages/admin/Library'
import { TransportPage } from '@/pages/admin/Transport'
import { HostelPage } from '@/pages/admin/Hostel'
import { HRPage } from '@/pages/admin/HR'
import { ReportsPage } from '@/pages/admin/Reports'
import { AnnouncementsPage } from '@/pages/admin/Announcements'
import { UsersPage } from '@/pages/admin/Users'
import { SettingsPage } from '@/pages/admin/Settings'
import { AdmissionsPage } from '@/pages/admin/Admissions'
import { TimetablePage } from '@/pages/admin/Timetable'
import { CalendarPage } from '@/pages/admin/CalendarPage'
import { AuditLogsPage } from '@/pages/admin/AuditLogs'

// Teacher pages
import { TeacherDashboard } from '@/pages/teacher/Dashboard'
import { TeacherCoursesPage } from '@/pages/teacher/Courses'
import { TeacherAttendancePage } from '@/pages/teacher/Attendance'
import { TeacherAssignmentsPage } from '@/pages/teacher/Assignments'
import { TeacherGradebook } from '@/pages/teacher/Gradebook'

// Student pages
import { StudentDashboard } from '@/pages/student/Dashboard'
import { StudentCoursesPage } from '@/pages/student/Courses'
import { StudentAttendancePage } from '@/pages/student/Attendance'
import { StudentAssignmentsPage } from '@/pages/student/Assignments'
import { StudentResultsPage } from '@/pages/student/Results'
import { StudentFeesPage } from '@/pages/student/Fees'

// Error pages
import { NotFoundPage } from '@/pages/errors/NotFound'
import { UnauthorizedPage } from '@/pages/errors/Unauthorized'

export default function App() {
  return (
    <AuthProvider>
      <Routes>
        {/* Public */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/login/:role" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />

        {/* Admin Portal */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Navigate to="/admin/dashboard" replace />} />
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="students" element={<StudentsPage />} />
          <Route path="students/new" element={<AddStudentPage />} />
          <Route path="students/:id" element={<StudentDetailPage />} />
          <Route path="teachers" element={<TeachersPage />} />
          <Route path="teachers/new" element={<AddStudentPage />} />
          <Route path="courses" element={<CoursesPage />} />
          <Route path="departments" element={<DepartmentsPage />} />
          <Route path="academics" element={<DepartmentsPage />} />
          <Route path="admissions" element={<AdmissionsPage />} />
          <Route path="admissions/applications" element={<AdmissionsPage />} />
          <Route path="admissions/pending" element={<AdmissionsPage />} />
          <Route path="admissions/enrollment" element={<AdmissionsPage />} />
          <Route path="attendance" element={<AttendancePage />} />
          <Route path="assignments" element={<AssignmentsPage />} />
          <Route path="exams" element={<ExamsPage />} />
          <Route path="exams/schedule" element={<ExamsPage />} />
          <Route path="exams/gradebook" element={<ExamsPage />} />
          <Route path="results" element={<ResultsPage />} />
          <Route path="results/report-cards" element={<ResultsPage />} />
          <Route path="timetable" element={<TimetablePage />} />
          <Route path="finance" element={<FinancePage />} />
          <Route path="fees/invoices" element={<InvoicesPage />} />
          <Route path="fees/payments" element={<InvoicesPage />} />
          <Route path="fees/structure" element={<FinancePage />} />
          <Route path="fees/scholarships" element={<FinancePage />} />
          <Route path="finance/expenses" element={<FinancePage />} />
          <Route path="finance/reports" element={<ReportsPage />} />
          <Route path="announcements" element={<AnnouncementsPage />} />
          <Route path="messages" element={<AnnouncementsPage />} />
          <Route path="notifications" element={<AnnouncementsPage />} />
          <Route path="calendar" element={<CalendarPage />} />
          <Route path="library" element={<LibraryPage />} />
          <Route path="transport" element={<TransportPage />} />
          <Route path="hostel" element={<HostelPage />} />
          <Route path="hr" element={<HRPage />} />
          <Route path="reports" element={<ReportsPage />} />
          <Route path="documents" element={<ReportsPage />} />
          <Route path="certificates" element={<ReportsPage />} />
          <Route path="id-cards" element={<ReportsPage />} />
          <Route path="users" element={<UsersPage />} />
          <Route path="roles" element={<UsersPage />} />
          <Route path="permissions" element={<UsersPage />} />
          <Route path="audit-logs" element={<AuditLogsPage />} />
          <Route path="settings/*" element={<SettingsPage />} />
          <Route path="enrollments" element={<StudentsPage />} />
          <Route path="subjects" element={<CoursesPage />} />
        </Route>

        {/* Teacher Portal */}
        <Route path="/teacher" element={<TeacherLayout />}>
          <Route index element={<Navigate to="/teacher/dashboard" replace />} />
          <Route path="dashboard" element={<TeacherDashboard />} />
          <Route path="courses" element={<TeacherCoursesPage />} />
          <Route path="attendance" element={<TeacherAttendancePage />} />
          <Route path="assignments" element={<TeacherAssignmentsPage />} />
          <Route path="gradebook" element={<TeacherGradebook />} />
          <Route path="exams" element={<ExamsPage />} />
        </Route>

        {/* Student Portal */}
        <Route path="/student" element={<StudentLayout />}>
          <Route index element={<Navigate to="/student/dashboard" replace />} />
          <Route path="dashboard" element={<StudentDashboard />} />
          <Route path="courses" element={<StudentCoursesPage />} />
          <Route path="attendance" element={<StudentAttendancePage />} />
          <Route path="assignments" element={<StudentAssignmentsPage />} />
          <Route path="results" element={<StudentResultsPage />} />
          <Route path="fees" element={<StudentFeesPage />} />
          <Route path="exams" element={<ExamsPage />} />
        </Route>

        {/* Error pages */}
        <Route path="/401" element={<UnauthorizedPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </AuthProvider>
  )
}
