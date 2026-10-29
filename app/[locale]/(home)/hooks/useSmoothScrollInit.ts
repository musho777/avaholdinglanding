import { useEffect } from "react";
import Lenis from "lenis";
import "lenis/dist/lenis.css";

// The running Lenis instance, so other hooks (anchor links) can scroll through it
let lenis: Lenis | null = null;

export function getLenis() {
  return lenis;
}

export function useSmoothScrollInit() {
  useEffect(() => {
    // Skip on touch devices
    if (window.matchMedia && window.matchMedia("(pointer: coarse)").matches) {
      document.documentElement.style.scrollBehavior = "auto";
      return;
    }

    // Respect user's motion preferences
    if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      document.documentElement.style.scrollBehavior = "auto";
      return;
    }

    document.documentElement.style.scrollBehavior = "auto";

    // Soft, gliding wheel scroll (Lenis defaults, as on 111w57.com)
    lenis = new Lenis({
      lerp: 0.1,
      smoothWheel: true,
      autoRaf: true,
      // Inner scroll areas marked with data-native-scroll scroll themselves, not the page
      prevent: (node) => !!node.closest("[data-native-scroll]"),
      // The menu and modals lock the page with body overflow: hidden; leave the wheel alone then
      virtualScroll: () => document.body.style.overflow !== "hidden",
    });

    return () => {
      lenis?.destroy();
      lenis = null;
    };
  }, []);
}
