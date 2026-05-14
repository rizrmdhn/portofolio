/// <reference path="./ttf.d.ts" />
import { Font } from '@react-pdf/renderer'
import Regular from '../assets/fonts/arimo/Arimo-Regular.ttf'
import Italic from '../assets/fonts/arimo/Arimo-Italic.ttf'
import Bold from '../assets/fonts/arimo/Arimo-Bold.ttf'
import BoldItalic from '../assets/fonts/arimo/Arimo-BoldItalic.ttf'

export const registerFontArimo = () => {
  Font.register({
    family: 'Arimo',
    fonts: [
      { src: Regular, fontWeight: 400 },
      { src: Italic, fontStyle: 'italic', fontWeight: 400 },
      { src: Bold, fontWeight: 700 },
      { src: BoldItalic, fontStyle: 'italic', fontWeight: 700 },
    ],
  })
}
