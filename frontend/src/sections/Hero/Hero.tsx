import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  ArrowRight,
  CheckCircle2,
  Sparkles,
  TrendingUp,
  Users,
  GraduationCap,
  BookOpen,
  Play,
  Layers,
} from 'lucide-react'
import { AICompanion } from '../../components/AICompanion'
import { FloatingCard } from '../../components/FloatingCard'

export const Hero = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { clientX, clientY, currentTarget } = e
    const rect = currentTarget.getBoundingClientRect()
    const x = (clientX - rect.left) / rect.width - 0.5
    const y = (clientY - rect.top) / rect.height - 0.5
    setMousePosition({ x, y })
  }

  return (
    <section
      onMouseMove={handleMouseMove}
      className="relative min-h-screen pt-28 pb-20 lg:pt-36 lg:pb-32 overflow-hidden bg-gradient-to-b from-[#F5F9F8] via-[#F5F9F8] to-[#EEEAF5] flex flex-col justify-center"
    >
      {/* Delicate background ambient aura shapes */}
      <div className="absolute top-12 left-1/2 -translate-x-1/2 w-[720px] h-[450px] bg-gradient-to-tr from-[#AEA1D0]/20 via-[#B6C6D7]/25 to-transparent rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-10 right-10 w-[500px] h-[350px] bg-gradient-to-bl from-[#9579AE]/15 via-[#F5F9F8] to-transparent rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* Top Text Content */}
        <div className="max-w-4xl mx-auto text-center mb-12 sm:mb-16">
          {/* Eyebrow badge */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FCFDFC] border border-[#AEA1D0]/30 shadow-xs mb-6 text-xs font-semibold uppercase tracking-wider text-[#9579AE]"
          >
            <span className="flex h-2 w-2 rounded-full bg-[#4866A4]" />
            <span>INTELLIGENT LEARNING INFRASTRUCTURE</span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="font-display text-[44px] sm:text-[64px] lg:text-[84px] leading-[1.05] tracking-tight font-extrabold text-[#37292B] mb-6"
          >
            Learning,{' '}
            <span className="relative inline-block text-transparent bg-clip-text bg-gradient-to-r from-[#37292B] via-[#4866A4] to-[#9579AE]">
              finally in sync.
              <svg
                className="absolute -bottom-2 left-0 w-full h-3 text-[#AEA1D0]/60 -z-10"
                viewBox="0 0 300 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M2 9C75 2 225 2 298 9"
                  stroke="currentColor"
                  strokeWidth="4"
                  strokeLinecap="round"
                />
              </svg>
            </span>
          </motion.h1>

          {/* Supporting Copy */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-base sm:text-lg lg:text-xl text-[#37292B]/75 max-w-2xl mx-auto font-normal leading-relaxed mb-8"
          >
            One intelligent platform for institutions, educators, and every learner —
            bringing teaching, learning, administration, analytics, and AI together.
          </motion.p>

          {/* Action CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col sm:flex-row items-center justify-center gap-3.5"
          >
            <a
              href="#pricing"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full text-[15px] font-semibold text-white bg-[#37292B] hover:bg-[#4866A4] shadow-md shadow-[#37292B]/10 hover:shadow-lg hover:shadow-[#4866A4]/20 transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0"
            >
              <span>Book a demo</span>
              <ArrowRight className="w-4 h-4" />
            </a>

            <a
              href="#platform"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full text-[15px] font-semibold text-[#37292B] bg-[#FCFDFC] hover:bg-[#F5F9F8] border border-[#AEA1D0]/30 shadow-xs hover:border-[#AEA1D0]/60 transition-all duration-300"
            >
              <Play className="w-4 h-4 text-[#9579AE] fill-[#9579AE]/20" />
              <span>Explore the platform</span>
            </a>
          </motion.div>
        </div>

        {/* Hero Visual Editorial Composition (ZenEd Inspired: Human Cutouts + Realistic UI + AI Companion) */}
        <div className="relative mt-8 max-w-6xl mx-auto">
          {/* Parallax wrapper driven by mouse */}
          <motion.div
            animate={{
              x: mousePosition.x * -18,
              y: mousePosition.y * -14,
            }}
            transition={{ type: 'spring', damping: 25, stiffness: 100 }}
            className="relative grid grid-cols-1 lg:grid-cols-12 gap-6 items-center"
          >
            {/* Left side: Realistic StudySync Product UI Card */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.9, delay: 0.35 }}
              className="lg:col-span-5 order-2 lg:order-1 relative z-20"
            >
              <div className="backdrop-blur-xl bg-[#FCFDFC]/95 border border-[#AEA1D0]/30 rounded-3xl p-6 shadow-2xl shadow-[#37292B]/10 transform -rotate-1 hover:rotate-0 transition-transform duration-500">
                {/* Header inside UI */}
                <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-[#37292B] flex items-center justify-center text-white">
                      <GraduationCap className="w-4 h-4 text-[#AEA1D0]" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-[#37292B] tracking-tight">StudySync LMS</h4>
                      <p className="text-[11px] text-[#37292B]/60">University of Advanced Sciences</p>
                    </div>
                  </div>
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-[#57A889]/10 text-[#57A889] border border-[#57A889]/20">
                    Live Session
                  </span>
                </div>

                {/* Greeting & Scope */}
                <div className="mt-4">
                  <span className="text-[11px] font-medium text-[#9579AE] uppercase tracking-wider">
                    Institutional Overview
                  </span>
                  <h3 className="text-base font-bold text-[#37292B] mt-0.5">
                    Good morning, Sarah
                  </h3>
                  <p className="text-xs text-[#37292B]/70 mt-0.5">
                    All academic departments are operating in sync.
                  </p>
                </div>

                {/* 3 Metric Pills */}
                <div className="grid grid-cols-3 gap-2.5 mt-4">
                  <div className="bg-[#F5F9F8] rounded-xl p-2.5 border border-[#AEA1D0]/20">
                    <div className="flex items-center gap-1 text-[#4866A4] text-[10px] font-semibold">
                      <Users className="w-3 h-3" />
                      <span>Students</span>
                    </div>
                    <p className="text-sm font-bold text-[#37292B] mt-1">12,482</p>
                  </div>

                  <div className="bg-[#F5F9F8] rounded-xl p-2.5 border border-[#AEA1D0]/20">
                    <div className="flex items-center gap-1 text-[#57A889] text-[10px] font-semibold">
                      <CheckCircle2 className="w-3 h-3" />
                      <span>Completion</span>
                    </div>
                    <p className="text-sm font-bold text-[#37292B] mt-1">87%</p>
                  </div>

                  <div className="bg-[#F5F9F8] rounded-xl p-2.5 border border-[#AEA1D0]/20">
                    <div className="flex items-center gap-1 text-[#B27F51] text-[10px] font-semibold">
                      <TrendingUp className="w-3 h-3" />
                      <span>Engagement</span>
                    </div>
                    <p className="text-sm font-bold text-[#37292B] mt-1">+18.4%</p>
                  </div>
                </div>

                {/* AI Insight Box inside UI */}
                <div className="mt-4 p-3.5 rounded-2xl bg-gradient-to-br from-[#EEEAF5] to-[#FCFDFC] border border-[#AEA1D0]/40">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-[#9579AE]">
                      <Sparkles className="w-3.5 h-3.5 text-[#B27F51]" />
                      <span>AI Advisory Insight</span>
                    </div>
                    <span className="text-[10px] font-medium text-[#4866A4] bg-white px-2 py-0.5 rounded-full shadow-2xs">
                      Real-time
                    </span>
                  </div>
                  <p className="text-xs text-[#37292B] mt-2 font-medium">
                    17 learners in CS-301 may benefit from module review before Friday's assessment.
                  </p>
                  <a
                    href="#platform"
                    className="inline-flex items-center gap-1 text-[11.5px] font-bold text-[#4866A4] hover:underline mt-2"
                  >
                    <span>View cohort breakdown</span>
                    <ArrowRight className="w-3 h-3" />
                  </a>
                </div>
              </div>

              {/* AI Companion attached right below */}
              <div className="mt-4">
                <AICompanion
                  message="I found something worth your attention."
                  subtext="17 students are showing a drop in engagement in Data Structures."
                  actionLabel="Analyze cohort data"
                />
              </div>
            </motion.div>

            {/* Right side: Editorial Human Cutouts & Organic Mask Composition */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.9, delay: 0.25 }}
              className="lg:col-span-7 order-1 lg:order-2 relative flex items-center justify-center"
            >
              {/* Central Primary Human: Confident University Student with Organic Arch Mask */}
              <div className="relative w-full max-w-md mx-auto aspect-[4/5] rounded-[42px] overflow-hidden shadow-2xl shadow-[#37292B]/15 border-4 border-[#FCFDFC] bg-[#EEEAF5]">
                <img
                  src="/assets/student_hero.jpg"
                  alt="University student learning with StudySync"
                  className="w-full h-full object-cover object-center transform hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#37292B]/60 via-transparent to-transparent" />
                <div className="absolute bottom-5 left-5 right-5 text-white">
                  <span className="text-[10px] uppercase font-bold tracking-widest text-[#AEA1D0] bg-[#37292B]/80 backdrop-blur-sm px-2.5 py-1 rounded-full border border-white/10">
                    Learner Experience
                  </span>
                  <p className="text-sm font-bold mt-1.5 text-white">
                    Maya Lin — Computer Science Junior
                  </p>
                  <p className="text-xs text-[#FCFDFC]/80">
                    94% Mastery · 4 Modules Completed Ahead of Schedule
                  </p>
                </div>
              </div>

              {/* Secondary Human Visual: Professor portrait thumbnail badge */}
              <motion.div
                animate={{
                  y: [4, -4, 4],
                }}
                transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -top-6 -left-4 sm:-left-8 backdrop-blur-xl bg-[#FCFDFC]/95 border border-[#AEA1D0]/30 shadow-xl rounded-2xl p-2.5 flex items-center gap-3 z-30"
              >
                <div className="w-12 h-12 rounded-xl overflow-hidden shrink-0 border border-slate-200">
                  <img
                    src="/assets/educator_hero.jpg"
                    alt="University Professor"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="pr-2">
                  <span className="text-[9.5px] uppercase font-bold text-[#9579AE] tracking-wider block">
                    Faculty Lead
                  </span>
                  <span className="text-xs font-bold text-[#37292B] block">
                    Dr. Evelyn Reed
                  </span>
                  <span className="text-[11px] text-[#57A889] font-semibold flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#57A889]" />
                    Reviewing 42 Submissions
                  </span>
                </div>
              </motion.div>

              {/* Third Human Visual: Institutional Administrator badge */}
              <motion.div
                animate={{
                  y: [-5, 5, -5],
                }}
                transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                className="absolute -bottom-6 -right-2 sm:-right-6 backdrop-blur-xl bg-[#FCFDFC]/95 border border-[#AEA1D0]/30 shadow-xl rounded-2xl p-2.5 flex items-center gap-3 z-30"
              >
                <div className="w-12 h-12 rounded-xl overflow-hidden shrink-0 border border-slate-200">
                  <img
                    src="/assets/admin_hero.jpg"
                    alt="Institution Administrator"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="pr-2">
                  <span className="text-[9.5px] uppercase font-bold text-[#4866A4] tracking-wider block">
                    Academic Dean
                  </span>
                  <span className="text-xs font-bold text-[#37292B] block">
                    Dean Vance
                  </span>
                  <span className="text-[11px] text-[#37292B]/70 font-medium">
                    5 Faculties in Sync
                  </span>
                </div>
              </motion.div>

              {/* Floating Product Elements */}
              <FloatingCard
                icon={<CheckCircle2 className="w-4 h-4 text-[#57A889]" />}
                title="Assignment submitted"
                subtitle="Data Structures · Binary Trees"
                badge="On Time"
                className="top-12 -right-4 sm:right-4"
                delay={0.2}
                duration={5.5}
              />

              <FloatingCard
                icon={<TrendingUp className="w-4 h-4 text-[#4866A4]" />}
                title="94% Course progress"
                subtitle="CS-301 · 8 Modules Complete"
                badge="+12%"
                badgeColor="bg-[#4866A4]/10 text-[#4866A4] border-[#4866A4]/20"
                className="bottom-24 -left-4 sm:left-2"
                delay={0.6}
                duration={6.2}
              />

              <FloatingCard
                icon={<BookOpen className="w-4 h-4 text-[#9579AE]" />}
                title="New course live"
                subtitle="Machine Learning Fundamentals"
                badge="Enrolling"
                badgeColor="bg-[#9579AE]/10 text-[#9579AE] border-[#9579AE]/20"
                className="top-1/2 -right-6 hidden sm:flex"
                delay={1}
                duration={7}
              />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
