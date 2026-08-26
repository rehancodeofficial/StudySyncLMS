import { useState, useCallback } from 'react'
import { ChevronUp, ChevronDown } from 'lucide-react'
import { TableSkeleton } from './Skeleton'
import { EmptyState, ErrorState } from './EmptyState'
import { Pagination } from './Pagination'
import type { TableColumn, PaginationMeta } from '@/types'
import { cn } from '@/utils/cn'

interface DataTableProps<T> {
  columns: TableColumn<T>[]
  data: T[]
  isLoading?: boolean
  isError?: boolean
  onRetry?: () => void
  emptyIcon?: string
  emptyTitle?: string
  emptyDescription?: string
  pagination?: PaginationMeta
  onPageChange?: (page: number) => void
  onSort?: (key: string, dir: 'asc' | 'desc') => void
  sortKey?: string
  sortDir?: 'asc' | 'desc'
  selectable?: boolean
  selectedIds?: string[]
  onSelectAll?: (selected: boolean) => void
  onSelectRow?: (id: string, selected: boolean) => void
  rowKey?: (row: T) => string
  onRowClick?: (row: T) => void
  className?: string
  compact?: boolean
}

export function DataTable<T extends object>({
  columns,
  data,
  isLoading,
  isError,
  onRetry,
  emptyIcon = '📋',
  emptyTitle = 'No records found',
  emptyDescription = 'Try adjusting your filters or adding new records.',
  pagination,
  onPageChange,
  onSort,
  sortKey,
  sortDir,
  selectable,
  selectedIds = [],
  onSelectAll,
  onSelectRow,
  rowKey,
  onRowClick,
  className,
  compact,
}: DataTableProps<T>) {
  const [localSort, setLocalSort] = useState<{ key: string; dir: 'asc' | 'desc' } | null>(null)

  const handleSort = useCallback((col: TableColumn<T>) => {
    if (!col.sortable) return
    const key = col.key as string
    let dir: 'asc' | 'desc' = 'asc'
    if ((sortKey ?? localSort?.key) === key) {
      dir = (sortDir ?? localSort?.dir) === 'asc' ? 'desc' : 'asc'
    }
    if (onSort) {
      onSort(key, dir)
    } else {
      setLocalSort({ key, dir })
    }
  }, [sortKey, sortDir, localSort, onSort])

  // Local sort if no external sort
  const displayData = (() => {
    if (onSort || !localSort) return data
    return [...data].sort((a, b) => {
      const av = (a as Record<string, unknown>)[localSort.key]
      const bv = (b as Record<string, unknown>)[localSort.key]
      const cmp = String(av ?? '').localeCompare(String(bv ?? ''))
      return localSort.dir === 'asc' ? cmp : -cmp
    })
  })()

  const currentSortKey = sortKey ?? localSort?.key
  const currentSortDir = sortDir ?? localSort?.dir

  if (isLoading) return <TableSkeleton rows={8} cols={columns.length + (selectable ? 1 : 0)} />
  if (isError) return <ErrorState onRetry={onRetry} />

  const allSelected = data.length > 0 && data.every(row => selectedIds.includes(rowKey!(row)))

  return (
    <div className={cn('flex flex-col', className)}>
      <div className="table-container">
        <table className={cn('table', compact && 'compact')}>
          <thead>
            <tr>
              {selectable && onSelectAll && (
                <th style={{ width: '3rem' }}>
                  <input
                    type="checkbox"
                    className="checkbox"
                    checked={allSelected}
                    onChange={e => onSelectAll(e.target.checked)}
                    aria-label="Select all"
                  />
                </th>
              )}
              {columns.map(col => (
                <th
                  key={String(col.key)}
                  className={cn(col.sortable && 'cursor-pointer select-none hover:bg-slate-100', col.className)}
                  style={col.width ? { width: col.width } : undefined}
                  onClick={() => col.sortable && handleSort(col)}
                >
                  <span className="flex items-center gap-1">
                    {col.header}
                    {col.sortable && (
                      <span className="inline-flex flex-col ml-0.5">
                        <ChevronUp className={cn('w-3 h-3', currentSortKey === col.key && currentSortDir === 'asc' ? 'text-blue-650' : 'text-slate-300')} />
                        <ChevronDown className={cn('w-3 h-3 -mt-1', currentSortKey === col.key && currentSortDir === 'desc' ? 'text-blue-650' : 'text-slate-300')} />
                      </span>
                    )}
                  </span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {displayData.length === 0 ? (
              <tr>
                <td colSpan={columns.length + (selectable ? 1 : 0)} className="p-0 border-0">
                  <EmptyState icon={emptyIcon} title={emptyTitle} description={emptyDescription} />
                </td>
              </tr>
            ) : (
              displayData.map((row, rowIdx) => {
                const id = rowKey ? rowKey(row) : String(rowIdx)
                const isSelected = selectedIds.includes(id)
                return (
                  <tr
                    key={id}
                    onClick={() => onRowClick?.(row)}
                    className={cn(onRowClick && 'cursor-pointer', isSelected && 'bg-blue-50')}
                  >
                    {selectable && onSelectRow && (
                      <td>
                        <input
                          type="checkbox"
                          className="checkbox"
                          checked={isSelected}
                          onClick={e => e.stopPropagation()}
                          onChange={e => onSelectRow(id, e.target.checked)}
                          aria-label="Select row"
                        />
                      </td>
                    )}
                    {columns.map(col => {
                      const key = col.key as string
                      const value = (row as Record<string, unknown>)[key]
                      return (
                        <td key={key} className={col.className}>
                          {col.render ? col.render(value, row) : String(value ?? '—')}
                        </td>
                      )
                    })}
                  </tr>
                )
              })
            )}
          </tbody>
        </table>
      </div>
      {pagination && onPageChange && (
        <Pagination meta={pagination} onPageChange={onPageChange} />
      )}
    </div>
  )
}
