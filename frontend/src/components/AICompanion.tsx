import { motion } from 'framer-motion'
import { Sparkles, ArrowRight } from 'lucide-react'

interface AICompanionProps {
  message?: string
  subtext?: string
  actionLabel?: string
  onAction?: () => void
  compact?: boolean
}

export const AICompanion = ({
  message = "I found something worth your attention.",
  subtext = "17 students are showing a drop in engagement across Data Structures.",
  actionLabel = "View insight",
  onAction,
  compact = false,
}: AICompanionProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: 10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={`relative z-20 backdrop-blur-xl bg-[#FCFDFC]/95 border border-[#AEA1D0]/40 rounded-2xl shadow-xl shadow-[#37292B]/8 p-4 ${
        compact ? 'max-w-xs' : 'max-w-sm'
      }`}
    >
      {/* Ambient gradient glow behind companion */}
      <div className="absolute -inset-0.5 bg-gradient-to-r from-[#AEA1D0]/30 to-[#4866A4]/20 rounded-2xl blur-lg -z-10 opacity-70" />

      <div className="flex items-start gap-3">
        {/* Abstract animated AI Companion Orb / Avatar */}
        <div className="relative shrink-0">
          <motion.div
            animate={{
              scale: [1, 1.08, 1],
              rotate: [0, 5, -5, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#4866A4] via-[#9579AE] to-[#AEA1D0] p-0.5 flex items-center justify-center shadow-md shadow-[#9579AE]/20"
          >
            <div className="w-full h-full rounded-[10px] bg-[#37292B] flex items-center justify-center relative overflow-hidden">
              {/* Inner animated digital energy core */}
              <motion.div
                animate={{
                  opacity: [0.6, 1, 0.6],
                  scale: [0.8, 1.2, 0.8],
                }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute inset-0 bg-radial from-[#AEA1D0]/60 via-[#4866A4]/30 to-transparent"
              />
              {/* Abstract dual-pulse eyes / intelligence beacon */}
              <div className="relative flex items-center gap-1.5 z-10">
                <motion.span
                  animate={{ height: ['4px', '8px', '4px'] }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                  className="w-1.5 bg-[#FCFDFC] rounded-full"
                />
                <motion.span
                  animate={{ height: ['8px', '4px', '8px'] }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut', delay: 0.3 }}
                  className="w-1.5 bg-[#AEA1D0] rounded-full"
                />
              </div>
            </div>
          </motion.div>

          {/* Active status pulse dot */}
          <span className="absolute -top-1 -right-1 flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#57A889] opacity-75" />
            <span className="relative inline-flex rounded-full h-3 w-3 bg-[#57A889] border-2 border-[#FCFDFC]" />
          </span>
        </div>

        {/* AI Insight Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5 text-[11px] font-semibold text-[#9579AE] uppercase tracking-wider mb-1">
            <Sparkles className="w-3 h-3 text-[#B27F51]" />
            <span>StudySync AI</span>
          </div>

          <p className="text-xs font-semibold text-[#37292B] leading-snug">
            "{message}"
          </p>
          <p className="text-[11.5px] text-[#37292B]/70 mt-1 leading-relaxed">
            {subtext}
          </p>

          <button
            onClick={onAction}
            className="mt-2.5 inline-flex items-center gap-1 text-xs font-semibold text-[#4866A4] hover:text-[#37292B] transition-colors group cursor-pointer"
          >
            <span>{actionLabel}</span>
            <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-1" />
          </button>
        </div>
      </div>
    </motion.div>
  )
}
