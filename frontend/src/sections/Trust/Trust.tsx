import { motion } from 'framer-motion'
import { GraduationCap, Users, Building2, BookOpen, ShieldCheck } from 'lucide-react'

export const Trust = () => {
  const roles = [
    {
      title: 'Students',
      description: 'Clarity on assignments, direct feedback, and intuitive mobile progress tracking.',
      icon: <GraduationCap className="w-5 h-5 text-[#4866A4]" />,
      stat: '98.2% Satisfaction',
      avatar: '/assets/student_hero.jpg',
      badge: 'Learner First',
    },
    {
      title: 'Educators',
      description: 'More teaching, less grading overhead. AI assisted rubrics and real-time student alerts.',
      icon: <BookOpen className="w-5 h-5 text-[#9579AE]" />,
      stat: '6.4 hrs saved/wk',
      avatar: '/assets/educator_hero.jpg',
      badge: 'Pedagogy Focused',
    },
    {
      title: 'Administrators',
      description: 'Campus-wide visibility, instant compliance reports, and seamless SIS synchronization.',
      icon: <ShieldCheck className="w-5 h-5 text-[#B27F51]" />,
      stat: '100% Audit Readiness',
      avatar: '/assets/admin_hero.jpg',
      badge: 'Enterprise Control',
    },
    {
      title: 'Institutions',
      description: 'Independent multi-tenant deployment with dedicated brand styling and secure data isolation.',
      icon: <Building2 className="w-5 h-5 text-[#57A889]" />,
      stat: '50+ Global Campuses',
      avatar: '/assets/student_hero.jpg',
      badge: 'Sovereign Tenancy',
    },
  ]

  return (
    <section className="py-20 bg-[#FCFDFC] border-y border-[#AEA1D0]/20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#9579AE] mb-2 block">
            Institutional Alignment
          </span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#37292B] tracking-tight">
            Built for the people who make learning happen.
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#37292B]/70 leading-relaxed">
            One platform. Every role. One connected learning experience.
          </p>
        </div>

        {/* 4 Role Persona Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {roles.map((role, idx) => (
            <motion.div
              key={role.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="group bg-[#F5F9F8] hover:bg-white rounded-3xl p-6 border border-[#AEA1D0]/25 hover:border-[#AEA1D0]/60 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-5">
                  <div className="w-12 h-12 rounded-2xl bg-white border border-[#AEA1D0]/25 flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform">
                    {role.icon}
                  </div>
                  <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-white border border-[#AEA1D0]/20 text-[#37292B]">
                    {role.badge}
                  </span>
                </div>

                <div className="flex items-center gap-3 mb-3">
                  <div className="w-9 h-9 rounded-full overflow-hidden border border-slate-200 shrink-0">
                    <img
                      src={role.avatar}
                      alt={role.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="text-lg font-bold text-[#37292B]">{role.title}</h3>
                </div>

                <p className="text-xs text-[#37292B]/70 leading-relaxed">
                  {role.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-[#AEA1D0]/15 flex items-center justify-between text-xs">
                <span className="text-[#37292B]/50 font-medium">Outcome:</span>
                <span className="font-bold text-[#4866A4]">{role.stat}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
