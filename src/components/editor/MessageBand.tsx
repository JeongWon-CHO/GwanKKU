import { useEditorStore } from '@/store/useEditorStore'
import { MESSAGE_FONTS } from '@/constants/message-fonts'
import { cn, isLight } from '@/lib/utils'
import type { MessageAlign } from '@/types/editor'

type Props = {
  backgroundColor: string
}

const alignFlexMap: Record<MessageAlign, string> = {
  left: 'justify-start',
  center: 'justify-center',
  right: 'justify-end',
}

const alignTextMap: Record<MessageAlign, string> = {
  left: 'text-left',
  center: 'text-center',
  right: 'text-right',
}

export function MessageBand({ backgroundColor }: Props) {
  const { message, messageStyle } = useEditorStore()
  const light = isLight(backgroundColor)

  const fontConfig = MESSAGE_FONTS.find((f) => f.id === messageStyle.font) ?? MESSAGE_FONTS[0]
  const fontWeight = messageStyle.bold ? fontConfig.boldWeight : fontConfig.normalWeight

  return (
    <div
      className={cn(
        'absolute bottom-0 left-0 right-0 flex min-h-15 items-center px-5 py-3',
        alignFlexMap[messageStyle.align],
      )}
      style={{
        background: light ? 'rgba(0,0,0,0.06)' : 'rgba(255,255,255,0.08)',
      }}
    >
      {message && (
        <p
          className={cn('break-keep text-xs leading-relaxed', alignTextMap[messageStyle.align])}
          style={{
            color: light ? '#44403c' : '#f5f5f4',
            fontFamily: fontConfig.cssVar,
            fontWeight,
            fontStyle: messageStyle.italic ? 'italic' : 'normal',
          }}
        >
          {message}
        </p>
      )}
    </div>
  )
}
