"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import "./ResidencesIntro.css";

// AVA letterforms taken from the main logo (public/assets/Logo.jsx)
function AvaMark({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 382.9 116.63"
      className={className}
      aria-hidden="true"
    >
      <path
        fill="currentColor"
        d="M97.94 116.63C87.91 102.3 66.86 43.55 48.97 0 31.08 43.55 10.03 102.29 0 116.63h13.94s-.78-3.62.24-7.24c.85-2.99 34.78-87.18 34.78-87.18s33.93 84.19 34.78 87.18c1.03 3.62.24 7.24.24 7.24h13.94zM382.9 116.63C372.87 102.3 351.82 43.55 333.93 0c-17.89 43.55-38.94 102.29-48.97 116.63h13.94s-.78-3.62.24-7.24c.85-2.99 34.78-87.18 34.78-87.18s33.93 84.19 34.78 87.18c1.03 3.62.24 7.24.24 7.24h13.94zM240.42 0c-10.03 14.33-31.08 73.08-48.97 116.63C173.56 73.08 152.51 14.33 142.48 0h13.94s-.78 3.62.24 7.24c.85 2.99 34.78 87.18 34.78 87.18s33.93-84.19 34.78-87.18c1.03-3.62.24-7.24.24-7.24h13.94z"
      />
    </svg>
  );
}

export default function ResidencesIntro() {
  const t = useTranslations("residencesIntro");
  const sectionRef = useRef<HTMLElement>(null);

  // Exit drift: once the section's bottom reaches the bottom of the screen, it eases
  // down by up to half the screen as it leaves, so the map catches up and covers it
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let rafId: number | null = null;
    let drift = 0;

    const update = () => {
      rafId = null;
      const vh = window.innerHeight;
      // Measure where the section would be without its own drift
      const bottom = section.getBoundingClientRect().bottom - drift;
      const progress = Math.min(Math.max((vh - bottom) / vh, 0), 1);
      drift = progress * progress * vh * 0.5;
      section.style.setProperty("--exit-y", `${drift.toFixed(1)}px`);
    };

    const onScroll = () => {
      if (rafId === null) rafId = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (rafId !== null) cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <section className="residences-intro" id="residences" ref={sectionRef}>
      <div className="residences-intro-media">
        <Image
          src="/assets/AVA2.webp"
          alt={t("imageAlt")}
          fill
          sizes="(max-width: 900px) 100vw, 58vw"
          className="residences-intro-img"
          loading="eager"
        />
      </div>

      <div className="residences-intro-panel">
        <div className="residences-intro-brand scroll-reveal">
          <AvaMark className="residences-intro-mark" />
          <span className="residences-intro-residences">{t("residences")}</span>

          <span className="residences-intro-by">{t("interiorsBy")}</span>
          <span className="residences-intro-saab">ELIE SAAB</span>
          <span className="residences-intro-maison">MAISON</span>
        </div>

        <h2 className="residences-intro-title scroll-reveal delay-1">
          {t("title")}
        </h2>

        <p className="residences-intro-address scroll-reveal delay-2">
          {t("address")}
        </p>
      </div>
    </section>
  );
}
