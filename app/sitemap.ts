import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  // 1. Remove the trailing slash from baseUrl to avoid double slashes later
  const baseUrl = "https://portfolio-prem-4m65.vercel.app";

  return [
    {
      url: baseUrl, // This is your Home Page
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
    // Only add more entries here if you create REAL new files like app/projects/page.tsx
  ];
}