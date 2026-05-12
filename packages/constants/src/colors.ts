export type SupportedColorMeta = {
  label: string
  value: string
}

export const SUPPORTED_COLORS: Array<SupportedColorMeta> = [
  { label: 'Red', value: '#ef4444' },
  { label: 'Orange', value: '#f97316' },
  { label: 'Amber', value: '#f59e0b' },
  { label: 'Yellow', value: '#eab308' },
  { label: 'Lime', value: '#84cc16' },
  { label: 'Green', value: '#22c55e' },
  { label: 'Emerald', value: '#10b981' },
  { label: 'Teal', value: '#14b8a6' },
  { label: 'Cyan', value: '#06b6d4' },
  { label: 'Sky', value: '#0ea5e9' },
  { label: 'Blue', value: '#3b82f6' },
  { label: 'Indigo', value: '#6366f1' },
  { label: 'Violet', value: '#8b5cf6' },
  { label: 'Purple', value: '#a855f7' },
  { label: 'Fuchsia', value: '#d946ef' },
  { label: 'Pink', value: '#ec4899' },
  { label: 'Rose', value: '#f43f5e' },
  { label: 'Slate', value: '#64748b' },
  { label: 'Gray', value: '#6b7280' },
  { label: 'Stone', value: '#78716c' },
  { label: 'Neutral', value: '#737373' },
  { label: 'Zinc', value: '#71717a' },
  { label: 'White', value: '#ffffff' },
]

export const COLOR_VALUES = SUPPORTED_COLORS.map((c) => c.value) as [string, ...Array<string>]
