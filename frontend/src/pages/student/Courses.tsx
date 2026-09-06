import { useEffect, useState } from 'react'
import api from '@/api/client'
import { useAuth } from '@/hooks/useAuth'

export function StudentCoursesPage() {
  const { user } = useAuth()
  const [allCourses, setAllCourses] = useState<any[]>([])
  const [myEnrollments, setMyEnrollments] = useState<any[]>([])

  useEffect(() => {
    api.get('/courses').then(res => setAllCourses(res.data)).catch(err => console.error(err))
    
    if (user?.id) {
      api.get(`/enrollments/student/${user.id}`)
         .then(res => setMyEnrollments(res.data))
         .catch(err => console.error(err))
    }
  }, [user])

  const enroll = (courseId: number) => {
    if (!user?.id) return
    api.post('/enrollments', { student: { id: user.id }, course: { id: courseId } })
       .then(res => {
         setMyEnrollments([...myEnrollments, res.data])
       })
       .catch(err => console.error(err))
  }

  const enrolledCourseIds = myEnrollments.map(e => e.course.id)

  return (
    <div className="max-w-7xl mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6">Course Catalog</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {allCourses.map(course => {
          const isEnrolled = enrolledCourseIds.includes(course.id)
          
          return (
            <div key={course.id} className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded-full">{course.category}</span>
                <h3 className="text-lg font-bold mt-3 mb-1 text-slate-900">{course.title}</h3>
                <p className="text-slate-500 text-sm mb-4 line-clamp-3">{course.description}</p>
                <div className="text-xs text-slate-400 font-medium mb-6">
                  {course.code} • {course.credits} Credits • {course.status}
                </div>
              </div>
              
              <button 
                onClick={() => !isEnrolled && enroll(course.id)}
                disabled={isEnrolled}
                className={`w-full py-2.5 rounded-lg font-bold text-sm transition-colors ${
                  isEnrolled 
                  ? 'bg-slate-100 text-slate-500 cursor-not-allowed' 
                  : 'bg-blue-600 hover:bg-blue-500 text-white shadow-md shadow-blue-600/20'
                }`}
              >
                {isEnrolled ? 'Already Enrolled' : 'Enroll Now'}
              </button>
            </div>
          )
        })}
      </div>
    </div>
  )
}
