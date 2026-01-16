import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/admin/", "/_next/", "/scripts/"],
    },
    sitemap: "https://stackload.dev/sitemap.xml",
    host: "https://stackload.dev",
  };
}
