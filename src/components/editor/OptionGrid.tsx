import type { EditorItem } from '@/types/editor'
import { cn } from '@/lib/utils'

type Props = {
  items: EditorItem[]
  selected: string | undefined
  onSelect: (id: string) => void
}

export function OptionGrid({ items, selected, onSelect }: Props) {
  return (
    <div className="grid grid-cols-4 gap-3">
      {items.map((item) => {
        const isSelected = selected === item.id

        if (item.type === 'color') {
          return (
            <button
              key={item.id}
              onClick={() => onSelect(item.id)}
              className="flex flex-col items-center gap-1.5"
              aria-label={item.label}
              aria-pressed={isSelected}
            >
              <span
                className={cn(
                  'size-12 rounded-full border-2 transition-all',
                  isSelected
                    ? 'scale-110 border-accent ring-2 ring-accent ring-offset-2'
                    : 'border-line',
                )}
                style={{ backgroundColor: item.value }}
              />
              <span
                className={cn(
                  'text-xs',
                  isSelected ? 'text-accent font-medium' : 'text-caption',
                )}
              >
                {item.label}
              </span>
            </button>
          )
        }

        // emoji type (리본, 스티커, 없음 포함)
        const isEmpty = item.value === 'none'
        return (
          <button
            key={item.id}
            onClick={() => onSelect(item.id)}
            className={cn(
              'flex flex-col items-center gap-1.5 rounded-xl border py-3 transition-all',
              isSelected
                ? 'border-accent bg-accent/8'
                : 'border-line hover:border-line-strong',
            )}
            aria-pressed={isSelected}
          >
            <span className="text-2xl leading-none">
              {isEmpty ? '✕' : item.value}
            </span>
            <span
              className={cn(
                'text-xs',
                isSelected ? 'text-accent font-medium' : 'text-caption',
              )}
            >
              {item.label}
            </span>
          </button>
        )
      })}
    </div>
  )
}
