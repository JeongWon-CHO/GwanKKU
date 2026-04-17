import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// 배경색 밝기 판단 (W3C 상대 휘도 근사)
export function isLight(hex: string): boolean {
  const h = hex.replace('#', '')
  const r = parseInt(h.slice(0, 2), 16)
  const g = parseInt(h.slice(2, 4), 16)
  const b = parseInt(h.slice(4, 6), 16)
  return (r * 299 + g * 587 + b * 114) / 1000 > 128
}

// ── 관 프레임/홈 색상 파생 (HSL 기반) ──────────────────────

function hexToHsl(hex: string): [number, number, number] {
  const r = parseInt(hex.slice(1, 3), 16) / 255
  const g = parseInt(hex.slice(3, 5), 16) / 255
  const b = parseInt(hex.slice(5, 7), 16) / 255
  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)
  const l = (max + min) / 2
  if (max === min) return [0, 0, Math.round(l * 100)]
  const d = max - min
  const s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
  let h: number
  if (max === r) h = (g - b) / d + (g < b ? 6 : 0)
  else if (max === g) h = (b - r) / d + 2
  else h = (r - g) / d + 4
  return [Math.round(h * 60), Math.round(s * 100), Math.round(l * 100)]
}

function hslToHex(h: number, s: number, l: number): string {
  const sl = s / 100
  const ll = l / 100
  const f = (n: number) => {
    const k = (n + h / 30) % 12
    const a = sl * Math.min(ll, 1 - ll)
    return Math.round((ll - a * Math.max(-1, Math.min(k - 3, Math.min(9 - k, 1)))) * 255)
      .toString(16)
      .padStart(2, '0')
  }
  return `#${f(0)}${f(8)}${f(4)}`
}

// 패널 색에서 프레임 색 파생 (동색조 + 명도 +18)
export function deriveFrameColor(panelHex: string): string {
  const [h, s, l] = hexToHsl(panelHex)
  return hslToHex(h, s, Math.min(94, l + 18))
}

// 패널 색에서 홈 선 색 파생 (동색조 + 채도 +3, 명도 -22)
export function deriveGrooveColor(panelHex: string): string {
  const [h, s, l] = hexToHsl(panelHex)
  return hslToHex(h, Math.min(100, s + 3), Math.max(5, l - 22))
}
