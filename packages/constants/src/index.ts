export const IMAGE_MIME_TYPES = {
  "image/jpeg": "jpg",
  "image/png": "png",
} as const;

export const MAXIMUM_FILE_SIZE = 2 * 1024 * 1024; // 2MB in bytes

export const MAXIMUM_FILE_SIZE_HUMAN_READABLE = "2MB";

export const MAXIMUM_FILE_SIZE_REACH_MESSAGE = `Ukuran file tidak boleh lebih dari ${MAXIMUM_FILE_SIZE_HUMAN_READABLE}`;

export type SUPPORTED_FILE_EXTENSIONS =
  (typeof IMAGE_MIME_TYPES)[keyof typeof IMAGE_MIME_TYPES];

export const EXPERIENCE_TYPES = [
  "internship",
  "full-time",
  "freelance",
  "part-time",
  "contract",
  "temporary",
  "volunteer",
] as const;
