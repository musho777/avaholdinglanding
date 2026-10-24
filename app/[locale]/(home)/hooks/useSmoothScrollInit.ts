import { useEffect } from "react";

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

    // Custom smooth scroll with optimizations
    document.documentElement.style.scrollBehavior = "auto";

    let current = window.scrollY;
    let target = current;
    const ease = 0.15; // Higher value = faster, smoother (was 0.09 before)
    let rafId: number | null = null;

    const lerp = (start: number, end: number, factor: number) => {
      return start + (end - start) * factor;
    };

    const animate = () => {
      const diff = Math.abs(target - current);

      // Stop if close enough (performance optimization)
      if (diff < 0.5) {
        current = target;
        window.scrollTo(0, current);
        rafId = null;
        return;
      }

      current = lerp(current, target, ease);
      window.scrollTo(0, current);
      rafId = requestAnimationFrame(animate);
    };

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      target += e.deltaY;
      target = Math.max(0, Math.min(target, document.documentElement.scrollHeight - window.innerHeight));

      // Only start animation if not already running
      if (!rafId) {
        rafId = requestAnimationFrame(animate);
      }
    };

    const onScroll = () => {
      // Sync on programmatic scrolls
      if (!rafId) {
        current = window.scrollY;
        target = current;
      }
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("scroll", onScroll);
      if (rafId) {
        cancelAnimationFrame(rafId);
      }
    };
  }, []);
}
