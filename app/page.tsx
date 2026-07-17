import type { Metadata } from "next";
import { AboutSection } from "@/components/sections/about-section";
import { ContactSection } from "@/components/sections/contact-section";
import { EditorialCompositionSection } from "@/components/sections/editorial-composition-section";
import { ExperienceSection } from "@/components/sections/experience-section";
import { HeroSection } from "@/components/sections/hero-section";
import { ProjectsSection } from "@/components/sections/projects-section";
import { ServicesSection } from "@/components/sections/services-section";
import { StorytellingHorizontalSection } from "@/components/sections/storytelling-horizontal-section";
import { TestimonialsSection } from "@/components/sections/testimonials-section";
import { LuxuryCursor } from "@/components/ui/luxury-cursor";

export const metadata: Metadata = {
  title: "AVA Holding | Building the Future with Precision",
  description:
    "Luxury construction and development by AVA Holding, combining engineering excellence, refined architecture, and trusted project delivery.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "AVA Holding | Building the Future with Precision",
    description:
      "Luxury construction and development by AVA Holding, combining engineering excellence and refined architecture.",
    url: "https://avaholding.ae",
    type: "website",
    images: ["/og-image.svg"],
  },
};

const SHOW_COMING_SOON = true;

export default function Home() {
  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "GeneralContractor",
      name: "AVA Holding",
      description:
        "AVA Holding is a premium construction and development company delivering high-end architectural projects with precision.",
      url: "https://avaholding.ae",
      logo: "https://avaholding.ae/og-image.svg",
      image: "https://avaholding.ae/og-image.svg",
      telephone: "+971-4-000-0000",
      email: "info@avaholding.ae",
      areaServed: "Middle East",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Dubai",
        addressCountry: "AE",
      },
      sameAs: [
        "https://www.linkedin.com/company/ava-holding",
        "https://instagram.com",
        "https://facebook.com",
      ],
      serviceType: ["Construction", "Development", "Design", "Engineering"],
    },
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: "AVA Holding",
      url: "https://avaholding.ae",
    },
    {
      "@context": "https://schema.org",
      "@type": "VideoObject",
      name: "AVA Holding Hero Construction Film",
      description: "Cinematic construction hero background for AVA Holding.",
      uploadDate: "2026-05-05",
      thumbnailUrl: "https://avaholding.ae/images/arch-06.svg",
      contentUrl:
        "https://cdn.coverr.co/videos/coverr-construction-site-1579/1080p.mp4",
      embedUrl: "https://avaholding.ae",
    },
  ];

  if (SHOW_COMING_SOON) {
    return (
      <div className="fixed inset-0 z-9999 flex items-center justify-center bg-[#ece8e1]">
        <video
          className="h-auto w-auto max-h-dvh max-w-full object-contain"
          src="/AVA%20COMING%20SOON_10.mp4"
          autoPlay
          loop
          playsInline
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </div>
    );
  }

  return (
    <>
      <LuxuryCursor />
      <a
        href="#contact"
        aria-label="Open contact section"
        className="fixed bottom-6 right-6 z-40 inline-flex h-14 w-14 items-center justify-center rounded-full bg-[#9f8560] text-[#f8f3ea] shadow-[0_16px_38px_rgba(70,50,30,0.35)] transition-all duration-300 hover:scale-105 hover:bg-[#876d4c]"
      >
        <svg viewBox="0 0 24 24" className="h-6 w-6 fill-current" aria-hidden>
          <path d="M4 5.5A1.5 1.5 0 0 1 5.5 4h13A1.5 1.5 0 0 1 20 5.5v13a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 4 18.5v-13Zm2 .5v12h12V6H6Zm2.4 2.1h7.2a1 1 0 1 1 0 2H8.4a1 1 0 1 1 0-2Zm0 4h4.8a1 1 0 1 1 0 2H8.4a1 1 0 1 1 0-2Z" />
        </svg>
      </a>
      <main className="overflow-x-clip">
        <HeroSection />
        <AboutSection />
        <ProjectsSection />
        <ExperienceSection />
        <ServicesSection />
        <EditorialCompositionSection />
        <StorytellingHorizontalSection />
        <TestimonialsSection />
        <ContactSection />
      </main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
    </>
  );
}
