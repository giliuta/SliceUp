import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: "https://sliceup.cy", lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    { url: "https://sliceup.cy/success", lastModified: new Date(), changeFrequency: "monthly", priority: 0.3 },
  ];
}
