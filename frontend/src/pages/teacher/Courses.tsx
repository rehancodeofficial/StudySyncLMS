import { useEffect, useState } from 'react'
import api from '@/api/client'
import { useAuth } from '@/hooks/useAuth'

export function TeacherCoursesPage() {
  const { user } = useAuth()
  const [courses, setCourses] = useState<any[]>([])
  
  // New Course Form State
  const [title, setTitle] = useState('')
  const [code, setCode] = useState('')
  const [credits, setCredits] = useState('3')
  const [description, setDescription] = useState('')
  const [category, setCategory] = useState('')

  useEffect(() => {
    // Ideally we'd fetch only courses taught by this instructor, but backend /api/courses returns all for now.
    // We filter on the frontend.
    if (user?.id) {
      api.get('/courses')
         .then(res => {
           const myCourses = res.data.filter((c: any) => c.instructor?.id === user.id)
           setCourses(myCourses)
         })
         .catch(err => console.error(err))
    }
  }, [user])

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault()
    if (!user?.id) return
    
    api.post('/courses', {
      title, code, credits: parseInt(credits), description, category,
      status: 'ACTIVE',
      instructor: { id: user.id }
    }).then(res => {
      setCourses([...courses, res.data])
      setTitle(''); setCode(''); setDescription(''); setCategory('')
    }).catch(err => console.error(err))
  }

  return (
    <div className="max-w-7xl mx-auto py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">My Taught Courses</h1>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {courses.length === 0 ? (
              <div className="col-span-full p-8 bg-white rounded-xl border border-slate-200 text-center text-slate-500">
                You are not currently assigned to teach any courses.
              </div>
            ) : (
              courses.map(course => (
                <div key={course.id} className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                  <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded-full">{course.category}</span>
                  <h3 className="text-lg font-bold mt-3 mb-1 text-slate-900">{course.title}</h3>
                  <p className="text-slate-500 text-sm mb-4 line-clamp-2">{course.description}</p>
                  <div className="text-xs text-slate-400 font-medium pt-4 border-t border-slate-100 flex justify-between">
                    <span>{course.code}</span>
                    <span>{course.credits} Credits</span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        <div>
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 sticky top-8">
            <h2 className="text-lg font-bold mb-4">Create New Course</h2>
            <form onSubmit={handleCreate} className="flex flex-col gap-4">
              <div>
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-1 block">Course Title</label>
                <input required value={title} onChange={e => setTitle(e.target.value)} className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-1 block">Code</label>
                  <input required value={code} onChange={e => setCode(e.target.value)} className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none" placeholder="e.g. CS101" />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-1 block">Credits</label>
                  <input required type="number" value={credits} onChange={e => setCredits(e.target.value)} className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none" />
                </div>
              </div>
              <div>
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-1 block">Category</label>
                <input required value={category} onChange={e => setCategory(e.target.value)} className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none" />
              </div>
              <div>
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-1 block">Description</label>
                <textarea required value={description} onChange={e => setDescription(e.target.value)} rows={3} className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none resize-none"></textarea>
              </div>
              <button type="submit" className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-2.5 rounded-lg transition-colors mt-2">
                Create Course
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
