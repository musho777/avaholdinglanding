"use client";

import { useEffect, useRef, useState } from "react";

export default function CenturySection() {
  const sectionRef = useRef<HTMLElement>(null);
  const topTextRef = useRef<HTMLHeadingElement>(null);
  const bottomTextRef = useRef<HTMLHeadingElement>(null);
  const [hasExited, setHasExited] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;

      const rect = sectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const currentScrollY = window.scrollY;
      const scrollingDown = currentScrollY > lastScrollY.current;
      lastScrollY.current = currentScrollY;

      // Calculate visibility percentage
      const sectionTop = rect.top;
      const sectionBottom = rect.bottom;
      const visibleHeight = Math.min(sectionBottom, windowHeight) - Math.max(sectionTop, 0);
      const sectionHeight = rect.height;
      const visibilityRatio = Math.max(0, visibleHeight / sectionHeight);

      // Section has scrolled past (exit condition) - trigger when less than 95% visible (5% has left) and scrolling down
      if (visibilityRatio < 0.95 && scrollingDown && sectionTop < 0) {
        setHasExited(true);
        sectionRef.current?.classList.add("century-scrolled");

        if (topTextRef.current) {
          topTextRef.current.classList.remove(
            "scroll-reveal",
            "scroll-revealed",
            "delay-1",
            "century-enter-from-left"
          );
          topTextRef.current.classList.add("century-exit-left");
        }
        if (bottomTextRef.current) {
          bottomTextRef.current.classList.remove(
            "scroll-reveal",
            "scroll-revealed",
            "delay-2",
            "century-enter-from-right"
          );
          bottomTextRef.current.classList.add("century-exit-right");
        }
      }
      // Section is entering view - trigger at 10% visibility
      else if (visibilityRatio > 0.1) {
        sectionRef.current?.classList.remove("century-scrolled");

        if (hasExited && !scrollingDown) {
          // Coming back from below - slide from left/right to center
          if (topTextRef.current) {
            topTextRef.current.classList.remove(
              "century-exit-left",
              "scroll-reveal",
              "delay-1"
            );
            topTextRef.current.classList.add("century-enter-from-left");
          }
          if (bottomTextRef.current) {
            bottomTextRef.current.classList.remove(
              "century-exit-right",
              "scroll-reveal",
              "delay-2"
            );
            bottomTextRef.current.classList.add("century-enter-from-right");
          }
        } else if (!hasExited) {
          // First time viewing - normal scroll reveal
          if (topTextRef.current) {
            topTextRef.current.classList.remove("century-exit-left", "century-enter-from-left");
            topTextRef.current.classList.add("scroll-reveal", "delay-1");
          }
          if (bottomTextRef.current) {
            bottomTextRef.current.classList.remove(
              "century-exit-right",
              "century-enter-from-right"
            );
            bottomTextRef.current.classList.add("scroll-reveal", "delay-2");
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Initial check

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [hasExited]);

  return (
    <section ref={sectionRef} className="century-section">
      <div className="century-content">
        <div className="century-text-line">
          <h1 ref={topTextRef} className="century-text-left scroll-reveal delay-1">
            TIMELESS
          </h1>
          <h2 ref={bottomTextRef} className="century-text-right scroll-reveal delay-2">
            LEGACY
          </h2>
        </div>
      </div>
      <div className="century-scroll-wrapper">
        <p className="century-founder-text">Est. 2019 by Founder EDUARD GHAZARYAN</p>
        <div className="century-scroll-indicator">
          <svg xmlns="http://www.w3.org/2000/svg" width="10" height="72.5" viewBox="0 0 10 72.5">
            <path
              d="M17.5,0l-.909.909,3.442,3.442H-50v1.3H20.032L16.591,9.091,17.5,10l5-5Z"
              transform="translate(10 50) rotate(90)"
              fill="#fff"
            ></path>
          </svg>
        </div>
      </div>
    </section>
  );
}
