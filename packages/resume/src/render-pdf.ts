import type { ResumeData } from '@portofolio/queries/resume-data.queries'
import type { ResumeFont, ResumeTemplate } from '@portofolio/types/resume.types'
import type { DocumentProps } from '@react-pdf/renderer'
import { renderToStream } from '@react-pdf/renderer'
import type { ReactElement } from 'react'
import { createElement } from 'react'
import { ATSTemplate } from './templates/ats-template'
import { CreativeTemplate } from './templates/creative-template'

export async function renderResumePdf(
  data: ResumeData,
  template: ResumeTemplate,
  accentColor: string,
  font: ResumeFont = 'Liberation Sans',
): Promise<Buffer> {
  const Component = template === 'ats' ? ATSTemplate : CreativeTemplate
  const element = createElement(Component, {
    data,
    accentColor,
    font,
  }) as unknown as ReactElement<DocumentProps>
  const stream = await renderToStream(element)

  return new Promise((resolve, reject) => {
    const chunks: Array<Buffer> = []
    stream.on('data', (chunk: Buffer) => chunks.push(chunk))
    stream.on('end', () => resolve(Buffer.concat(chunks)))
    stream.on('error', reject)
  })
}
