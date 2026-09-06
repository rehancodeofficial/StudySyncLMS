import { motion } from 'framer-motion'
import {
  Cloud,
  Building2,
  School,
  GraduationCap,
  ShieldCheck,
  Palette,
  Key,
  Layers,
  Server,
  ArrowDown,
} from 'lucide-react'

export const MultiTenant = () => {
  const pills = [
    { label: 'Secure tenant isolation', icon: <ShieldCheck className="w-3.5 h-3.5 text-[#57A889]" /> },
    { label: 'Institution branding & domains', icon: <Palette className="w-3.5 h-3.5 text-[#AEA1D0]" /> },
    { label: 'Granular role-based access', icon: <Key className="w-3.5 h-3.5 text-[#4866A4]" /> },
    { label: 'Custom academic structures', icon: <Layers className="w-3.5 h-3.5 text-[#B27F51]" /> },
    { label: 'Elastic scalable infrastructure', icon: <Server className="w-3.5 h-3.5 text-[#9579AE]" /> },
  ]

  const tenants = [
    {
      type: 'University',
      icon: <GraduationCap className="w-5 h-5 text-[#4866A4]" />,
      domain: 'metro.studysync.edu',
      users: '12,482 Students · 640 Faculty',
      structure: 'Faculties · Degrees · Semesters',
      badge: 'Tier 1 Enterprise',
    },
    {
      type: 'School / K-12',
      icon: <School className="w-5 h-5 text-[#57A889]" />,
      domain: 'oakwood.studysync.school',
      users: '1,850 Students · 110 Teachers',
      structure: 'Grade Levels · Homerooms · Quarters',
      badge: 'Charter District',
    },
    {
      type: 'Professional Academy',
      icon: <Building2 className="w-5 h-5 text-[#9579AE]" />,
      domain: 'vertex.studysync.io',
      users: '3,200 Learners · 45 Trainers',
      structure: 'Cohorts · Certifications · Modules',
      badge: 'Workforce Hub',
    },
  ]

  return (
    <section className="py-24 bg-[#FCFDFC] border-b border-[#AEA1D0]/20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#4866A4] mb-2 block">
            Dedicated Cloud Tenancy
          </span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#37292B] tracking-tight">
            Your institution gets its own{' '}
            <span className="text-[#9579AE]">StudySync.</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#37292B]/70">
            Every organization operates in its own secure, configurable digital ecosystem with
            sovereign users, academic hierarchy, institutional brand tokens, and customized access rules.
          </p>
        </div>

        {/* Cloud Topology Visualization */}
        <div className="max-w-4xl mx-auto p-6 sm:p-10 rounded-3xl bg-[#F5F9F8] border border-[#AEA1D0]/30 shadow-lg relative">
          {/* StudySync Cloud Root Node */}
          <div className="max-w-md mx-auto p-4 rounded-2xl bg-[#37292B] text-white text-center shadow-lg border border-white/10 relative z-10">
            <div className="flex items-center justify-center gap-2 mb-1">
              <Cloud className="w-5 h-5 text-[#AEA1D0]" />
              <h3 className="text-base font-extrabold tracking-tight">STUDYSYNC SECURE CLOUD</h3>
            </div>
            <p className="text-[11px] text-white/70">
              Distributed Core · Global Edge · Encrypted Multi-Tenant Engine
            </p>
          </div>

          {/* Connection Lines */}
          <div className="py-6 flex flex-col items-center justify-center">
            <div className="w-0.5 h-6 bg-[#AEA1D0]/60" />
            <div className="w-3/4 max-w-xl h-0.5 bg-[#AEA1D0]/60" />
            <div className="w-3/4 max-w-xl flex justify-between">
              <div className="w-0.5 h-6 bg-[#AEA1D0]/60" />
              <div className="w-0.5 h-6 bg-[#AEA1D0]/60" />
              <div className="w-0.5 h-6 bg-[#AEA1D0]/60" />
            </div>
          </div>

          {/* 3 Isolated Tenant Instances */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {tenants.map((t, idx) => (
              <motion.div
                key={t.type}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.15 }}
                className="p-5 rounded-2xl bg-white border border-[#AEA1D0]/30 shadow-xs hover:shadow-md transition-shadow"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="w-9 h-9 rounded-xl bg-[#F5F9F8] border border-[#AEA1D0]/20 flex items-center justify-center">
                    {t.icon}
                  </div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#F5F9F8] border border-[#AEA1D0]/20 text-[#37292B]">
                    {t.badge}
                  </span>
                </div>

                <h4 className="text-sm font-bold text-[#37292B]">{t.type}</h4>
                <p className="text-[11px] font-mono text-[#4866A4] mt-0.5 truncate">{t.domain}</p>

                <div className="mt-4 pt-3 border-t border-slate-100 space-y-1 text-xs">
                  <div className="text-[11px] text-[#37292B]/80 font-medium">
                    {t.users}
                  </div>
                  <div className="text-[10px] text-[#37292B]/60">
                    Structure: {t.structure}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Feature Pills Footer */}
          <div className="mt-8 pt-6 border-t border-[#AEA1D0]/20 flex flex-wrap items-center justify-center gap-2">
            {pills.map((pill) => (
              <span
                key={pill.label}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-[#AEA1D0]/25 text-xs font-semibold text-[#37292B] shadow-2xs"
              >
                {pill.icon}
                <span>{pill.label}</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
