import { Font } from '@react-pdf/renderer'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export const registerFontArimo = () => {
  const dir = path.join(__dirname, '../assets/fonts/arimo')

  Font.register({
    family: 'Arimo',
    fonts: [
      { src: path.join(dir, 'Arimo-Regular.ttf'), fontWeight: 400 },
      {
        src: path.join(dir, 'Arimo-Italic.ttf'),
        fontStyle: 'italic',
        fontWeight: 400,
      },
      { src: path.join(dir, 'Arimo-Bold.ttf'), fontWeight: 700 },
      {
        src: path.join(dir, 'Arimo-BoldItalic.ttf'),
        fontStyle: 'italic',
        fontWeight: 700,
      },
    ],
  })
}
