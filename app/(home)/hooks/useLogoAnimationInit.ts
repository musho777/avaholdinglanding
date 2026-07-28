import { useEffect } from "react";

export function useLogoAnimationInit() {
  useEffect(() => {
    const logo = document.getElementById("logo");
    const logoSvg = document.getElementById("logoSvg");
    const logoSub = document.getElementById("logoSub");
    const logoLayer = document.getElementById("logoLayer");

    if (!logo || !logoSvg || !logoSub || !logoLayer) return;

    const getHeaderHeight = () => {
      // Match the CSS media query breakpoints
      if (window.innerWidth <= 480) return 70;
      return 84;
    };

    const getEndWidth = () => {
      // Smaller logo on mobile
      if (window.innerWidth <= 820) return 140;
      return 180;
    };

    function setLogo(
      topPx: number,
      widthPx: number,
      subOpacity: number,
      subMarginTop: number,
      subFontSize: number
    ) {
      if (!logo || !logoSvg || !logoSub) return;

      // Use absolute pixel positioning with transition
      // Add transition to top property for smooth animation
      logo.style.transition = "transform 1.1s cubic-bezier(0.76, 0, 0.24, 1), top 1.1s cubic-bezier(0.76, 0, 0.24, 1)";
      logo.style.top = topPx + "px";
      logo.style.transform = "translateY(-50%)";

      logoSvg.style.width = widthPx + "px";
      logoSvg.style.height = widthPx * (116.63 / 382.9) + "px";
      logoSub.style.opacity = String(subOpacity);
      logoSub.style.marginTop = subMarginTop + "px";
      logoSub.style.fontSize = subFontSize + "px";
    }

    function renderHero() {
      const startWidth = Math.min(window.innerWidth * 0.62, 620);
      // Position logo at viewport center
      setLogo(window.innerHeight / 2, startWidth, 1, 14, 11.5);
    }

    (window as any).dockLogo = function () {
      if (!logoLayer) return;
      const headerH = getHeaderHeight();
      const endWidth = getEndWidth();
      // Position logo at header center (35px mobile, 42px desktop)
      setLogo(headerH / 2, endWidth, 0, 0, 9.6);
      logoLayer.classList.add("docked");
    };

    renderHero();

    let lastWidth = window.innerWidth;

    window.addEventListener("resize", function () {
      if (!logoLayer) return;

      const currentWidth = window.innerWidth;

      if (!logoLayer.classList.contains("docked")) {
        // Update hero position on resize
        renderHero();
      } else {
        // Only update when width changes significantly (orientation, responsive mode)
        // Ignore height changes (mobile address bar)
        if (Math.abs(currentWidth - lastWidth) > 100) {
          const headerH = getHeaderHeight();
          const endWidth = getEndWidth();
          setLogo(headerH / 2, endWidth, 0, 0, 9.6);
          lastWidth = currentWidth;
        }
      }
    });
  }, []);
}
