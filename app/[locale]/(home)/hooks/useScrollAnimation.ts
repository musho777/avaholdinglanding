"use client";

import { useEffect } from "react";

export function useScrollAnimation() {
  useEffect(() => {
    const observerOptions = {
      threshold: 0.15,
      // Wait until the element is a little way into the screen before revealing it
      rootMargin: "0px 0px -8% 0px",
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("scroll-revealed");
          // Optionally unobserve after animation to improve performance
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    // Observe all elements with scroll-reveal (fade/rise) or reveal-mask (photo curtain)
    const elements = document.querySelectorAll(".scroll-reveal, .reveal-mask");
    elements.forEach((el) => observer.observe(el));

    return () => {
      elements.forEach((el) => observer.unobserve(el));
    };
  }, []);
}
