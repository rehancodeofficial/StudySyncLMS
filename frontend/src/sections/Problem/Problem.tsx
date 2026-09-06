import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Mail,
  FileSpreadsheet,
  MessageSquare,
  BookOpen,
  CheckSquare,
  BarChart3,
  Video,
  ArrowDown,
  Sparkles,
  Layers,
  GraduationCap,
} from 'lucide-react'

export const Problem = () => {
  const [converged, setConverged] = useState(true)

  const fragmentedTools = [
    { name: 'Email Silos', icon: <Mail className="w-4 h-4 text-red-500" />, note: 'Lost assignments' },
    { name: 'Spreadsheets', icon: <FileSpreadsheet className="w-4 h-4 text-emerald-600" />, note: 'Outdated roster grades' },
    { name: 'Messaging Apps', icon: <MessageSquare className="w-4 h-4 text-indigo-500" />, note: 'Scattered chats' },
    { name: 'Course Tools', icon: <BookOpen className="w-4 h-4 text-amber-500" />, note: 'Clunky uploads' },
    { name: 'Separate Assessments', icon: <CheckSquare className="w-4 h-4 text-blue-500" />, note: 'Manual tallying' },
    { name: 'Third-party Analytics', icon: <BarChart3 className="w-4 h-4 text-purple-500" />, note: 'Delayed quarterly reports' },
    { name: 'Disconnected Video Calls', icon: <Video className="w-4 h-4 text-rose-500" />, note: 'Broken attendance links' },
  ]

  return (
    <section className="py-24 bg-[#F5F9F8] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#B27F51] mb-2 block">
            The Fragmentation Trap
          </span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#37292B] tracking-tight">
            Education is connected.{' '}
            <span className="text-[#4866A4]">Your software should be too.</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#37292B]/70">
            Most campuses juggle a brittle patchwork of 7+ disjointed tools. Students fall through
            the cracks, educators waste hundreds of hours, and leadership lacks real-time clarity.
          </p>

          <div className="mt-6 inline-flex items-center p-1 rounded-full bg-[#FCFDFC] border border-[#AEA1D0]/30 shadow-xs">
            <button
              onClick={() => setConverged(false)}
              className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
                !converged
                  ? 'bg-[#37292B] text-white shadow-xs'
                  : 'text-[#37292B]/60 hover:text-[#37292B]'
              }`}
            >
              Fragmented Reality
            </button>
            <button
              onClick={() => setConverged(true)}
              className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
                converged
                  ? 'bg-[#4866A4] text-white shadow-xs'
                  : 'text-[#37292B]/60 hover:text-[#37292B]'
              }`}
            >
              Unified StudySync
            </button>
          </div>
        </div>

        {/* Dynamic Interactive Stage: Fragmented vs Converged */}
        <div className="max-w-5xl mx-auto min-h-[420px] relative flex flex-col items-center justify-center p-8 rounded-3xl bg-[#FCFDFC] border border-[#AEA1D0]/30 shadow-xl">
          {!converged ? (
            /* Disjointed / Fragmented View */
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="w-full"
            >
              <div className="text-center mb-8">
                <span className="text-xs font-bold text-red-600 bg-red-50 border border-red-200 px-3 py-1 rounded-full">
                  ⚠️ 7 Disconnected Systems & Friction Everywhere
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {fragmentedTools.map((tool) => (
                  <div
                    key={tool.name}
                    className="p-4 rounded-2xl bg-white border border-dashed border-red-200 shadow-xs flex items-center gap-3.5 transform hover:-translate-y-1 transition-transform"
                  >
                    <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center shrink-0">
                      {tool.icon}
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-[#37292B]">{tool.name}</h4>
                      <p className="text-[11px] text-red-500 font-medium mt-0.5">{tool.note}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ) : (
            /* Unified StudySync Core */
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="w-full text-center"
            >
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#57A889]/10 text-[#57A889] border border-[#57A889]/20 text-xs font-bold mb-8">
                <Sparkles className="w-3.5 h-3.5" />
                <span>One Harmonized Ecosystem · Zero Context Switching</span>
              </div>

              {/* Central StudySync Hub */}
              <div className="max-w-2xl mx-auto p-6 rounded-3xl bg-gradient-to-b from-[#F5F9F8] to-white border border-[#AEA1D0]/40 shadow-lg relative">
                <div className="flex items-center justify-center gap-2 mb-6">
                  <div className="w-9 h-9 rounded-xl bg-[#37292B] text-white flex items-center justify-center shadow-sm">
                    <GraduationCap className="w-5 h-5 text-[#AEA1D0]" />
                  </div>
                  <span className="font-display text-2xl font-black text-[#37292B] tracking-tight">
                    STUDYSYNC
                  </span>
                </div>

                {/* 3 Unified Pillars */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-[#AEA1D0]/20">
                  <div className="p-4 rounded-2xl bg-white border border-[#AEA1D0]/25 shadow-xs">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#9579AE] block mb-1">
                      Pillar 01
                    </span>
                    <h4 className="text-base font-extrabold text-[#37292B]">TEACH</h4>
                    <p className="text-xs text-[#37292B]/70 mt-1 leading-snug">
                      Curriculum, modules, assignments, and AI assisted evaluation.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-white border border-[#AEA1D0]/25 shadow-xs">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#4866A4] block mb-1">
                      Pillar 02
                    </span>
                    <h4 className="text-base font-extrabold text-[#37292B]">LEARN</h4>
                    <p className="text-xs text-[#37292B]/70 mt-1 leading-snug">
                      Milestone tracking, interactive materials, and active student support.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-white border border-[#AEA1D0]/25 shadow-xs">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#57A889] block mb-1">
                      Pillar 03
                    </span>
                    <h4 className="text-base font-extrabold text-[#37292B]">UNDERSTAND</h4>
                    <p className="text-xs text-[#37292B]/70 mt-1 leading-snug">
                      Real-time cohort insights, predictive retention, and audit logs.
                    </p>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-[#AEA1D0]/20 flex items-center justify-center gap-2 text-xs font-bold text-[#4866A4]">
                  <Layers className="w-4 h-4" />
                  <span>ONE PLATFORM FOR YOUR ENTIRE INSTITUTION</span>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  )
}
