import { v7 as uuidv7 } from "uuid";

const COMBINING_DIACRITICS = /[̀-ͯ]/g;

export function toSlug(text: string): string {
  return text
    .normalize("NFD")
    .replace(COMBINING_DIACRITICS, "")
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

export function toUniqueSlug(text: string): string {
  const slug = toSlug(text);
  const suffix = uuidv7().replace(/-/g, "").slice(-8);
  return slug ? `${slug}-${suffix}` : suffix;
}
