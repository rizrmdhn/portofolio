import type { ClassValue } from 'clsx'
import { clsx } from 'clsx'
import { createTw } from 'react-pdf-tailwind'
import { registerFontArimo } from '../fonts/register-arimo'
import { registerFontInter } from '../fonts/register-inter'
import { registerLiberationSans } from '../fonts/register-liberation-sans'

registerLiberationSans()
registerFontArimo()
registerFontInter()

const baseTw: ReturnType<typeof createTw> = createTw({
  fontFamily: {
    sans: ['Liberation Sans', 'Arimo'],
  },
})

type Style = ReturnType<typeof baseTw>

const tw = (...classes: Array<ClassValue>): Style => {
  const result = clsx(classes).split(/\s+/).filter(Boolean).join(' ')

  if (!result) return {}

  return baseTw(result)
}

export { tw, type ClassValue, type Style }
