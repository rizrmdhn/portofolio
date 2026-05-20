/// <reference path="./ttf.d.ts" />
import { Font } from '@react-pdf/renderer'
import Bold from '../assets/fonts/inter/Inter-Bold.ttf'
import BoldItalic from '../assets/fonts/inter/Inter-BoldItalic.ttf'
import Italic from '../assets/fonts/inter/Inter-Italic.ttf'
import Light from '../assets/fonts/inter/Inter-Light.ttf'
import LightItalic from '../assets/fonts/inter/Inter-LightItalic.ttf'
import Medium from '../assets/fonts/inter/Inter-Medium.ttf'
import MediumItalic from '../assets/fonts/inter/Inter-MediumItalic.ttf'
import Regular from '../assets/fonts/inter/Inter-Regular.ttf'
import SemiBold from '../assets/fonts/inter/Inter-SemiBold.ttf'
import SemiBoldItalic from '../assets/fonts/inter/Inter-SemiBoldItalic.ttf'

export const registerFontInter = () => {
  Font.register({
    family: 'Inter',
    fonts: [
      { src: Light, fontWeight: 300 },
      { src: LightItalic, fontStyle: 'italic', fontWeight: 300 },
      { src: Regular, fontWeight: 400 },
      { src: Italic, fontStyle: 'italic', fontWeight: 400 },
      { src: Medium, fontWeight: 500 },
      { src: MediumItalic, fontStyle: 'italic', fontWeight: 500 },
      { src: SemiBold, fontWeight: 600 },
      { src: SemiBoldItalic, fontStyle: 'italic', fontWeight: 600 },
      { src: Bold, fontWeight: 700 },
      { src: BoldItalic, fontStyle: 'italic', fontWeight: 700 },
    ],
  })
}
