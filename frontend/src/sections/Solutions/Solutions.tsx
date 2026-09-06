import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  GraduationCap,
  School,
  Building,
  Briefcase,
  Layers,
  CheckCircle2,
  ArrowRight,
} from 'lucide-react'

export const Solutions = () => {
  const [activeSolution, setActiveSolution] = useState<string>('universities')

  const solutions = [
    {
      id: 'universities',
      title: 'Universities',
      icon: <GraduationCap className="w-4 h-4" />,
      tagline: 'One platform for departments, programs, faculty, and thousands of learners.',
      description: 'Engineered to handle complex collegiate governance, multiple faculties, joint degree programs, research credit tracking, and seamless SIS integrations.',
      highlights: [
        'Multi-faculty academic taxonomy',
        'Tenure-track research & lab module tracking',
        'Mass scale cohort registration (50,000+ students)',
        'Enterprise SSO & federated identity authentication',
      ],
      stat: '50,000+ Concurrent Learners',
    },
    {
      id: 'colleges',
      title: 'Colleges',
      icon: <Building className="w-4 h-4" />,
      tagline: 'Agile curriculum delivery and student career pathway tracking.',
      description: 'Support blended vocational and undergraduate degrees with practical assessments, credit transfers, and workforce apprentice roadmaps.',
      highlights: [
        'Applied coursework & lab milestone tracking',
        'Hybrid in-person & digital lesson attendance',
        'Fast faculty onboarding & standardized rubrics',
        'Integrated career pathway portfolio exports',
      ],
      stat: '94% On-time Degree Progress',
    },
    {
      id: 'schools',
      title: 'Schools (K-12)',
      icon: <School className="w-4 h-4" />,
      tagline: 'A connected learning environment for teachers, students, and administrators.',
      description: 'A friendly, high-trust environment where young learners build agency, teachers save hours on prep, and parents stay informed without friction.',
      highlights: [
        'Safe, age-tailored interface modes',
        'Parent guardian portal with weekly summaries',
        'State standard curriculum alignment',
        'Teacher gradebook and standards mastery tracker',
      ],
      stat: '100% COPPA/FERPA Compliant',
    },
    {
      id: 'academies',
      title: 'Academies',
      icon: <Layers className="w-4 h-4" />,
      tagline: 'Cohort-based learning with high peer engagement and accountability.',
      description: 'Ideal for specialized bootcamps, language institutes, and STEM academies running intensive sprint cycles and project-driven evaluations.',
      highlights: [
        'Sprint-based module unlocking',
        'Live peer code & portfolio reviews',
        'Automated verifiable digital certificates',
        'Dynamic mentor office hours scheduling',
      ],
      stat: '3.8x Higher Completion Rates',
    },
    {
      id: 'training',
      title: 'Training Organizations',
      icon: <Briefcase className="w-4 h-4" />,
      tagline: 'Deliver structured learning and understand learner outcomes.',
      description: 'Modern workforce readiness, corporate compliance academies, and professional credentialing with granular ROI and skill analytics.',
      highlights: [
        'B2B customer organization partitioning',
        'Micro-credentials & verifiable badges',
        'Manager oversight & team progress reporting',
        'SCORM / xAPI / modern API compatibility',
      ],
      stat: '85% Skill Application Rate',
    },
  ]

  const active = solutions.find((s) => s.id === activeSolution) || solutions[0]

  return (
    <section id="solutions" className="py-24 bg-[#FCFDFC] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#4866A4] mb-2 block">
            Tailored Implementation
          </span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#37292B] tracking-tight">
            Built for your scale.{' '}
            <span className="text-[#9579AE]">Configured for your mission.</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#37292B]/70">
            From research universities to specialized academies, StudySync adapts seamlessly to your
            pedagogical architecture.
          </p>
        </div>

        {/* Horizontal Tab Buttons */}
        <div className="flex items-center justify-center gap-2 max-w-3xl mx-auto mb-12 p-1.5 rounded-full bg-[#F5F9F8] border border-[#AEA1D0]/30 overflow-x-auto">
          {solutions.map((s) => (
            <button
              key={s.id}
              onClick={() => setActiveSolution(s.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                activeSolution === s.id
                  ? 'bg-[#37292B] text-white shadow-xs'
                  : 'text-[#37292B]/70 hover:text-[#37292B] hover:bg-white/60'
              }`}
            >
              {s.icon}
              <span>{s.title}</span>
            </button>
          ))}
        </div>

        {/* Content Box */}
        <div className="max-w-5xl mx-auto backdrop-blur-xl bg-[#F5F9F8] border border-[#AEA1D0]/30 rounded-3xl p-8 sm:p-12 shadow-lg">
          <AnimatePresence mode="wait">
            <motion.div
              key={active.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
            >
              <div className="lg:col-span-7">
                <span className="text-xs font-bold uppercase tracking-wider text-[#9579AE]">
                  Solution Profile
                </span>
                <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-[#37292B] mt-1">
                  {active.tagline}
                </h3>
                <p className="mt-4 text-sm sm:text-base text-[#37292B]/75 leading-relaxed">
                  {active.description}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-6">
                  {active.highlights.map((h) => (
                    <div key={h} className="flex items-start gap-2 text-xs font-semibold text-[#37292B]">
                      <CheckCircle2 className="w-4 h-4 text-[#57A889] shrink-0 mt-0.5" />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-8 flex items-center gap-4">
                  <a
                    href="#pricing"
                    className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full text-xs font-bold text-white bg-[#37292B] hover:bg-[#4866A4] transition-colors"
                  >
                    <span>Request custom architecture</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>

              {/* Right Side Metric Showcase Card */}
              <div className="lg:col-span-5 bg-white rounded-2xl border border-[#AEA1D0]/30 p-6 sm:p-8 shadow-sm text-center">
                <div className="w-14 h-14 rounded-2xl bg-[#F5F9F8] border border-[#AEA1D0]/20 flex items-center justify-center mx-auto text-[#4866A4] mb-4">
                  {active.icon}
                </div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#37292B]/60">
                  Institutional Benchmark
                </span>
                <p className="text-2xl sm:text-3xl font-black text-[#37292B] mt-1">
                  {active.stat}
                </p>
                <p className="text-xs text-[#37292B]/60 mt-2">
                  Proven across active deployments in leading higher-ed & secondary institutions.
                </p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
