import { Font } from '@react-pdf/renderer'
import Regular from '../assets/fonts/liberation-sans/LiberationSans-Regular.ttf'
import Italic from '../assets/fonts/liberation-sans/LiberationSans-Italic.ttf'
import Bold from '../assets/fonts/liberation-sans/LiberationSans-Bold.ttf'
import BoldItalic from '../assets/fonts/liberation-sans/LiberationSans-BoldItalic.ttf'

export const registerLiberationSans = () => {
  Font.register({
    family: 'Liberation Sans',
    fonts: [
      { src: Regular, fontWeight: 400 },
      { src: Italic, fontStyle: 'italic', fontWeight: 400 },
      { src: Bold, fontWeight: 700 },
      { src: BoldItalic, fontStyle: 'italic', fontWeight: 700 },
    ],
  })
}
