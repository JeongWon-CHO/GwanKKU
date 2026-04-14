import type { EditorCategoryConfig, EditorCategoryId } from '@/types/editor'
import { cn } from '@/lib/utils'

type Props = {
  categories: EditorCategoryConfig[]
  active: EditorCategoryId
  onChange: (id: EditorCategoryId) => void
}

export function CategoryTabs({ categories, active, onChange }: Props) {
  return (
    <div className="flex gap-1 overflow-x-auto pb-1 scrollbar-none">
      {categories.map((cat) => (
        <button
          key={cat.id}
          onClick={() => onChange(cat.id)}
          className={cn(
            'shrink-0 rounded-full px-4 py-1.5 text-sm font-medium transition-colors',
            active === cat.id
              ? 'bg-accent text-accent-fg'
              : 'bg-surface text-body hover:bg-inset',
          )}
        >
          {cat.label}
        </button>
      ))}
    </div>
  )
}
