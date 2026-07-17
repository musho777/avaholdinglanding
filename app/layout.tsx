import type { Metadata } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { SmoothScrollProvider } from "@/components/providers/smooth-scroll";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://avaholding.ae"),
  alternates: {
    canonical: "/",
  },
  applicationName: "AVA Holding",
  creator: "AVA Holding",
  publisher: "AVA Holding",
  title: "AVA Holding | Luxury Construction and Development",
  description:
    "AVA Holding creates premium construction and architectural projects with precision engineering, timeless design, and uncompromising execution.",
  keywords: [
    "AVA Holding",
    "luxury construction",
    "premium development",
    "architectural engineering",
    "high-end real estate",
  ],
  openGraph: {
    title: "AVA Holding | Building the Future with Precision",
    description:
      "Premium construction, development, design, and engineering for landmark spaces.",
    url: "https://avaholding.ae",
    siteName: "AVA Holding",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/og-image.svg",
        width: 1200,
        height: 630,
        alt: "AVA Holding architectural development showcase",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AVA Holding | Building the Future with Precision",
    description:
      "A premium construction company focused on precision, innovation, and excellence.",
    images: ["/og-image.svg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  category: "construction",
  icons: {
    icon: "/favicon.ico",
    apple: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${manrope.variable} ${cormorant.variable} h-full`}>
      <body className="min-h-full flex flex-col bg-[#ece8e1] text-[#25211c] antialiased">
        <SmoothScrollProvider>
          <SiteHeader />
          {children}
          <SiteFooter />
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
