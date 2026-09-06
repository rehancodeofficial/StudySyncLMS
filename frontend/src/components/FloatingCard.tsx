import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface FloatingCardProps {
  icon?: ReactNode
  title: string
  subtitle?: string
  badge?: string
  badgeColor?: string
  className?: string
  delay?: number
  duration?: number
  distance?: number
}

export const FloatingCard = ({
  icon,
  title,
  subtitle,
  badge,
  badgeColor = 'bg-[#57A889]/10 text-[#57A889] border-[#57A889]/20',
  className = '',
  delay = 0,
  duration = 5,
  distance = 8,
}: FloatingCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{
        opacity: 1,
        y: [-distance, distance, -distance],
      }}
      transition={{
        opacity: { duration: 0.8, delay },
        y: {
          duration,
          repeat: Infinity,
          ease: 'easeInOut',
          delay,
        },
      }}
      className={`absolute z-20 backdrop-blur-xl bg-[#FCFDFC]/95 border border-[#AEA1D0]/30 shadow-lg shadow-[#37292B]/5 rounded-xl px-3.5 py-2.5 flex items-center gap-3 transition-shadow hover:shadow-xl ${className}`}
    >
      {icon && (
        <div className="shrink-0 flex items-center justify-center w-8 h-8 rounded-lg bg-[#F5F9F8] border border-[#AEA1D0]/20 text-[#37292B]">
          {icon}
        </div>
      )}

      <div className="min-w-0">
        <div className="flex items-center gap-1.5">
          <span className="text-xs font-semibold text-[#37292B] truncate">{title}</span>
          {badge && (
            <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full border ${badgeColor}`}>
              {badge}
            </span>
          )}
        </div>
        {subtitle && (
          <p className="text-[11px] text-[#37292B]/60 truncate mt-0.5">{subtitle}</p>
        )}
      </div>
    </motion.div>
  )
}
