import { InvalidImageError } from '@portofolio/errors'
import type { ImageConversionOptions } from '@portofolio/image'
import { convertToWebP } from '@portofolio/image'
import utapi from '@portofolio/uploadthing'
import { TRPCError } from '@trpc/server'

export interface UploadResult {
  url: string
  key: string
}

interface ProcessAndUploadImageOptions {
  maxSize?: number
  allowedMimeTypes?: ReadonlyArray<string>
  conversion?: Omit<ImageConversionOptions, 'filename'>
}

export async function processAndUploadImage(
  file: File,
  options: ProcessAndUploadImageOptions = {},
): Promise<UploadResult> {
  const { conversion = {} } = options

  const arrayBuffer = await file.arrayBuffer()
  const buffer = Buffer.from(arrayBuffer)

  const converted = await convertToWebP(buffer, {
    quality: 80,
    effort: 4,
    ...conversion,
    filename: file.name,
  })

  const webpFilename = converted.filename ?? file.name.replace(/\.[^.]+$/, '.webp')
  const webpFile = new File([converted.buffer.buffer as ArrayBuffer], webpFilename, {
    type: 'image/webp',
  })

  const upload = await utapi.uploadFiles(webpFile)

  if (!upload.data) {
    throw new InvalidImageError(upload.error.message, upload.error)
  }

  return { url: upload.data.ufsUrl, key: upload.data.key }
}

export async function processAndUploadImageIfPresent(
  file: File | undefined | null,
  options: ProcessAndUploadImageOptions = {},
): Promise<string | undefined> {
  if (!file) return undefined

  const uploaded = await processAndUploadImage(file, options)
  return uploaded.key
}

export async function processAndUploadImages(
  files: Array<File>,
  options: ProcessAndUploadImageOptions = {},
  { concurrency = 2 }: { concurrency?: number } = {},
): Promise<Array<string>> {
  const results: Array<string> = []

  for (let i = 0; i < files.length; i += concurrency) {
    const chunk = files.slice(i, i + concurrency)
    const keys = await Promise.all(
      chunk.map((file) => processAndUploadImage(file, options).then((r) => r.key)),
    )
    results.push(...keys)
  }

  return results
}

interface ProcessAndUploadFileOptions {
  maxSize?: number
  allowedMimeTypes?: ReadonlyArray<string>
  contentType?: string
}

export async function processAndUploadFile(
  file: File,
  options: ProcessAndUploadFileOptions = {},
): Promise<UploadResult> {
  const { contentType } = options

  const fileToUpload =
    contentType && contentType !== file.type
      ? new File([file], file.name, { type: contentType })
      : file

  const upload = await utapi.uploadFiles(fileToUpload)

  if (!upload.data) {
    throw new TRPCError({
      code: 'INTERNAL_SERVER_ERROR',
      message: upload.error.message,
      cause: upload.error,
    })
  }

  return { url: upload.data.ufsUrl, key: upload.data.key }
}

export async function processAndUploadFileIfPresent(
  file: File | undefined | null,
  options: ProcessAndUploadFileOptions = {},
): Promise<string | undefined> {
  if (!file) return undefined

  const uploaded = await processAndUploadFile(file, options)
  return uploaded.key
}
