"use client";

import { useEffect, useRef, useState } from "react";
import TimeSvg from "@/public/assets/TimeSvg";

export default function CenturySection() {
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;

      const containerTop = containerRef.current.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;

      // Section becomes sticky when it reaches the top
      if (containerTop <= 0) {
        const scrollDistance = Math.abs(containerTop);
        const maxScroll = windowHeight * 1.5; // Extended scroll distance for smoother transition
        const progress = Math.min(scrollDistance / maxScroll, 1);
        setScrollProgress(progress);
      } else {
        setScrollProgress(0);
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial check
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Phase 1: Left/Right movement during initial text (0.05 - 0.25)
  // Phase 2: TimeSvg appears (0.3 - 0.5)
  // Phase 3: TimeSvg disappears, founder text appears (0.6+)
  const leftRightProgress = scrollProgress > 0.05 ? Math.min((scrollProgress - 0.05) / 0.2, 1) : 0;

  const topTextTransform =
    scrollProgress > 0.05 ? `translateX(-${leftRightProgress * 150}%)` : undefined;
  const bottomTextTransform =
    scrollProgress > 0.05 ? `translateX(${leftRightProgress * 150}%)` : undefined;
  const textOpacityFromMovement = scrollProgress > 0.05 ? 1 - leftRightProgress : undefined;

  // TimeSvg appears at 0.3, stays visible until 0.6
  const timeSvgOpacity = scrollProgress >= 0.3 && scrollProgress < 0.6
    ? Math.min(1, (scrollProgress - 0.3) / 0.2) * (1 - Math.max(0, (scrollProgress - 0.5) / 0.1))
    : 0;

  // Founder text appears after 0.6
  const founderTextOpacity = Math.max(0, Math.min(1, (scrollProgress - 0.6) / 0.3));
  const overlayOpacity = Math.max(0, Math.min(1, (scrollProgress - 0.1) / 0.3));

  return (
    <div ref={containerRef} className="century-section-container">
      <section
        ref={sectionRef}
        className={`century-section ${scrollProgress > 0 ? "century-sticky" : ""}`}
        style={{
          backgroundImage: scrollProgress > 0.5 ? "none" : undefined,
        }}
      >
        <div className="century-overlay" style={{ opacity: overlayOpacity }} />
        <div className="century-content">
          <div className="century-text-group">
            <p
              className="century-label scroll-reveal"
              style={{
                ...(textOpacityFromMovement !== undefined && { opacity: textOpacityFromMovement }),
                ...(scrollProgress > 0.05 && { transition: "opacity 0.2s ease-out" }),
              }}
            >
              Founder
            </p>
            <h1
              className="century-text-top scroll-reveal delay-1"
              style={{
                ...(topTextTransform && { transform: topTextTransform }),
                ...(textOpacityFromMovement !== undefined && { opacity: textOpacityFromMovement }),
                ...(scrollProgress > 0.05 && {
                  transition: "transform 0.2s ease-out, opacity 0.2s ease-out",
                }),
              }}
            >
              Celebrating A Century
            </h1>
            <h2
              className="century-text-bottom scroll-reveal delay-2"
              style={{
                ...(bottomTextTransform && { transform: bottomTextTransform }),
                ...(textOpacityFromMovement !== undefined && { opacity: textOpacityFromMovement }),
                ...(scrollProgress > 0.05 && {
                  transition: "transform 0.2s ease-out, opacity 0.2s ease-out",
                }),
              }}
            >
              Of Innovative Luxury
            </h2>
          </div>

          {/* Phase 2: TimeSvg appears alone */}
          <div
            className="century-time-svg-container"
            style={{
              opacity: timeSvgOpacity,
              transition: "opacity 0.6s ease-out",
              pointerEvents: timeSvgOpacity > 0.5 ? "auto" : "none",
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
            }}
          >
            <div className="century-founder-icon-circle" style={{ width: "200px", height: "200px" }}>
              <TimeSvg />
            </div>
          </div>

          {/* Phase 3: Founder text appears */}
          <div
            className="century-text-group century-founder-group"
            style={{
              opacity: founderTextOpacity,
              transition: "opacity 0.6s ease-out",
              pointerEvents: founderTextOpacity > 0.5 ? "auto" : "none",
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: "90%",
              maxWidth: "800px",
              textAlign: "center",
            }}
          >
            <div className="century-founder-content">
              <h2 className="century-founder-name">EDUARD GHAZARYAN</h2>
              <p className="century-founder-role">
                Founder of AVA Holding and Developer of AVA Residences
              </p>

              <div className="century-founder-bio">
                <p className="century-founder-paragraph">
                  Eduard Ghazaryan graduated from the Faculty of Economics before embarking on an
                  entrepreneurial career spanning a diverse range of industries, including the
                  restaurant and hospitality sectors, wheat importation, and flour milling. The
                  extensive business experience he gained through establishing, managing and
                  growing successful enterprises laid the foundation for his subsequent career in
                  property development and investment projects.
                </p>
                <p className="century-founder-paragraph">
                  Over the years, Eduard has successfully delivered a number of residential and
                  commercial developments, acquiring comprehensive expertise across every stage of
                  the development process—from concept and design through to construction and
                  project completion.
                </p>
                <p className="century-founder-paragraph">
                  Today, Eduard leads AVA Holding, a diversified property development company
                  whose portfolio includes residential communities, commercial real estate, a
                  business centre and logistics warehouse facilities. The company's flagship
                  development, "AVA Residences", is a premium residential complex in Yerevan
                  featuring interiors by "Elie Saab Maison".
                </p>
                <p className="century-founder-paragraph">
                  Eduard's vision is to create developments that combine contemporary
                  architecture, exceptional construction quality and international standards, with
                  meticulous attention to aesthetics, craftsmanship and timeless elegance. His
                  ambition is to introduce a new standard of residential living to Armenia by
                  creating spaces that reflect the very best of contemporary international design
                  and quality, enabling people to experience homes that meet the highest global
                  standards.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
