import { cn } from '@/utils/cn'

interface SkeletonProps {
  className?: string
  lines?: number
  height?: string
}

export function Skeleton({ className, height = '1rem' }: SkeletonProps) {
  return (
    <div
      className={cn('skeleton', className)}
      style={{ height }}
    />
  )
}

export function TableSkeleton({ rows = 5, cols = 5 }: { rows?: number; cols?: number }) {
  return (
    <div className="table-container">
      <table className="table">
        <thead>
          <tr>
            {Array.from({ length: cols }).map((_, i) => (
              <th key={i}><Skeleton className="w-24" height="0.75rem" /></th>
            ))}
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: rows }).map((_, r) => (
            <tr key={r}>
              {Array.from({ length: cols }).map((_, c) => (
                <td key={c}><Skeleton className={c === 0 ? 'w-32' : c === cols - 1 ? 'w-16' : 'w-24'} /></td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export function CardSkeleton() {
  return (
    <div className="card p-6 flex flex-col gap-4">
      <Skeleton className="w-1/3" height="1.25rem" />
      <Skeleton className="w-full" />
      <Skeleton className="w-5/6" />
      <Skeleton className="w-4/6" />
    </div>
  )
}

export function StatCardSkeleton() {
  return (
    <div className="stat-card flex flex-col gap-3">
      <Skeleton className="w-10 h-10 rounded-lg" height="2.5rem" />
      <Skeleton className="w-16" height="0.75rem" />
      <Skeleton className="w-24" height="1.75rem" />
    </div>
  )
}
