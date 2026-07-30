"use client";

import { useEffect, useState } from "react";

export default function Hero() {
  const [scrollIconHidden, setScrollIconHidden] = useState(false);

  useEffect(() => {
    const preloader = document.getElementById("preloader");
    if (!preloader) return;
    if (preloader.classList.contains("hidden")) {
      setTimeout(() => {
        document.querySelector(".hero-text-top")?.classList.add("animate");
      }, 500);
      setTimeout(() => {
        document.querySelector(".hero-text-main")?.classList.add("animate");
      }, 800);
      setTimeout(() => {
        document.querySelector(".hero-text-bottom")?.classList.add("animate");
      }, 1300);
      return;
    }

    const observer = new MutationObserver(() => {
      if (preloader.classList.contains("hidden")) {
        setTimeout(() => {
          document.querySelector(".hero-text-top")?.classList.add("animate");
        }, 500);
        setTimeout(() => {
          document.querySelector(".hero-text-main")?.classList.add("animate");
        }, 800);
        setTimeout(() => {
          document.querySelector(".hero-text-bottom")?.classList.add("animate");
        }, 1300);
        observer.disconnect();
      }
    });

    observer.observe(preloader, { attributes: true, attributeFilter: ["class"] });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    let lastScrollY = window.scrollY;
    let ticking = false;

    const updateScrollIcon = () => {
      const currentScrollY = window.scrollY;

      // Hide when scrolling down past 100px
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setScrollIconHidden(true);
      } else if (currentScrollY < lastScrollY) {
        setScrollIconHidden(false);
      }

      lastScrollY = currentScrollY;
      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateScrollIcon);
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
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
        <p
          className="hero-caption"
          style={{
            opacity: scrollIconHidden ? 0 : 1,
            visibility: scrollIconHidden ? 'hidden' : 'visible',
            transition: 'opacity 0.4s ease, visibility 0.4s ease'
          }}
        >
          <span className="scroll-cue">
            <span className="line"></span>Scroll
          </span>
        </p>
      </section>
    </div>
  );
}
