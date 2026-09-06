export function TeacherAssignmentsPage() {
  return (
    <div className="max-w-7xl mx-auto py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Manage Assignments</h1>
        <button className="bg-blue-600 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded-lg">
          Create Assignment
        </button>
      </div>
      
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8 text-center text-slate-500">
        Assignment management interface goes here. You can list assignments created by this instructor and grade submissions.
      </div>
    </div>
  )
}
