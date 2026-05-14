import { getCVSetting, setCVSetting } from '@portofolio/queries/cv.queries'
import { toggleCertificationFeaturedAtResume } from '@portofolio/queries/certification.queries'
import { toggleProjectFeaturedAtResume } from '@portofolio/queries/project.queries'
import { getResumeData } from '@portofolio/queries/resume-data.queries'
import {
  getResumeDownloadCount,
  getResumeSettings,
  incrementResumeDownloadCount,
  setResumeSettings,
} from '@portofolio/queries/resume.queries'
import { renderResumePdf } from '@portofolio/resume'
import { resumeSettingsSchema } from '@portofolio/schema/resume.schema'
import utapi from '@portofolio/uploadthing'
import { tryCatchAsync } from '@portofolio/utils/try-catch'
import { TRPCError } from '@trpc/server'
import z from 'zod'
import { createTRPCRouter, protectedProcedure, publicProcedure } from '..'
import { toTRPCError } from '../utils/to-trpc-error'

export const resumeRouter = createTRPCRouter({
  get: publicProcedure.query(async () => {
    const [setting, err] = await tryCatchAsync(() => getCVSetting())

    if (err) throw toTRPCError(err)

    return setting
  }),

  getSettings: publicProcedure.query(async () => {
    const [settings, err] = await tryCatchAsync(() => getResumeSettings())

    if (err) throw toTRPCError(err)

    return settings
  }),

  saveSettings: protectedProcedure.input(resumeSettingsSchema).mutation(async ({ input }) => {
    const [result, err] = await tryCatchAsync(() => setResumeSettings(input))

    if (err) throw toTRPCError(err)

    return result
  }),

  toggleProjectFeatured: protectedProcedure
    .input(z.object({ id: z.string(), value: z.boolean() }))
    .mutation(async ({ input }) => {
      const [result, err] = await tryCatchAsync(() =>
        toggleProjectFeaturedAtResume(input.id, input.value),
      )

      if (err) throw toTRPCError(err)

      return result
    }),

  toggleCertificationFeatured: protectedProcedure
    .input(z.object({ id: z.string(), value: z.boolean() }))
    .mutation(async ({ input }) => {
      const [result, err] = await tryCatchAsync(() =>
        toggleCertificationFeaturedAtResume(input.id, input.value),
      )

      if (err) throw toTRPCError(err)

      return result
    }),

  preview: protectedProcedure.input(resumeSettingsSchema).mutation(async ({ input }) => {
    const [resumeData, dataErr] = await tryCatchAsync(() => getResumeData())

    if (dataErr) throw toTRPCError(dataErr)

    const [buffer, renderErr] = await tryCatchAsync(() =>
      renderResumePdf(resumeData, input.template, input.accentColor, input.font, input.summary),
    )

    if (renderErr) throw toTRPCError(renderErr)

    return { base64: Buffer.from(buffer).toString('base64') }
  }),

  generate: protectedProcedure.mutation(async () => {
    const [[settings, settingsErr], [resumeData, dataErr]] = await Promise.all([
      tryCatchAsync(() => getResumeSettings()),
      tryCatchAsync(() => getResumeData()),
    ])

    if (settingsErr) throw toTRPCError(settingsErr)
    if (dataErr) throw toTRPCError(dataErr)

    const [buffer, renderErr] = await tryCatchAsync(() =>
      renderResumePdf(resumeData, settings.template, settings.accentColor, settings.font, settings.summary),
    )

    if (renderErr) throw toTRPCError(renderErr)

    const file = new File([new Uint8Array(buffer)], 'resume.pdf', {
      type: 'application/pdf',
    })

    const [upload, uploadErr] = await tryCatchAsync(() => utapi.uploadFiles(file))

    if (uploadErr) throw toTRPCError(uploadErr)

    if (!upload.data) {
      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message: upload.error.message,
      })
    }

    const existing = await getCVSetting()
    if (existing?.data.fileKey) {
      void utapi.deleteFiles(existing.data.fileKey)
    }

    const [cvSetting, saveErr] = await tryCatchAsync(() =>
      setCVSetting({
        url: upload.data.ufsUrl,
        fileKey: upload.data.key,
        uploadedAt: new Date().toISOString(),
      }),
    )

    if (saveErr) throw toTRPCError(saveErr)

    return {
      url: cvSetting.data.url,
      uploadedAt: cvSetting.data.uploadedAt,
    }
  }),

  trackDownload: publicProcedure.mutation(async () => {
    const [count, err] = await tryCatchAsync(() => incrementResumeDownloadCount())

    if (err) throw toTRPCError(err)

    return { count }
  }),

  getStats: protectedProcedure.query(async () => {
    const [count, err] = await tryCatchAsync(() => getResumeDownloadCount())

    if (err) throw toTRPCError(err)

    return { downloadCount: count }
  }),
})
