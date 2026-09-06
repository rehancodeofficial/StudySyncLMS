import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  BookOpen,
  GraduationCap,
  Network,
  BarChart3,
  Sparkles,
  CheckCircle2,
  Clock,
  ChevronRight,
  Users,
  Building2,
  FolderGit2,
  Layers,
  ArrowUpRight,
} from 'lucide-react'

export const Platform = () => {
  const [activeTab, setActiveTab] = useState<'teach' | 'learn' | 'manage' | 'analyze' | 'ai'>('teach')

  const tabs = [
    { id: 'teach', label: 'Teach', icon: <BookOpen className="w-4 h-4" /> },
    { id: 'learn', label: 'Learn', icon: <GraduationCap className="w-4 h-4" /> },
    { id: 'manage', label: 'Manage', icon: <Network className="w-4 h-4" /> },
    { id: 'analyze', label: 'Analyze', icon: <BarChart3 className="w-4 h-4" /> },
    { id: 'ai', label: 'AI Suite', icon: <Sparkles className="w-4 h-4" /> },
  ] as const

  return (
    <section id="platform" className="py-24 bg-[#FCFDFC] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#9579AE] mb-2 block">
            The Product Experience
          </span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#37292B] tracking-tight">
            Everything your institution needs.{' '}
            <span className="text-[#4866A4]">In sync.</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#37292B]/70">
            A unified interface tailored for faculty workflows, student engagement, administrative
            taxonomy, and predictive academic intelligence.
          </p>
        </div>

        {/* Tab Selector Navigation */}
        <div className="flex items-center justify-center gap-1.5 sm:gap-2 max-w-xl mx-auto mb-10 p-1.5 rounded-full bg-[#F5F9F8] border border-[#AEA1D0]/30 shadow-xs overflow-x-auto">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                  isActive
                    ? 'bg-[#37292B] text-white shadow-sm shadow-[#37292B]/20'
                    : 'text-[#37292B]/70 hover:text-[#37292B] hover:bg-white/60'
                }`}
              >
                <span className={isActive ? 'text-[#AEA1D0]' : 'text-[#37292B]/60'}>{tab.icon}</span>
                <span>{tab.label}</span>
              </button>
            )
          })}
        </div>

        {/* Tab Content Visualization Card */}
        <div className="max-w-5xl mx-auto backdrop-blur-xl bg-[#F5F9F8] border border-[#AEA1D0]/30 rounded-3xl p-6 sm:p-10 shadow-xl relative min-h-[500px]">
          <AnimatePresence mode="wait">
            {/* TEACH TAB */}
            {activeTab === 'teach' && (
              <motion.div
                key="teach"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.35 }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
              >
                <div className="lg:col-span-5">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#9579AE] mb-3">
                    <BookOpen className="w-4 h-4" />
                    <span>Educator Workspace</span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-bold text-[#37292B] tracking-tight">
                    Give educators more time to teach.
                  </h3>
                  <p className="mt-3 text-sm text-[#37292B]/75 leading-relaxed">
                    Build rich multi-week syllabi, auto-structure modules, distribute assignments, and let
                    pedagogy AI draft custom rubrics and practice problem sets in seconds.
                  </p>

                  <div className="mt-6 space-y-2.5">
                    {['Modular Course Builder', 'Automated Grading Assistance', 'Adaptive Question Banks', 'Live Session Integration'].map((item) => (
                      <div key={item} className="flex items-center gap-2.5 text-xs font-medium text-[#37292B]">
                        <CheckCircle2 className="w-4 h-4 text-[#57A889]" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-8 pt-6 border-t border-[#AEA1D0]/20 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full overflow-hidden border border-slate-200">
                      <img src="/assets/educator_hero.jpg" alt="Instructor" className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-[#37292B]">Dr. Evelyn Reed</p>
                      <p className="text-[11px] text-[#37292B]/60">Department of Computer Science</p>
                    </div>
                  </div>
                </div>

                {/* Teach Interactive Visual Mockup */}
                <div className="lg:col-span-7 bg-white rounded-2xl border border-[#AEA1D0]/30 shadow-md p-5 sm:p-6">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#57A889]" />
                      <h4 className="text-xs font-bold text-[#37292B]">Course Studio: CS-301 Algorithms</h4>
                    </div>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#9579AE]/10 text-[#9579AE]">
                      Editing Module 04
                    </span>
                  </div>

                  <div className="mt-4 space-y-2.5">
                    <div className="p-3 rounded-xl bg-[#F5F9F8] border border-slate-200 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="w-6 h-6 rounded-md bg-white text-xs font-bold flex items-center justify-center text-[#37292B]">01</span>
                        <div>
                          <p className="text-xs font-bold text-[#37292B]">Asymptotic Analysis & Big O</p>
                          <p className="text-[10px] text-[#37292B]/60">4 Lessons · 1 Quiz · 98% Completed</p>
                        </div>
                      </div>
                      <span className="text-xs font-bold text-[#57A889]">Published</span>
                    </div>

                    <div className="p-3 rounded-xl bg-white border-2 border-[#4866A4] shadow-xs flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="w-6 h-6 rounded-md bg-[#4866A4] text-white text-xs font-bold flex items-center justify-center">02</span>
                        <div>
                          <p className="text-xs font-bold text-[#37292B]">Self-Balancing Binary Trees</p>
                          <p className="text-[10px] text-[#4866A4] font-semibold">Active Unit · 38 Submissions Ready for AI Review</p>
                        </div>
                      </div>
                      <button className="px-2.5 py-1 rounded-lg bg-[#4866A4] text-white text-[11px] font-bold">
                        Review
                      </button>
                    </div>

                    <div className="p-3 rounded-xl bg-[#F5F9F8] border border-slate-200 flex items-center justify-between opacity-75">
                      <div className="flex items-center gap-3">
                        <span className="w-6 h-6 rounded-md bg-white text-xs font-bold flex items-center justify-center text-[#37292B]">03</span>
                        <div>
                          <p className="text-xs font-bold text-[#37292B]">Graph Traversals (BFS & DFS)</p>
                          <p className="text-[10px] text-[#37292B]/60">Drafting · Scheduled for Oct 12</p>
                        </div>
                      </div>
                      <span className="text-xs font-bold text-[#9579AE]">Draft</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* LEARN TAB */}
            {activeTab === 'learn' && (
              <motion.div
                key="learn"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.35 }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
              >
                <div className="lg:col-span-5">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#4866A4] mb-3">
                    <GraduationCap className="w-4 h-4" />
                    <span>Student Experience</span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-bold text-[#37292B] tracking-tight">
                    Make progress visible.
                  </h3>
                  <p className="mt-3 text-sm text-[#37292B]/75 leading-relaxed">
                    Learners always know where they stand. Clean deadline roadmaps, integrated submissions,
                    and continuous feedback foster agency and achievement.
                  </p>

                  <div className="mt-6 space-y-2.5">
                    {['Personalized Learning Timeline', 'Mobile Responsive Assignments', 'Instant Automated Diagnostic Feedback', 'Portfolio & Credential Sync'].map((item) => (
                      <div key={item} className="flex items-center gap-2.5 text-xs font-medium text-[#37292B]">
                        <CheckCircle2 className="w-4 h-4 text-[#57A889]" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-8 pt-6 border-t border-[#AEA1D0]/20 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full overflow-hidden border border-slate-200">
                      <img src="/assets/student_hero.jpg" alt="Student" className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-[#37292B]">Maya Lin</p>
                      <p className="text-[11px] text-[#37292B]/60">Undergraduate · Cumulative GPA 3.84</p>
                    </div>
                  </div>
                </div>

                {/* Learn Student UI Mockup */}
                <div className="lg:col-span-7 bg-white rounded-2xl border border-[#AEA1D0]/30 shadow-md p-5 sm:p-6">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                    <div>
                      <span className="text-[10px] font-bold text-[#4866A4] uppercase tracking-wider">My Learning</span>
                      <h4 className="text-base font-bold text-[#37292B]">Data Structures & Algorithms</h4>
                    </div>
                    <span className="text-xs font-extrabold px-2.5 py-1 rounded-full bg-[#57A889]/15 text-[#57A889]">
                      Current Grade: A-
                    </span>
                  </div>

                  {/* Progress Bar */}
                  <div className="mt-4">
                    <div className="flex justify-between text-xs font-bold text-[#37292B] mb-1.5">
                      <span>Course Progress</span>
                      <span>82% Complete</span>
                    </div>
                    <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                      <div className="w-[82%] h-full bg-gradient-to-r from-[#4866A4] to-[#57A889] rounded-full" />
                    </div>
                  </div>

                  {/* Next Lesson and Pending Assignment */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-5">
                    <div className="p-3.5 rounded-xl bg-[#F5F9F8] border border-slate-200">
                      <span className="text-[10px] font-bold text-[#9579AE] uppercase tracking-wider block">
                        Next Lesson
                      </span>
                      <h5 className="text-xs font-bold text-[#37292B] mt-1">
                        Binary Search Trees
                      </h5>
                      <p className="text-[11px] text-[#37292B]/60 mt-0.5">Estimated: 35 mins</p>
                      <button className="mt-3 text-xs font-bold text-[#4866A4] hover:underline flex items-center gap-1">
                        <span>Resume Lesson</span>
                        <ChevronRight className="w-3 h-3" />
                      </button>
                    </div>

                    <div className="p-3.5 rounded-xl bg-amber-50/50 border border-amber-200">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-bold text-amber-800 uppercase tracking-wider">
                          Assignment
                        </span>
                        <span className="text-[10px] font-bold text-red-600 flex items-center gap-1">
                          <Clock className="w-3 h-3" /> Due Tomorrow
                        </span>
                      </div>
                      <h5 className="text-xs font-bold text-[#37292B] mt-1">
                        AVL Tree Balancing Lab
                      </h5>
                      <p className="text-[11px] text-[#37292B]/60 mt-0.5">Worth 10% of Final</p>
                      <button className="mt-3 px-3 py-1 bg-[#37292B] text-white text-xs font-bold rounded-lg hover:bg-[#4866A4] transition-colors">
                        Submit Work
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* MANAGE TAB */}
            {activeTab === 'manage' && (
              <motion.div
                key="manage"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.35 }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
              >
                <div className="lg:col-span-5">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#B27F51] mb-3">
                    <Building2 className="w-4 h-4" />
                    <span>Academic Structure</span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-bold text-[#37292B] tracking-tight">
                    Your institution. One connected system.
                  </h3>
                  <p className="mt-3 text-sm text-[#37292B]/75 leading-relaxed">
                    Reflect your true institutional hierarchy without compromises. Map universities,
                    faculties, departments, degree programs, and courses in an intuitive unified tree.
                  </p>

                  <div className="mt-6 space-y-2.5">
                    {['Hierarchical Taxonomy Modeling', 'Granular Role-Based Permissions (RBAC)', 'Cross-Department Cohort Sharing', 'Centralized Term & Session Calendars'].map((item) => (
                      <div key={item} className="flex items-center gap-2.5 text-xs font-medium text-[#37292B]">
                        <CheckCircle2 className="w-4 h-4 text-[#57A889]" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Manage Hierarchy Interactive Tree Mockup */}
                <div className="lg:col-span-7 bg-white rounded-2xl border border-[#AEA1D0]/30 shadow-md p-6">
                  <div className="text-xs font-bold uppercase tracking-wider text-[#37292B]/60 mb-3">
                    Interactive Organization Hierarchy
                  </div>

                  <div className="space-y-3">
                    {/* Node 1: Institution */}
                    <div className="p-3 rounded-xl bg-[#37292B] text-white flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <Building2 className="w-4 h-4 text-[#AEA1D0]" />
                        <span className="text-xs font-bold">Metropolitan University (Institution Tenant)</span>
                      </div>
                      <span className="text-[10px] bg-white/20 px-2 py-0.5 rounded-md font-semibold">Root</span>
                    </div>

                    {/* Node 2: Departments */}
                    <div className="pl-6 border-l-2 border-dashed border-[#AEA1D0]/40 space-y-2">
                      <div className="p-2.5 rounded-lg bg-[#F5F9F8] border border-slate-200 flex items-center justify-between">
                        <div className="flex items-center gap-2 text-xs font-bold text-[#37292B]">
                          <FolderGit2 className="w-3.5 h-3.5 text-[#4866A4]" />
                          <span>School of Engineering & Computing</span>
                        </div>
                        <span className="text-[10px] text-[#4866A4] font-bold">4 Programs</span>
                      </div>

                      {/* Node 3: Program */}
                      <div className="pl-6 border-l-2 border-dashed border-[#AEA1D0]/40 space-y-2">
                        <div className="p-2.5 rounded-lg bg-white border border-[#4866A4]/40 shadow-xs flex items-center justify-between">
                          <div className="flex items-center gap-2 text-xs font-semibold text-[#37292B]">
                            <BookOpen className="w-3.5 h-3.5 text-[#9579AE]" />
                            <span>B.S. Computer Science (2026-2030)</span>
                          </div>
                          <span className="text-[10px] bg-[#9579AE]/10 text-[#9579AE] px-2 py-0.5 rounded-md font-bold">
                            32 Courses
                          </span>
                        </div>

                        {/* Node 4: Cohort & Faculty */}
                        <div className="pl-6 border-l-2 border-dashed border-[#AEA1D0]/40 flex items-center gap-3">
                          <span className="text-[11px] font-medium text-[#37292B]/70 bg-[#F5F9F8] px-2.5 py-1 rounded-md border border-slate-200">
                            👥 480 Enrolled Students
                          </span>
                          <span className="text-[11px] font-medium text-[#37292B]/70 bg-[#F5F9F8] px-2.5 py-1 rounded-md border border-slate-200">
                            🎓 18 Faculty Instructors
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* ANALYZE TAB */}
            {activeTab === 'analyze' && (
              <motion.div
                key="analyze"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.35 }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
              >
                <div className="lg:col-span-5">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#57A889] mb-3">
                    <BarChart3 className="w-4 h-4" />
                    <span>Cohort Intelligence</span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-bold text-[#37292B] tracking-tight">
                    See what's happening across your institution.
                  </h3>
                  <p className="mt-3 text-sm text-[#37292B]/75 leading-relaxed">
                    Transform raw LMS logs into predictive interventions. Identify at-risk students before
                    finals, monitor faculty workload, and export accredited compliance tables.
                  </p>

                  <div className="mt-6 space-y-2.5">
                    {['Real-time Longitudinal Retention', 'Automated At-Risk Early Warning System', 'Accreditation-Ready Learning Outcomes', 'Exportable FERPA & Privacy-Safe Reports'].map((item) => (
                      <div key={item} className="flex items-center gap-2.5 text-xs font-medium text-[#37292B]">
                        <CheckCircle2 className="w-4 h-4 text-[#57A889]" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Analytics Metric Showcase */}
                <div className="lg:col-span-7 bg-white rounded-2xl border border-[#AEA1D0]/30 shadow-md p-6">
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
                    <div className="p-3 rounded-xl bg-[#F5F9F8] border border-slate-200 text-center">
                      <span className="text-[10px] font-bold text-[#37292B]/60 uppercase">Active Learners</span>
                      <p className="text-lg font-black text-[#37292B] mt-0.5">12,482</p>
                      <span className="text-[10px] font-bold text-[#57A889]">+9.4% MoM</span>
                    </div>

                    <div className="p-3 rounded-xl bg-[#F5F9F8] border border-slate-200 text-center">
                      <span className="text-[10px] font-bold text-[#37292B]/60 uppercase">Completion</span>
                      <p className="text-lg font-black text-[#37292B] mt-0.5">87.4%</p>
                      <span className="text-[10px] font-bold text-[#57A889]">Above Target</span>
                    </div>

                    <div className="p-3 rounded-xl bg-[#F5F9F8] border border-slate-200 text-center">
                      <span className="text-[10px] font-bold text-[#37292B]/60 uppercase">Engagement</span>
                      <p className="text-lg font-black text-[#37292B] mt-0.5">+18.6%</p>
                      <span className="text-[10px] font-bold text-[#4866A4]">Platform High</span>
                    </div>

                    <div className="p-3 rounded-xl bg-[#F5F9F8] border border-slate-200 text-center">
                      <span className="text-[10px] font-bold text-[#37292B]/60 uppercase">Submission Rate</span>
                      <p className="text-lg font-black text-[#37292B] mt-0.5">91.2%</p>
                      <span className="text-[10px] font-bold text-[#57A889]">On Time</span>
                    </div>
                  </div>

                  {/* Clean Visual Bar Trend Representation */}
                  <div className="p-4 rounded-xl bg-[#F5F9F8] border border-slate-200">
                    <div className="flex items-center justify-between text-xs font-bold text-[#37292B] mb-3">
                      <span>Weekly Academic Engagement Curve</span>
                      <span className="text-[11px] text-[#4866A4]">Term Week 07</span>
                    </div>
                    <div className="flex items-end gap-2 h-24 pt-4 px-2">
                      {[45, 62, 58, 75, 82, 90, 88].map((val, i) => (
                        <div key={i} className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end">
                          <div
                            style={{ height: `${val}%` }}
                            className="w-full bg-gradient-to-t from-[#4866A4] to-[#AEA1D0] rounded-t-sm transition-all hover:opacity-80"
                          />
                          <span className="text-[9px] font-semibold text-[#37292B]/60">
                            {['M', 'T', 'W', 'T', 'F', 'S', 'S'][i]}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* AI SUITE TAB */}
            {activeTab === 'ai' && (
              <motion.div
                key="ai"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.35 }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
              >
                <div className="lg:col-span-5">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#9579AE] mb-3">
                    <Sparkles className="w-4 h-4 text-[#B27F51]" />
                    <span>Embedded Intelligence</span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-bold text-[#37292B] tracking-tight">
                    Intelligence that works alongside educators.
                  </h3>
                  <p className="mt-3 text-sm text-[#37292B]/75 leading-relaxed">
                    Designed specifically for institutional education — not a generic chatbot. StudySync AI
                    monitors course telemetry to help educators intervene proactively.
                  </p>
                  <a
                    href="#ai-section"
                    className="mt-6 inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold text-white bg-[#37292B] hover:bg-[#4866A4] transition-colors"
                  >
                    <span>Explore Deep AI Architecture</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                </div>

                <div className="lg:col-span-7 bg-[#37292B] text-white rounded-2xl border border-white/10 shadow-lg p-6">
                  <div className="flex items-center justify-between pb-3 border-b border-white/10">
                    <div className="flex items-center gap-2 text-xs font-bold text-[#AEA1D0]">
                      <Sparkles className="w-4 h-4 text-[#B27F51]" />
                      <span>StudySync AI Core</span>
                    </div>
                    <span className="text-[10px] bg-white/10 px-2.5 py-0.5 rounded-full text-white/80">
                      Predictive Model Active
                    </span>
                  </div>

                  <div className="mt-4 space-y-3">
                    <div className="bg-white/5 border border-white/10 rounded-xl p-3.5 text-xs">
                      <span className="text-[10px] text-white/50 uppercase font-bold block mb-1">Educator Query</span>
                      <p className="font-semibold text-white">"Which students may need additional support before Week 8?"</p>
                    </div>

                    <div className="bg-white/10 border border-[#AEA1D0]/30 rounded-xl p-3.5 text-xs">
                      <span className="text-[10px] text-[#AEA1D0] uppercase font-bold block mb-1">StudySync AI Synthesis</span>
                      <p className="font-medium text-white/90">
                        Identified 17 learners with combined indicators: 4 missed problem sets, 7 reduced LMS activity, 6 drop in quiz averages.
                      </p>
                      <div className="mt-3 flex gap-2">
                        <button className="px-3 py-1 bg-[#4866A4] rounded-lg text-xs font-bold text-white">
                          View Student List
                        </button>
                        <button className="px-3 py-1 bg-white/10 hover:bg-white/20 rounded-lg text-xs font-bold text-white/90">
                          Draft Support Email
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
