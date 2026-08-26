import { useState, useRef, useEffect } from 'react'
import { MoreVertical } from 'lucide-react'
import { cn } from '@/utils/cn'

interface DropdownItem {
  label: string
  icon?: React.ReactNode
  onClick: () => void
  danger?: boolean
  disabled?: boolean
}

interface DropdownProps {
  items: DropdownItem[]
  trigger?: React.ReactNode
  align?: 'left' | 'right'
}

export function Dropdown({ items, trigger, align = 'right' }: DropdownProps) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div ref={ref} className="relative inline-block">
      <button
        onClick={() => setOpen(o => !o)}
        className="btn btn-ghost btn-icon btn-sm"
        aria-label="Open menu"
      >
        {trigger ?? <MoreVertical className="w-4 h-4" />}
      </button>
      {open && (
        <div
          className={cn(
            'dropdown-menu',
            align === 'right' ? 'right-0' : 'left-0',
            'top-full mt-1'
          )}
          style={{ position: 'absolute' }}
        >
          {items.map((item, i) => (
            <button
              key={i}
              onClick={() => { item.onClick(); setOpen(false) }}
              disabled={item.disabled}
              className={cn('dropdown-item', item.danger && 'danger', item.disabled && 'opacity-50 cursor-not-allowed')}
            >
              {item.icon}
              {item.label}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
