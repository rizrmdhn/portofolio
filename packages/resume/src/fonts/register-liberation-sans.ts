import { Font } from '@react-pdf/renderer'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export const registerLiberationSans = () => {
  const dir = path.join(__dirname, '../assets/fonts/liberation-sans')

  Font.register({
    family: 'Liberation Sans',
    fonts: [
      { src: path.join(dir, 'LiberationSans-Regular.ttf'), fontWeight: 400 },
      {
        src: path.join(dir, 'LiberationSans-Italic.ttf'),
        fontStyle: 'italic',
        fontWeight: 400,
      },
      { src: path.join(dir, 'LiberationSans-Bold.ttf'), fontWeight: 700 },
      {
        src: path.join(dir, 'LiberationSans-BoldItalic.ttf'),
        fontStyle: 'italic',
        fontWeight: 700,
      },
    ],
  })
}
