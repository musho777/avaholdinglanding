"use client";

import { useEffect } from "react";

export default function Hero() {
  useEffect(() => {
    const preloader = document.getElementById("preloader");
    if (!preloader) return;
    if (preloader.classList.contains("hidden")) {
      setTimeout(() => {
        document.querySelector(".hero-text-top")?.classList.add("animate");
        document.querySelector(".hero-text-main")?.classList.add("animate");
        document.querySelector(".hero-text-bottom")?.classList.add("animate");
      }, 200);
      return;
    }

    const observer = new MutationObserver(() => {
      if (preloader.classList.contains("hidden")) {
        setTimeout(() => {
          document.querySelector(".hero-text-top")?.classList.add("animate");
          document.querySelector(".hero-text-main")?.classList.add("animate");
          document.querySelector(".hero-text-bottom")?.classList.add("animate");
        }, 200);
        observer.disconnect();
      }
    });

    observer.observe(preloader, { attributes: true, attributeFilter: ["class"] });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="hero-wrapper">
      <section className="hero">
        <div className="hero-photo">
          <video autoPlay loop muted playsInline preload="auto" className="hero-video">
            <source src="/assets/hero.mp4" type="video/mp4" />
          </video>
        </div>
        <div className="hero-text-overlay">
          <p className="hero-text-top">For those</p>
          <h1 className="hero-text-main">WHO CHOOSE</h1>
          <p className="hero-text-bottom">the right moment.</p>
        </div>
        <p className="hero-caption">
          <span className="scroll-cue">
            <span className="line"></span>Scroll
          </span>
        </p>
      </section>
    </div>
  );
}
