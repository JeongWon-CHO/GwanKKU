import { useEditorStore } from '@/store/useEditorStore'
import { isLight } from '@/lib/utils'

type Props = {
  backgroundColor: string
}

export function MessageBand({ backgroundColor }: Props) {
  const { message } = useEditorStore()
  const light = isLight(backgroundColor)

  return (
    <div
      className="absolute bottom-0 left-0 right-0 flex min-h-15 items-center justify-center px-5 py-3"
      style={{
        background: light ? 'rgba(0,0,0,0.06)' : 'rgba(255,255,255,0.08)',
      }}
    >
      {message && (
        <p
          className="break-keep text-center text-xs leading-relaxed"
          style={{ color: light ? '#44403c' : '#f5f5f4' }}
        >
          {message}
        </p>
      )}
    </div>
  )
}
