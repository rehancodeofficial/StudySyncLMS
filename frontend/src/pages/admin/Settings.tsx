import { useState } from 'react'
import { Save, GraduationCap, Bell, Lock, Globe, Palette, Database } from 'lucide-react'

const TABS = [
  { id: 'general', label: 'General', icon: <Globe className="w-4 h-4" /> },
  { id: 'academic', label: 'Academic Year', icon: <GraduationCap className="w-4 h-4" /> },
  { id: 'notifications', label: 'Notifications', icon: <Bell className="w-4 h-4" /> },
  { id: 'security', label: 'Security', icon: <Lock className="w-4 h-4" /> },
  { id: 'appearance', label: 'Appearance', icon: <Palette className="w-4 h-4" /> },
  { id: 'backup', label: 'Backup & Data', icon: <Database className="w-4 h-4" /> },
]

export function SettingsPage() {
  const [active, setActive] = useState('general')

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="page-title">Settings</h1>
        <p className="page-subtitle">Configure institution profile, academic year, and system preferences.</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Sidebar Nav */}
        <div className="lg:w-56 shrink-0">
          <div className="card p-2 flex flex-row lg:flex-col gap-1 overflow-x-auto">
            {TABS.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActive(tab.id)}
                className={`flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-sm font-semibold transition-colors text-left whitespace-nowrap ${
                  active === tab.id
                    ? 'bg-blue-50 text-blue-700 border border-blue-100'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                {tab.icon} {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 card p-6 lg:p-8">
          {active === 'general' && (
            <div className="flex flex-col gap-6">
              <h2 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-4">Institution Profile</h2>
              <div className="flex flex-col sm:flex-row items-start gap-6">
                <div className="w-24 h-24 rounded-2xl bg-blue-50 border-2 border-dashed border-blue-200 flex items-center justify-center cursor-pointer hover:bg-blue-100 transition-colors shrink-0">
                  <GraduationCap className="w-10 h-10 text-blue-400" />
                </div>
                <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="label">Institution Name</label>
                    <input className="input" defaultValue="StudySync University" />
                  </div>
                  <div>
                    <label className="label">Short Name / Code</label>
                    <input className="input" defaultValue="SSU" />
                  </div>
                  <div>
                    <label className="label">Website</label>
                    <input className="input" defaultValue="https://studysync.edu" />
                  </div>
                  <div>
                    <label className="label">Contact Email</label>
                    <input className="input" defaultValue="info@studysync.edu" />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="label">Physical Address</label>
                    <input className="input" defaultValue="123 University Avenue, Academic City, AC 45678" />
                  </div>
                </div>
              </div>
            </div>
          )}

          {active === 'academic' && (
            <div className="flex flex-col gap-6">
              <h2 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-4">Academic Year Configuration</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="label">Current Academic Year</label>
                  <input className="input" defaultValue="2026-2027" />
                </div>
                <div>
                  <label className="label">Current Semester</label>
                  <select className="select"><option>Fall 2026</option><option>Spring 2027</option></select>
                </div>
                <div>
                  <label className="label">Semester Start Date</label>
                  <input type="date" className="input" defaultValue="2026-09-01" />
                </div>
                <div>
                  <label className="label">Semester End Date</label>
                  <input type="date" className="input" defaultValue="2026-12-31" />
                </div>
                <div>
                  <label className="label">GPA Scale</label>
                  <select className="select"><option>4.0 Scale</option><option>5.0 Scale</option></select>
                </div>
                <div>
                  <label className="label">Passing Grade (%)</label>
                  <input type="number" className="input" defaultValue="50" />
                </div>
              </div>
            </div>
          )}

          {active === 'notifications' && (
            <div className="flex flex-col gap-6">
              <h2 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-4">Notification Preferences</h2>
              {[
                { label: 'Email Notifications', desc: 'Send email alerts for system events' },
                { label: 'Fee Payment Reminders', desc: 'Auto-remind students of pending dues' },
                { label: 'Attendance Alerts', desc: 'Notify parents when attendance drops below threshold' },
                { label: 'New Application Alerts', desc: 'Alert admins when new applications arrive' },
                { label: 'Grade Publication', desc: 'Notify students when results are published' },
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between p-4 rounded-xl border border-slate-100 hover:bg-slate-50 transition-colors">
                  <div>
                    <p className="text-sm font-bold text-slate-800">{item.label}</p>
                    <p className="text-xs text-slate-500 mt-0.5">{item.desc}</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" defaultChecked={i < 3} className="sr-only peer" />
                    <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
              ))}
            </div>
          )}

          {(active === 'security' || active === 'appearance' || active === 'backup') && (
            <div className="flex flex-col items-center justify-center h-48 text-center">
              <div className="text-4xl mb-4">⚙️</div>
              <h3 className="text-lg font-bold text-slate-700">Coming Soon</h3>
              <p className="text-sm text-slate-500 mt-1">This settings section is under development.</p>
            </div>
          )}

          <div className="mt-8 pt-6 border-t border-slate-100 flex justify-end gap-3">
            <button className="btn-secondary">Cancel</button>
            <button className="btn-primary"><Save className="w-4 h-4 mr-2" /> Save Changes</button>
          </div>
        </div>
      </div>
    </div>
  )
}
