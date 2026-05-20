import { InvalidImageError } from '@portofolio/errors'
import sharp from 'sharp'
import type { ConversionResult, ImageConversionOptions } from './types'

export async function convertToWebP(
  imageBuffer: Buffer,
  options: ImageConversionOptions = {},
): Promise<ConversionResult> {
  try {
    const {
      quality = 80,
      maxWidth,
      maxHeight,
      preserveMetadata = false,
      effort = 4,
      filename,
    } = options

    const metadata = await sharp(imageBuffer).metadata()

    const originalSize = imageBuffer.length
    const originalFormat = metadata.format

    let pipeline = sharp(imageBuffer)

    if (maxWidth || maxHeight) {
      pipeline = pipeline.resize({
        width: maxWidth,
        height: maxHeight,
        fit: 'inside',
        withoutEnlargement: true,
      })
    }

    pipeline = pipeline.webp({ quality, effort })

    if (preserveMetadata) {
      pipeline = pipeline.withMetadata()
    }

    const convertedBuffer = await pipeline.toBuffer()
    const convertedMetadata = await sharp(convertedBuffer).metadata()

    const convertedSize = convertedBuffer.length
    const compressionRatio = ((originalSize - convertedSize) / originalSize) * 100
    const convertedFilename = filename ? filename.replace(/\.[^.]+$/, '.webp') : undefined

    return {
      buffer: convertedBuffer,
      originalFormat,
      originalSize,
      convertedSize,
      compressionRatio: Math.round(compressionRatio * 100) / 100,
      width: convertedMetadata.width,
      height: convertedMetadata.height,
      ...(convertedFilename !== undefined ? { filename: convertedFilename } : {}),
    }
  } catch (error) {
    if (error instanceof InvalidImageError) throw error
    throw new InvalidImageError(
      error instanceof Error ? error.message : 'Unknown error occurred',
      error,
    )
  }
}

export async function validateImage(imageBuffer: Buffer): Promise<boolean> {
  try {
    const metadata = await sharp(imageBuffer).metadata()
    return !!metadata.format
  } catch (error) {
    throw new InvalidImageError(
      error instanceof Error ? error.message : 'Invalid image format',
      error,
    )
  }
}

export async function getImageInfo(imageBuffer: Buffer): Promise<{
  format: string
  width: number
  height: number
  size: number
  hasAlpha: boolean
}> {
  try {
    const metadata = await sharp(imageBuffer).metadata()

    return {
      format: metadata.format,
      width: metadata.width,
      height: metadata.height,
      size: imageBuffer.length,
      hasAlpha: !!metadata.hasAlpha,
    }
  } catch (error) {
    if (error instanceof InvalidImageError) throw error
    throw new InvalidImageError(
      error instanceof Error ? error.message : 'Unable to read image info',
      error,
    )
  }
}

export type { ConversionResult, ImageConversionOptions }
