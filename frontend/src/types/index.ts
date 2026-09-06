// =========================================================
// StudySync LMS — Core Type Definitions (Multi-Tenant SaaS)
// =========================================================

export type Role =
  | 'ROLE_SUPER_ADMIN'
  | 'ROLE_ORG_ADMIN'
  | 'ROLE_INSTRUCTOR'
  | 'ROLE_STUDENT'

export interface User {
  id: string
  name: string
  email: string
  role: Role
  roles?: Role[]
  organizationId?: number | null
  organizationName?: string
  active?: boolean
  createdAt?: string
}

export interface Organization {
  id: number
  name: string
  slug: string
  email: string
  phone?: string
  address?: string
  website?: string
  description?: string
  logo?: string
  status: 'PENDING' | 'ACTIVE' | 'SUSPENDED' | 'INACTIVE'
  subscriptionPlan: 'FREE' | 'PRO' | 'ENTERPRISE'
  studentLimit: number
  instructorLimit: number
  courseLimit: number
  createdAt: string
  totalStudents?: number
  totalInstructors?: number
  totalCourses?: number
}

export interface Department {
  id: number
  name: string
  code?: string
  description?: string
  organizationId: number
}

export interface Course {
  id: number
  title: string
  code: string
  description?: string
  category?: string
  thumbnail?: string
  credits?: number
  capacity?: number
  status: 'DRAFT' | 'PUBLISHED' | 'ARCHIVED'
  organizationId: number
  instructorId?: number
  instructorName?: string
  departmentId?: number
  departmentName?: string
  createdAt: string
  enrollmentCount?: number
}

export interface Enrollment {
  id: number
  studentId: number
  studentName: string
  studentEmail: string
  courseId: number
  courseTitle: string
  courseCode: string
  status: 'ACTIVE' | 'COMPLETED' | 'DROPPED' | 'SUSPENDED'
  progress: number
  finalGrade?: number
  enrolledAt: string
  completionDate?: string
}

export interface Assignment {
  id: number
  title: string
  description?: string
  maxMarks?: number
  dueDate?: string
  status: 'DRAFT' | 'PUBLISHED' | 'CLOSED'
  courseId: number
  courseTitle?: string
  createdAt: string
}

export interface Submission {
  id: number
  assignmentId: number
  assignmentTitle?: string
  studentId: number
  studentName?: string
  content?: string
  fileUrl?: string
  status: 'SUBMITTED' | 'LATE' | 'GRADED' | 'RETURNED'
  grade?: number
  feedback?: string
  submittedAt: string
  gradedAt?: string
}

export interface ApiResponse<T> {
  success: boolean
  message: string
  data: T
}

// Auth
export interface LoginResponse {
  token: string
  type: string
  id: number
  name: string
  email: string
  roles: Role[]
  organizationId: number | null
}

// Analytics
export interface PlatformStats {
  totalOrganizations: number
  totalUsers: number
  totalCourses: number
  totalEnrollments: number
}

export interface OrgStats {
  totalStudents: number
  totalInstructors: number
  totalCourses: number
  totalEnrollments: number
}
