import type { ReactNode } from 'react'

export type Role =
  | 'SUPER_ADMIN'
  | 'UNIVERSITY_ADMIN'
  | 'DEPARTMENT_ADMIN'
  | 'FACULTY'
  | 'STUDENT'
  | 'ACCOUNTANT'
  | 'LIBRARIAN'
  | 'HR'
  | 'RECEPTIONIST'
  | 'TRANSPORT_MANAGER'

export interface User {
  id: string
  email: string
  name: string
  role: Role
  avatar?: string
  institutionId: string
  department?: string
  phone?: string
}

export interface AuthState {
  user: User | null
  token: string | null
  isAuthenticated: boolean
}

export interface Student {
  id: string
  studentId: string
  name: string
  email: string
  phone?: string
  avatar?: string
  department: string
  program: string
  semester: number
  section: string
  enrollmentDate: string
  status: 'ACTIVE' | 'INACTIVE' | 'GRADUATED' | 'SUSPENDED'
  gpa?: number
  attendancePercentage?: number
  gender?: string
  dob?: string
  address?: string
}

export interface Teacher {
  id: string
  employeeId: string
  name: string
  email: string
  phone?: string
  avatar?: string
  department: string
  qualification: string
  specialization: string
  joinDate: string
  status: 'ACTIVE' | 'INACTIVE' | 'ON_LEAVE'
  courseCount?: number
  studentCount?: number
}

export interface Course {
  id: string
  code: string
  title: string
  description?: string
  credits: number
  department: string
  teacher: string
  teacherId: string
  enrolledCount: number
  semester: string
  status: 'ACTIVE' | 'INACTIVE' | 'ARCHIVED'
}

export interface Department {
  id: string
  name: string
  code: string
  head?: string
  headId?: string
  established?: string
  facultyCount: number
  studentCount: number
  courseCount: number
  programCount?: number
  description?: string
  status?: 'ACTIVE' | 'INACTIVE'
}

export interface Program {
  id: string
  name: string
  code: string
  department: string
  departmentId: string
  duration: number
  degree: string
  totalStudents: number
  status: 'ACTIVE' | 'INACTIVE'
}

export interface Assignment {
  id: string
  title: string
  description?: string
  course: string
  courseId: string
  dueDate: string
  totalMarks: number
  submittedCount: number
  totalStudents: number
  status: 'DRAFT' | 'PUBLISHED' | 'CLOSED'
  type: 'ASSIGNMENT' | 'PROJECT' | 'QUIZ' | 'REPORT'
}

export interface AssignmentSubmission {
  id: string
  assignmentId: string
  studentId: string
  studentName: string
  studentAvatar?: string
  submittedAt: string
  status: 'SUBMITTED' | 'LATE' | 'GRADED' | 'RESUBMIT'
  marks?: number
  feedback?: string
  fileUrl?: string
}

export interface Exam {
  id: string
  title: string
  course: string
  courseId: string
  date: string
  time: string
  duration: number
  totalMarks: number
  venue: string
  status: 'SCHEDULED' | 'ONGOING' | 'COMPLETED' | 'CANCELLED'
  type: 'MIDTERM' | 'FINAL' | 'QUIZ' | 'PRACTICAL' | 'VIVA'
}

export interface Attendance {
  id: string
  studentId: string
  studentName: string
  courseId: string
  date: string
  status: 'PRESENT' | 'ABSENT' | 'LATE' | 'EXCUSED'
}

export interface Invoice {
  id: string
  invoiceNo: string
  studentId: string
  studentName: string
  amount: number
  paid: number
  due: number
  dueDate: string
  issuedDate: string
  status: 'PAID' | 'PARTIAL' | 'UNPAID' | 'OVERDUE'
  feeType: string
}

export interface Payment {
  id: string
  invoiceId: string
  studentName: string
  amount: number
  method: 'CASH' | 'BANK_TRANSFER' | 'ONLINE' | 'CHEQUE'
  transactionId?: string
  date: string
  status: 'SUCCESS' | 'PENDING' | 'FAILED'
  receivedBy: string
}

export interface BookItem {
  id: string
  isbn: string
  title: string
  author: string
  category: string
  publisher: string
  publishYear: number
  totalCopies: number
  availableCopies: number
  status: 'AVAILABLE' | 'UNAVAILABLE'
}

export interface LibraryTransaction {
  id: string
  bookId: string
  bookTitle: string
  memberId: string
  memberName: string
  issueDate: string
  dueDate: string
  returnDate?: string
  fine?: number
  status: 'ISSUED' | 'RETURNED' | 'OVERDUE'
}

export interface TransportRoute {
  id: string
  routeNo: string
  name: string
  startPoint: string
  endPoint: string
  distance: number
  vehicleId: string
  driverId: string
  studentsCount: number
  status: 'ACTIVE' | 'INACTIVE'
}

export interface Announcement {
  id: string
  title: string
  content: string
  targetRole: Role[] | 'ALL'
  priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT'
  publishedAt: string
  expiresAt?: string
  author: string
  views: number
}

export interface Notification {
  id: string
  title: string
  message: string
  type: 'INFO' | 'SUCCESS' | 'WARNING' | 'ERROR' | 'ASSIGNMENT' | 'EXAM' | 'FEE' | 'GRADE'
  read: boolean
  createdAt: string
  link?: string
}

export interface Event {
  id: string
  title: string
  description?: string
  startDate: string
  endDate: string
  type: 'ACADEMIC' | 'CULTURAL' | 'SPORTS' | 'HOLIDAY' | 'EXAM'
  location?: string
  organizer: string
}

export interface AuditLog {
  id: string
  userId: string
  userName: string
  action: string
  resource: string
  resourceId?: string
  details?: string
  ip?: string
  createdAt: string
}

export interface TimetableEntry {
  id: string
  courseId: string
  courseName: string
  courseCode: string
  teacherId: string
  teacherName: string
  room: string
  dayOfWeek: number // 0=Mon, 6=Sun
  startTime: string
  endTime: string
  section: string
}

export interface TableColumn<T> {
  key: keyof T | string
  header: string
  render?: (value: unknown, row: T) => ReactNode
  sortable?: boolean
  className?: string
  width?: string
}

export interface PaginationMeta {
  page: number
  limit: number
  total: number
  totalPages: number
}

export interface ApiResponse<T> {
  data: T
  meta?: PaginationMeta
  message?: string
  success?: boolean
}

export interface SelectOption {
  value: string
  label: string
}

export interface KPICard {
  title: string
  value: string | number
  change?: number
  icon: string
  color: 'blue' | 'green' | 'yellow' | 'red' | 'purple'
}
