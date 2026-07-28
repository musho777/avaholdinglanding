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
      const offsetY = topPx - window.innerHeight / 2;
      logo.style.transform = "translateY(calc(-50% + " + offsetY + "px))";
      logoSvg.style.width = widthPx + "px";
      logoSvg.style.height = widthPx * (116.63 / 382.9) + "px";
      logoSub.style.opacity = String(subOpacity);
      logoSub.style.marginTop = subMarginTop + "px";
      logoSub.style.fontSize = subFontSize + "px";
    }

    function renderHero() {
      const startWidth = Math.min(window.innerWidth * 0.62, 620);
      setLogo(window.innerHeight * 0.5, startWidth, 1, 14, 11.5);
    }

    (window as any).dockLogo = function () {
      if (!logoLayer) return;
      const headerH = getHeaderHeight();
      const endWidth = getEndWidth();
      setLogo(headerH / 2, endWidth, 0, 0, 9.6);
      logoLayer.classList.add("docked");
    };

    renderHero();
    window.addEventListener("resize", function () {
      if (logoLayer && !logoLayer.classList.contains("docked")) renderHero();
    });
  }, []);
}
