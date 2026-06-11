import { cn } from '@/lib/utils'

interface SectionLabelProps {
  children: React.ReactNode
  className?: string
  color?: 'orange' | 'silver'
}

export function SectionLabel({ children, className, color = 'orange' }: SectionLabelProps) {
  return (
    <div className={cn('flex items-center gap-3', className)}>
      <span
        className={cn('block h-px w-8', color === 'orange' ? 'bg-orange' : 'bg-silver-dark')}
      />
      <span
        className={cn(
          'text-label text-[10px] tracking-[0.25em]',
          color === 'orange' ? 'text-orange' : 'text-silver-dark'
        )}
      >
        {children}
      </span>
    </div>
  )
}
