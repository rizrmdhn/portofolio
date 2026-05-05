export const IMAGE_MIME_TYPES = {
  "image/jpeg": "jpg",
  "image/png": "png",
} as const;

export const MAXIMUM_FILE_SIZE = 2 * 1024 * 1024; // 2MB in bytes

export const MAXIMUM_FILE_SIZE_HUMAN_READABLE = "2MB";

export const MAXIMUM_FILE_SIZE_REACH_MESSAGE = `Ukuran file tidak boleh lebih dari ${MAXIMUM_FILE_SIZE_HUMAN_READABLE}`;

export type SUPPORTED_FILE_EXTENSIONS =
  (typeof IMAGE_MIME_TYPES)[keyof typeof IMAGE_MIME_TYPES];

export const VIEW_AS_TYPES = ["guest", "owner"] as const;

export type ViewAsType = (typeof VIEW_AS_TYPES)[number];

export const STATUS_TYPES = ["draft", "published", "archived"] as const;

export type StatusType = (typeof STATUS_TYPES)[number];

export const EXPERIENCE_STATUS_TYPES = ["draft", "published"] as const;

export type ExperienceStatusType = (typeof EXPERIENCE_STATUS_TYPES)[number];

export const STATUS_LABELS: Record<StatusType, string> = {
  draft: "Draft",
  published: "Published",
  archived: "Archived",
};

export * from "./colors";
export * from "./experience";
