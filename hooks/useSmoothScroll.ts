import { useEffect } from "react";

export default function useSmoothScroll() {
  useEffect(() => {
    // Eased wheel-driven smooth scroll — desktop mouse/trackpad only;
    // touch devices keep native momentum scrolling untouched
    if (window.matchMedia && window.matchMedia("(pointer: coarse)").matches) return;
    if (
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    )
      return;

    // Our own rAF loop already eases the motion — CSS scroll-behavior:smooth
    // would additionally animate every single scrollTo() call, which stalls
    // movement almost completely, so disable it for JS-driven scrolling
    document.documentElement.style.scrollBehavior = "auto";

    let current = window.scrollY || window.pageYOffset;
    let target = current;
    const ease = 0.09;
    let ticking = false;

    function maxScroll() {
      return document.documentElement.scrollHeight - window.innerHeight;
    }

    function onWheel(e: WheelEvent) {
      e.preventDefault();
      target += e.deltaY;
      target = Math.max(0, Math.min(target, maxScroll()));
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(tick);
      }
    }

    function tick() {
      current += (target - current) * ease;
      if (Math.abs(target - current) < 0.5) {
        current = target;
        window.scrollTo(0, current);
        ticking = false;
        return;
      }
      window.scrollTo(0, current);
      requestAnimationFrame(tick);
    }

    // Keep target in sync if the user scrolls via keyboard, scrollbar drag, etc.
    const handleScroll = () => {
      if (!ticking) {
        current = window.scrollY || window.pageYOffset;
        target = current;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("wheel", onWheel, { passive: false });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("wheel", onWheel);
      document.documentElement.style.scrollBehavior = "";
    };
  }, []);
}
