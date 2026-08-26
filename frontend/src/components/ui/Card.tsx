import { ReactNode } from 'react'
import { cn } from '@/utils/cn'

interface CardProps {
  children: ReactNode
  className?: string
  hover?: boolean
}

export function Card({ children, className, hover }: CardProps) {
  return (
    <div className={cn('card', hover && 'hover:shadow-card-hover transition-shadow duration-200', className)}>
      {children}
    </div>
  )
}

interface CardHeaderProps {
  title: string
  description?: string
  action?: ReactNode
  className?: string
}

export function CardHeader({ title, description, action, className }: CardHeaderProps) {
  return (
    <div className={cn('card-header flex items-center justify-between gap-4', className)}>
      <div>
        <h4 className="text-navy-900">{title}</h4>
        {description && <p className="text-xs text-slate-400 mt-0.5">{description}</p>}
      </div>
      {action}
    </div>
  )
}

interface StatCardProps {
  title: string
  value: string | number
  change?: string
  changeType?: 'up' | 'down' | 'neutral'
  icon: ReactNode
  color?: 'blue' | 'green' | 'yellow' | 'red' | 'purple'
}

const colorMap = {
  blue: 'bg-blue-50 text-blue-650',
  green: 'bg-green-50 text-green-700',
  yellow: 'bg-yellow-50 text-yellow-700',
  red: 'bg-red-50 text-red-700',
  purple: 'bg-purple-50 text-purple-700',
}

export function StatCard({ title, value, change, changeType = 'neutral', icon, color = 'blue' }: StatCardProps) {
  return (
    <div className="stat-card">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-medium text-slate-400 uppercase tracking-wider">{title}</p>
          <p className="text-2xl font-bold text-navy-900 mt-1">{value}</p>
          {change && (
            <p className={cn(
              'text-xs mt-1 font-medium',
              changeType === 'up' && 'text-success',
              changeType === 'down' && 'text-error',
              changeType === 'neutral' && 'text-slate-400',
            )}>
              {changeType === 'up' && '↑ '}
              {changeType === 'down' && '↓ '}
              {change}
            </p>
          )}
        </div>
        <div className={cn('p-3 rounded-xl', colorMap[color])}>
          {icon}
        </div>
      </div>
    </div>
  )
}
