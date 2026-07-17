import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "AVA Holding",
    short_name: "AVA",
    description: "Premium construction and development with precision engineering.",
    start_url: "/",
    display: "standalone",
    background_color: "#ece8e1",
    theme_color: "#a8895b",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
  };
}
