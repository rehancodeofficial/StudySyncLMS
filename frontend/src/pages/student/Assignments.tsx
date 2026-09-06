import { useEffect, useState } from 'react'
import api from '@/api/client'
import { useAuth } from '@/hooks/useAuth'

export function StudentAssignmentsPage() {
  const { user } = useAuth()
  const [enrollments, setEnrollments] = useState<any[]>([])
  
  useEffect(() => {
    if (user?.id) {
      api.get(`/enrollments/student/${user.id}`)
         .then(res => setEnrollments(res.data))
         .catch(err => console.error(err))
    }
  }, [user])

  return (
    <div className="max-w-7xl mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6">My Assignments</h1>
      
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              <th className="px-6 py-4 font-bold text-sm text-slate-500">Course</th>
              <th className="px-6 py-4 font-bold text-sm text-slate-500">Assignment Title</th>
              <th className="px-6 py-4 font-bold text-sm text-slate-500">Status</th>
              <th className="px-6 py-4 font-bold text-sm text-slate-500">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {enrollments.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-6 py-8 text-center text-slate-500">
                  No assignments found. You are not enrolled in any courses.
                </td>
              </tr>
            ) : (
              enrollments.map(e => (
                <tr key={e.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4 text-sm font-medium text-slate-900">{e.course.title}</td>
                  <td className="px-6 py-4 text-sm text-slate-500">Final Project Placeholder</td>
                  <td className="px-6 py-4">
                    <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-amber-50 text-amber-600">Pending</span>
                  </td>
                  <td className="px-6 py-4">
                    <button className="text-blue-600 font-medium text-sm hover:underline">Submit</button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
