import { motion } from 'framer-motion'
import {
  Calendar,
  Cloud,
  KeyRound,
  Video,
  FileCode2,
  Share2,
  Mail,
  ShieldCheck,
  CheckCircle2,
} from 'lucide-react'

export const Integrations = () => {
  const integrations = [
    { name: 'Google Workspace', category: 'Classroom & Docs', icon: <Mail className="w-5 h-5 text-red-500" /> },
    { name: 'Microsoft 365', category: 'Office & OneDrive', icon: <Share2 className="w-5 h-5 text-blue-500" /> },
    { name: 'Zoom Education', category: 'Virtual Lectures', icon: <Video className="w-5 h-5 text-sky-500" /> },
    { name: 'Microsoft Teams', category: 'Cohort Collaboration', icon: <Video className="w-5 h-5 text-indigo-500" /> },
    { name: 'Academic Calendars', category: 'iCal & Exchange Sync', icon: <Calendar className="w-5 h-5 text-emerald-500" /> },
    { name: 'Institutional SSO', category: 'SAML 2.0, Okta, Shibboleth', icon: <KeyRound className="w-5 h-5 text-amber-500" /> },
    { name: 'Cloud Storage', category: 'AWS S3 & Google Drive', icon: <Cloud className="w-5 h-5 text-violet-500" /> },
    { name: 'REST & GraphQL API', category: 'Custom SIS Connectors', icon: <FileCode2 className="w-5 h-5 text-[#37292B]" /> },
  ]

  return (
    <section id="integrations" className="py-24 bg-[#F5F9F8] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#9579AE] mb-2 block">
            Ecosystem Connectivity
          </span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#37292B] tracking-tight">
            Works with the ecosystem{' '}
            <span className="text-[#4866A4]">around your institution.</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#37292B]/70">
            Engineered with open, modern standards. Integrate your active SIS, identity providers, and
            productivity suites without disrupting campus workflows.
          </p>
        </div>

        {/* Orbit Grid Presentation */}
        <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {integrations.map((item, idx) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.06 }}
              className="p-5 rounded-2xl bg-white border border-[#AEA1D0]/30 shadow-xs hover:shadow-md hover:border-[#AEA1D0]/60 transition-all flex flex-col justify-between"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 rounded-xl bg-[#F5F9F8] border border-slate-100 flex items-center justify-center">
                  {item.icon}
                </div>
                <span className="w-2 h-2 rounded-full bg-[#57A889]" />
              </div>

              <div>
                <h4 className="text-sm font-bold text-[#37292B]">{item.name}</h4>
                <p className="text-[11px] text-[#37292B]/60 mt-0.5">{item.category}</p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center gap-1 text-[10px] font-bold text-[#4866A4]">
                <CheckCircle2 className="w-3 h-3 text-[#57A889]" />
                <span>Ready for integration</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom Banner */}
        <div className="mt-12 text-center text-xs text-[#37292B]/60 max-w-xl mx-auto">
          Need a bespoke connector for your proprietary campus registrar database? Our engineering
          team provides verified open SDKs and dedicated integration assistance.
        </div>
      </div>
    </section>
  )
}
