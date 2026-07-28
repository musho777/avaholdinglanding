import type { Metadata, Viewport } from "next";
import "./fonts.css";
import "./globals.css";

export const metadata: Metadata = {
  title: "AVA — Quiet Luxury Residences",
  description:
    "AVA — a quiet-luxury residence brand offering premium villas and residences in Mijas, Malaga, Spain.",
  keywords: [
    "luxury residences",
    "villas",
    "Mijas",
    "Malaga",
    "Spain",
    "quiet luxury",
    "premium real estate",
  ],
  authors: [{ name: "AVA" }],
  creator: "AVA",
  metadataBase: new URL("https://ava-retreat.com"),
  openGraph: {
    title: "AVA — Quiet Luxury Residences",
    description: "Premium villas and residences in Mijas, Malaga, Spain",
    type: "website",
    locale: "en_US",
    siteName: "AVA",
  },
  twitter: {
    card: "summary_large_image",
    title: "AVA — Quiet Luxury Residences",
    description: "Premium villas and residences in Mijas, Malaga, Spain",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
