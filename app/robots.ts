import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    // Fixed the URL string
    sitemap: "https://portfolio-prem-4m65.vercel.app/sitemap.xml",
  };
}