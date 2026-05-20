import {
  IconBrandDiscord,
  IconBrandFacebook,
  IconBrandGithub,
  IconBrandInstagram,
  IconBrandLinkedin,
  IconBrandTelegram,
  IconBrandTiktok,
  IconBrandWhatsapp,
  IconBrandX,
  IconBrandYoutube,
  IconWorld,
} from '@tabler/icons-react'

import type { SupportedIconMeta } from './icons'

export const SOCIAL_ICON_NAMES = [
  'portfolio',
  'facebook',
  'x',
  'instagram',
  'linkedin',
  'github',
  'youtube',
  'tiktok',
  'discord',
  'telegram',
  'whatsapp',
] as const satisfies [string, ...Array<string>]

export type SocialIconName = (typeof SOCIAL_ICON_NAMES)[number]

export const SOCIAL_ICON_MAP: Record<SocialIconName, Omit<SupportedIconMeta, 'name'>> = {
  portfolio: { label: 'Personal Website', icon: IconWorld },
  facebook: { label: 'Facebook', icon: IconBrandFacebook },
  x: { label: 'X (Twitter)', icon: IconBrandX },
  instagram: { label: 'Instagram', icon: IconBrandInstagram },
  linkedin: { label: 'LinkedIn', icon: IconBrandLinkedin },
  github: { label: 'GitHub', icon: IconBrandGithub },
  youtube: { label: 'YouTube', icon: IconBrandYoutube },
  tiktok: { label: 'TikTok', icon: IconBrandTiktok },
  discord: { label: 'Discord', icon: IconBrandDiscord },
  telegram: { label: 'Telegram', icon: IconBrandTelegram },
  whatsapp: { label: 'WhatsApp', icon: IconBrandWhatsapp },
}

export const SUPPORTED_SOCIAL_ICONS: Array<SupportedIconMeta> = SOCIAL_ICON_NAMES.map((name) => ({
  name,
  ...SOCIAL_ICON_MAP[name],
}))
