import { useEffect } from "react";

export function useSmoothScrollInit() {
  useEffect(() => {
    if (window.matchMedia && window.matchMedia("(pointer: coarse)").matches) return;
    if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches)
      return;

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

    window.addEventListener(
      "scroll",
      function () {
        if (!ticking) {
          current = window.scrollY || window.pageYOffset;
          target = current;
        }
      },
      { passive: true }
    );

    window.addEventListener("wheel", onWheel, { passive: false });
  }, []);
}
