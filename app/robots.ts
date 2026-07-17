import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: "https://avaholding.ae/sitemap.xml",
    host: "https://avaholding.ae",
  };
}
