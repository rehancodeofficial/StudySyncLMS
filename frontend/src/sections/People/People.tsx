import { motion } from 'framer-motion'
import { CheckCircle2, TrendingUp, BookOpen, BarChart3, ShieldCheck } from 'lucide-react'

export const People = () => {
  return (
    <section className="py-24 bg-[#F5F9F8] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#9579AE] mb-2 block">
            Human-Centered Technology
          </span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#37292B] tracking-tight">
            Designed for the human rhythm of education.
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#37292B]/70">
            Education is profoundly personal. StudySync pairs authentic human pedagogy with
            thoughtful software architecture.
          </p>
        </div>

        {/* 3 Large Editorial Experiences */}
        <div className="space-y-24">
          {/* Experience 1: Student */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="lg:col-span-6 relative"
            >
              <div className="aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-slate-100">
                <img
                  src="/assets/student_hero.jpg"
                  alt="Student learning"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Overlapping Student Progress UI */}
              <div className="absolute -bottom-8 -right-4 sm:right-6 backdrop-blur-xl bg-white/95 border border-[#AEA1D0]/30 shadow-xl rounded-2xl p-4 sm:p-5 max-w-xs z-20">
                <div className="flex items-center justify-between text-xs font-bold text-[#37292B] mb-2">
                  <span>Weekly Milestone Target</span>
                  <span className="text-[#57A889]">100%</span>
                </div>
                <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden mb-3">
                  <div className="w-full h-full bg-[#57A889] rounded-full" />
                </div>
                <p className="text-[11px] text-[#37292B]/70 leading-relaxed">
                  "I never have to guess what is due or how I'm doing. Everything is right there."
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="lg:col-span-6"
            >
              <span className="text-xs font-bold uppercase tracking-wider text-[#4866A4] block mb-2">
                The Learner Experience
              </span>
              <h3 className="font-display text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#37292B]">
                Know where you're going.
              </h3>
              <p className="mt-4 text-sm sm:text-base text-[#37292B]/75 leading-relaxed">
                When students can see their goals clearly, anxiety drops and completion rates climb.
                StudySync provides transparent grade forecasting, clear rubric expectations, and direct
                channels for asynchronous mentor support.
              </p>

              <div className="mt-6 space-y-3">
                {[
                  'Unified multi-course deadline schedule',
                  'Instant diagnostic feedback on code & quiz submissions',
                  'Frictionless mobile learning and reading offline sync',
                ].map((item) => (
                  <div key={item} className="flex items-center gap-2.5 text-xs sm:text-sm font-semibold text-[#37292B]">
                    <CheckCircle2 className="w-4 h-4 text-[#57A889] shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Experience 2: Educator */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="lg:col-span-6 order-2 lg:order-1"
            >
              <span className="text-xs font-bold uppercase tracking-wider text-[#9579AE] block mb-2">
                The Faculty Experience
              </span>
              <h3 className="font-display text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#37292B]">
                Spend more time teaching.
              </h3>
              <p className="mt-4 text-sm sm:text-base text-[#37292B]/75 leading-relaxed">
                Faculty shouldn't be trapped in administrative busywork. StudySync streamlines grading,
                automates routine reminders, and highlights students who need extra encouragement
                before they fall behind.
              </p>

              <div className="mt-6 space-y-3">
                {[
                  'Drag-and-drop course builder with integrated multimedia',
                  'AI-assisted rubric generation and peer review facilitation',
                  'Batch feedback workflows with audio and video notes',
                ].map((item) => (
                  <div key={item} className="flex items-center gap-2.5 text-xs sm:text-sm font-semibold text-[#37292B]">
                    <CheckCircle2 className="w-4 h-4 text-[#9579AE] shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="lg:col-span-6 relative order-1 lg:order-2"
            >
              <div className="aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-slate-100">
                <img
                  src="/assets/educator_hero.jpg"
                  alt="Educator in lecture hall"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Overlapping Course Builder UI */}
              <div className="absolute -bottom-8 -left-4 sm:left-6 backdrop-blur-xl bg-white/95 border border-[#AEA1D0]/30 shadow-xl rounded-2xl p-4 sm:p-5 max-w-xs z-20">
                <div className="flex items-center gap-2 text-xs font-bold text-[#37292B] mb-2">
                  <BookOpen className="w-4 h-4 text-[#9579AE]" />
                  <span>Module 05: Machine Learning</span>
                </div>
                <div className="flex items-center justify-between text-[11px] text-[#37292B]/70 mb-2">
                  <span>AI Rubric Generation</span>
                  <span className="text-[#57A889] font-bold">Ready in 3s</span>
                </div>
                <p className="text-[11px] text-[#37292B]/70 leading-relaxed">
                  "I gained back over 6 hours every week to hold dedicated research mentorship."
                </p>
              </div>
            </motion.div>
          </div>

          {/* Experience 3: Administrator */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="lg:col-span-6 relative"
            >
              <div className="aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-slate-100">
                <img
                  src="/assets/admin_hero.jpg"
                  alt="University Administrator"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Overlapping Analytics UI */}
              <div className="absolute -bottom-8 -right-4 sm:right-6 backdrop-blur-xl bg-white/95 border border-[#AEA1D0]/30 shadow-xl rounded-2xl p-4 sm:p-5 max-w-xs z-20">
                <div className="flex items-center gap-2 text-xs font-bold text-[#37292B] mb-2">
                  <BarChart3 className="w-4 h-4 text-[#4866A4]" />
                  <span>Executive Operations Cockpit</span>
                </div>
                <div className="flex items-center justify-between text-[11px] text-[#37292B]/70 mb-2">
                  <span>Compliance Readiness</span>
                  <span className="text-[#57A889] font-bold">100% Certified</span>
                </div>
                <p className="text-[11px] text-[#37292B]/70 leading-relaxed">
                  "Board reports that used to take 3 weeks now generate in a single click."
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="lg:col-span-6"
            >
              <span className="text-xs font-bold uppercase tracking-wider text-[#B27F51] block mb-2">
                The Leadership Experience
              </span>
              <h3 className="font-display text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#37292B]">
                See the whole institution clearly.
              </h3>
              <p className="mt-4 text-sm sm:text-base text-[#37292B]/75 leading-relaxed">
                Empower provosts, deans, and IT leadership with continuous academic telemetry.
                Track program performance, automate accreditation evidence collection, and maintain
                ironclad regulatory compliance.
              </p>

              <div className="mt-6 space-y-3">
                {[
                  'Cross-campus cohort retention and enrollment analytics',
                  'One-click accreditation evidence compilation',
                  'Comprehensive audit trails and role-based policy enforcement',
                ].map((item) => (
                  <div key={item} className="flex items-center gap-2.5 text-xs sm:text-sm font-semibold text-[#37292B]">
                    <CheckCircle2 className="w-4 h-4 text-[#B27F51] shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
