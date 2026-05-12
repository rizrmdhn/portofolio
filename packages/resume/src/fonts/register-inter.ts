import { Font } from '@react-pdf/renderer'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export const registerFontInter = () => {
  const dir = path.join(__dirname, '../assets/fonts/inter')

  Font.register({
    family: 'Inter',
    fonts: [
      { src: path.join(dir, 'Inter-Light.ttf'), fontWeight: 300 },
      { src: path.join(dir, 'Inter-LightItalic.ttf'), fontStyle: 'italic', fontWeight: 300 },
      { src: path.join(dir, 'Inter-Regular.ttf'), fontWeight: 400 },
      { src: path.join(dir, 'Inter-Italic.ttf'), fontStyle: 'italic', fontWeight: 400 },
      { src: path.join(dir, 'Inter-Medium.ttf'), fontWeight: 500 },
      { src: path.join(dir, 'Inter-MediumItalic.ttf'), fontStyle: 'italic', fontWeight: 500 },
      { src: path.join(dir, 'Inter-SemiBold.ttf'), fontWeight: 600 },
      { src: path.join(dir, 'Inter-SemiBoldItalic.ttf'), fontStyle: 'italic', fontWeight: 600 },
      { src: path.join(dir, 'Inter-Bold.ttf'), fontWeight: 700 },
      { src: path.join(dir, 'Inter-BoldItalic.ttf'), fontStyle: 'italic', fontWeight: 700 },
    ],
  })
}
