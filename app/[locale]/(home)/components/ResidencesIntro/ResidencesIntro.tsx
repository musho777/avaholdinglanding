"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import "./ResidencesIntro.css";

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
          <Image
            src="/assets/ava-residences-elie-saab-logo.png"
            alt="AVA Residences, interiors by Elie Saab Maison"
            width={800}
            height={846}
            sizes="(max-width: 900px) 7.5rem, 11rem"
            className="residences-intro-logo"
          />
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
