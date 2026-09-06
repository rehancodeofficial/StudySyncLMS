import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Sparkles,
  Bot,
  ArrowRight,
  FileEdit,
  LineChart,
  Lightbulb,
  Zap,
  Users,
  CheckCircle2,
  AlertCircle,
  FileText,
} from 'lucide-react'

export const AISection = () => {
  const [activeCapability, setActiveCapability] = useState<number>(0)

  const capabilities = [
    {
      title: 'Create',
      tagline: 'Generate curriculum in seconds',
      description: 'Assist educators in generating modular quizzes, formative assignments, lesson summaries, and differentiated study packs aligned to course learning goals.',
      icon: <FileEdit className="w-5 h-5 text-[#AEA1D0]" />,
      bullets: ['Auto-generate multi-level quizzes', 'Assignment rubric creation', 'Lecture transcript summaries', 'Adaptive learning materials'],
      badge: 'Pedagogy Engine',
    },
    {
      title: 'Understand',
      tagline: 'Surface cohort learning gaps',
      description: 'Continuously parse course telemetry to detect student struggle points, topic bottlenecks, and longitudinal completion trajectories.',
      icon: <LineChart className="w-5 h-5 text-[#4866A4]" />,
      bullets: ['Topic-by-topic comprehension analysis', 'Longitudinal cohort trends', 'Early drop-off indicator warnings', 'Assessment difficulty calibration'],
      badge: 'Diagnostics',
    },
    {
      title: 'Recommend',
      tagline: 'Targeted intervention pathways',
      description: 'Provide personalized academic next steps, recommending supplemental reading to struggling students while alerting faculty to students needing 1-on-1 check-ins.',
      icon: <Lightbulb className="w-5 h-5 text-[#B27F51]" />,
      bullets: ['Targeted supplemental reading', 'Suggested 1-on-1 office hour interventions', 'Personalized remediation pathways', 'Peer-assisted study pairings'],
      badge: 'Intervention Logic',
    },
    {
      title: 'Automate',
      tagline: 'Eliminate repetitive administration',
      description: 'Relieve instructors of mechanical overhead with automated deadline notices, grading queues, attendance reconciliation, and weekly executive digests.',
      icon: <Zap className="w-5 h-5 text-[#57A889]" />,
      bullets: ['Intelligent submission sorting', 'Automated absence alerts', 'Routine administrative digests', 'Accreditation log compiling'],
      badge: 'Operational Flow',
    },
  ]

  return (
    <section id="ai-section" className="py-24 bg-[#37292B] text-[#FCFDFC] relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-[#AEA1D0]/10 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-0 left-10 w-[450px] h-[450px] bg-[#4866A4]/15 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-[#AEA1D0]/30 text-xs font-semibold uppercase tracking-wider text-[#AEA1D0] mb-4">
            <Sparkles className="w-3.5 h-3.5 text-[#B27F51]" />
            <span>Ethical, Educator-Centered AI</span>
          </div>

          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#FCFDFC] tracking-tight">
            Intelligence that works{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#AEA1D0] via-[#B6C6D7] to-white">
              alongside educators.
            </span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-white/70">
            StudySync AI does not replace professors — it gives them superhuman situational awareness.
            Empowering institutions to intervene with empathy and precision.
          </p>
        </div>

        {/* Large AI Assistant Interaction Interface */}
        <div className="max-w-4xl mx-auto bg-[#2C2123] border border-[#AEA1D0]/30 rounded-3xl p-6 sm:p-8 shadow-2xl mb-16 relative">
          {/* Mockup Header */}
          <div className="flex items-center justify-between pb-4 border-b border-white/10">
            <div className="flex items-center gap-3">
              {/* Animated AI Companion Mini Indicator */}
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#4866A4] to-[#AEA1D0] p-0.5 flex items-center justify-center shadow-md">
                <div className="w-full h-full bg-[#37292B] rounded-[6px] flex items-center justify-center">
                  <Bot className="w-4 h-4 text-[#AEA1D0]" />
                </div>
              </div>
              <div>
                <span className="text-xs font-bold text-white flex items-center gap-1.5">
                  StudySync AI Assistant
                  <span className="w-2 h-2 rounded-full bg-[#57A889]" />
                </span>
                <p className="text-[10px] text-white/60">Cohort: Fall 2026 CS-301 Algorithms</p>
              </div>
            </div>
            <span className="text-[11px] font-semibold text-[#AEA1D0] bg-white/5 border border-white/10 px-2.5 py-1 rounded-full">
              FERPA Compliant Model
            </span>
          </div>

          {/* Conversation Stream */}
          <div className="space-y-4 my-6">
            {/* User Prompt */}
            <div className="flex justify-end">
              <div className="bg-[#4866A4] text-white rounded-2xl rounded-tr-xs px-4 py-3 max-w-md text-xs sm:text-sm font-medium shadow-sm">
                "Which students may need additional support ahead of the midterm?"
              </div>
            </div>

            {/* AI Response */}
            <div className="flex justify-start items-start gap-3">
              <div className="w-7 h-7 rounded-lg bg-[#AEA1D0] text-[#37292B] flex items-center justify-center shrink-0 mt-1">
                <Sparkles className="w-3.5 h-3.5" />
              </div>

              <div className="bg-white/10 border border-[#AEA1D0]/20 text-white rounded-2xl rounded-tl-xs p-5 max-w-xl text-xs sm:text-sm shadow-md">
                <p className="font-semibold text-[#FCFDFC] leading-relaxed">
                  "I analyzed continuous course telemetry and found <span className="text-[#AEA1D0] font-bold">17 students</span> showing a significant decline in engagement over the past 14 days."
                </p>

                {/* 3 Metric Breakdown Badges */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 my-4">
                  <div className="p-2.5 rounded-xl bg-black/20 border border-white/10">
                    <div className="flex items-center gap-1.5 text-red-400 text-xs font-bold">
                      <AlertCircle className="w-3.5 h-3.5" />
                      <span>4 Students</span>
                    </div>
                    <p className="text-[11px] text-white/70 mt-0.5">Missed assignments</p>
                  </div>

                  <div className="p-2.5 rounded-xl bg-black/20 border border-white/10">
                    <div className="flex items-center gap-1.5 text-amber-400 text-xs font-bold">
                      <AlertCircle className="w-3.5 h-3.5" />
                      <span>7 Students</span>
                    </div>
                    <p className="text-[11px] text-white/70 mt-0.5">Reduced portal activity</p>
                  </div>

                  <div className="p-2.5 rounded-xl bg-black/20 border border-white/10">
                    <div className="flex items-center gap-1.5 text-blue-400 text-xs font-bold">
                      <AlertCircle className="w-3.5 h-3.5" />
                      <span>6 Students</span>
                    </div>
                    <p className="text-[11px] text-white/70 mt-0.5">Assessment score drops</p>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap items-center gap-2.5 pt-2">
                  <button className="px-3.5 py-1.5 bg-[#AEA1D0] hover:bg-[#9579AE] text-[#37292B] text-xs font-bold rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer">
                    <Users className="w-3.5 h-3.5" />
                    <span>View 17 students</span>
                  </button>

                  <button className="px-3.5 py-1.5 bg-white/10 hover:bg-white/20 text-white text-xs font-bold rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer">
                    <FileText className="w-3.5 h-3.5" />
                    <span>Prepare intervention summary</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* AI Capabilities 4-Grid */}
        <div>
          <div className="text-center mb-8">
            <span className="text-xs font-bold uppercase tracking-wider text-[#AEA1D0]">
              Institutional AI Architecture
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold text-[#FCFDFC] mt-1">
              Four pillars of intelligent assistance.
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {capabilities.map((cap, idx) => (
              <motion.div
                key={cap.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                onClick={() => setActiveCapability(idx)}
                className={`p-6 rounded-3xl transition-all duration-300 cursor-pointer border flex flex-col justify-between ${
                  activeCapability === idx
                    ? 'bg-[#2C2123] border-[#AEA1D0] shadow-xl shadow-[#AEA1D0]/10'
                    : 'bg-[#2C2123]/60 border-white/10 hover:border-white/20 hover:bg-[#2C2123]'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
                      {cap.icon}
                    </div>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-white/10 text-[#AEA1D0]">
                      {cap.badge}
                    </span>
                  </div>

                  <h4 className="text-xl font-bold text-white">{cap.title}</h4>
                  <p className="text-xs font-semibold text-[#AEA1D0] mt-0.5">{cap.tagline}</p>
                  <p className="text-xs text-white/70 mt-3 leading-relaxed">{cap.description}</p>
                </div>

                <div className="mt-6 pt-4 border-t border-white/10 space-y-1.5">
                  {cap.bullets.map((b) => (
                    <div key={b} className="flex items-center gap-2 text-[11px] text-white/80">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#57A889] shrink-0" />
                      <span className="truncate">{b}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
