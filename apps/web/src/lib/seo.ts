import type { SeoPageSettings } from "@portofolio/types/seo.types";

type MetaDescriptor = Record<string, string>;

export type SeoDefaults = {
  title: string;
  description: string;
  ogImage?: string;
};

export function buildSeoMeta(
  stored: SeoPageSettings | undefined,
  defaults: SeoDefaults,
): Array<MetaDescriptor> {
  const title = stored?.title || defaults.title;
  const description = stored?.description || defaults.description;
  const ogImage = stored?.ogImage || defaults.ogImage;

  return [
    { title },
    { name: "description", content: description },
    { property: "og:title", content: title },
    { property: "og:description", content: description },
    ...(ogImage
      ? [
          { property: "og:image", content: ogImage },
          { name: "twitter:image", content: ogImage },
        ]
      : []),
    { name: "twitter:title", content: title },
    { name: "twitter:description", content: description },
  ];
}
