import { cn } from '@/utils/cn'

interface BadgeProps {
  children: React.ReactNode
  variant?: 'blue' | 'green' | 'yellow' | 'red' | 'gray' | 'purple'
  className?: string
}

const variants = {
  blue: 'badge-blue',
  green: 'badge-green',
  yellow: 'badge-yellow',
  red: 'badge-red',
  gray: 'badge-gray',
  purple: 'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-700',
}

export function Badge({ children, variant = 'gray', className }: BadgeProps) {
  return <span className={cn(variants[variant], className)}>{children}</span>
}

interface StatusBadgeProps {
  status: string
}

const statusMap: Record<string, { variant: BadgeProps['variant']; label: string }> = {
  ACTIVE: { variant: 'green', label: 'Active' },
  INACTIVE: { variant: 'gray', label: 'Inactive' },
  GRADUATED: { variant: 'blue', label: 'Graduated' },
  SUSPENDED: { variant: 'red', label: 'Suspended' },
  ON_LEAVE: { variant: 'yellow', label: 'On Leave' },
  PAID: { variant: 'green', label: 'Paid' },
  PARTIAL: { variant: 'yellow', label: 'Partial' },
  UNPAID: { variant: 'red', label: 'Unpaid' },
  OVERDUE: { variant: 'red', label: 'Overdue' },
  PUBLISHED: { variant: 'green', label: 'Published' },
  DRAFT: { variant: 'gray', label: 'Draft' },
  CLOSED: { variant: 'blue', label: 'Closed' },
  SCHEDULED: { variant: 'blue', label: 'Scheduled' },
  ONGOING: { variant: 'green', label: 'Ongoing' },
  COMPLETED: { variant: 'gray', label: 'Completed' },
  CANCELLED: { variant: 'red', label: 'Cancelled' },
  PRESENT: { variant: 'green', label: 'Present' },
  ABSENT: { variant: 'red', label: 'Absent' },
  LATE: { variant: 'yellow', label: 'Late' },
  EXCUSED: { variant: 'blue', label: 'Excused' },
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const config = statusMap[status] ?? { variant: 'gray' as const, label: status }
  return <Badge variant={config.variant}>{config.label}</Badge>
}
