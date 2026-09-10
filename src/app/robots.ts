import type { MetadataRoute } from "next";
import { APP_ORIGIN } from "@/content/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/*?lightbox="],
      },
      {
        userAgent: "PetalBot",
        disallow: "/",
      },
    ],
    // sitemap.xml を配信しているのはこのアプリ（apex）。www は Wix の別 sitemap
    sitemap: `${APP_ORIGIN}/sitemap.xml`,
  };
}
