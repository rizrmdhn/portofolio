export interface ImageConversionOptions {
  /**
   * Quality of the output image (1-100)
   * @default 80
   */
  quality?: number

  /**
   * Maximum width of the output image
   * If provided, image will be resized to fit within this width while maintaining aspect ratio
   */
  maxWidth?: number

  /**
   * Maximum height of the output image
   * If provided, image will be resized to fit within this height while maintaining aspect ratio
   */
  maxHeight?: number

  /**
   * Whether to preserve metadata (EXIF, ICC profile, etc.)
   * @default false
   */
  preserveMetadata?: boolean

  /**
   * Effort level for WebP compression (0-6, higher = smaller file but slower)
   * @default 4
   */
  effort?: number

  /**
   * Original filename to convert extension
   * If provided, the file extension will be replaced with .webp
   */
  filename?: string
}

export interface ConversionResult {
  /**
   * Converted image buffer in WebP format
   */
  buffer: Buffer

  /**
   * Original image format
   */
  originalFormat: string

  /**
   * Original image size in bytes
   */
  originalSize: number

  /**
   * Converted image size in bytes
   */
  convertedSize: number

  /**
   * Percentage of size reduction
   */
  compressionRatio: number

  /**
   * Image width after conversion
   */
  width: number

  /**
   * Image height after conversion
   */
  height: number

  /**
   * Converted filename with .webp extension
   * Only present if filename was provided in options
   */
  filename?: string
}
