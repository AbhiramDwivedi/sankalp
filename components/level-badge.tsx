import { cn } from '@/lib/utils'
import type { FluencyLevel } from '@/lib/types'
import { FLUENCY_LEVELS } from '@/lib/types'

interface LevelBadgeProps {
  level: FluencyLevel
  size?: 'sm' | 'md' | 'lg'
  showNumber?: boolean
  className?: string
}

const levelColors: Record<FluencyLevel, string> = {
  'novice-low': 'bg-chart-1/15 text-chart-1 border-chart-1/30',
  'novice-mid': 'bg-chart-2/15 text-chart-2 border-chart-2/30',
  'novice-high': 'bg-chart-4/15 text-chart-4 border-chart-4/30',
  'intermediate-low': 'bg-chart-3/15 text-chart-3 border-chart-3/30',
  'intermediate-mid': 'bg-secondary/15 text-secondary border-secondary/30',
}

const sizeClasses = {
  sm: 'text-xs px-2 py-0.5',
  md: 'text-sm px-2.5 py-1',
  lg: 'text-base px-3 py-1.5',
}

export function LevelBadge({ level, size = 'md', showNumber = true, className }: LevelBadgeProps) {
  const levelInfo = FLUENCY_LEVELS[level]

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full border font-medium',
        levelColors[level],
        sizeClasses[size],
        className
      )}
    >
      {showNumber && (
        <span className="font-bold">L{levelInfo.stampLevel}</span>
      )}
      <span>{levelInfo.label}</span>
    </span>
  )
}
