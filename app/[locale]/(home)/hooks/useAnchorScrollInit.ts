import { useEffect } from "react";
import { getLenis } from "./useSmoothScrollInit";

export function useAnchorScrollInit() {
  useEffect(() => {
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const link = target.closest('a[href^="#"]') as HTMLAnchorElement;

      if (!link) return;

      const href = link.getAttribute("href");
      if (!href || href === "#") return;

      const targetId = href.substring(1);
      const targetElement = document.getElementById(targetId);

      if (targetElement) {
        e.preventDefault();

        // Glide through Lenis when it's running; otherwise native smooth scroll
        const lenis = getLenis();
        if (lenis) {
          lenis.scrollTo(targetElement);
        } else {
          targetElement.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }

        // Update URL
        if (window.history && window.history.pushState) {
          window.history.pushState(null, "", href);
        }
      }
    };

    document.addEventListener("click", handleAnchorClick);

    return () => {
      document.removeEventListener("click", handleAnchorClick);
    };
  }, []);
}
