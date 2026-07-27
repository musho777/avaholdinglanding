import { useEffect } from "react";

export default function useLogoAnimation() {
  useEffect(() => {
    const logo = document.getElementById("logo");
    const logoSvg = document.getElementById("logoSvg");
    const logoSub = document.getElementById("logoSub");
    const logoLayer = document.getElementById("logoLayer");

    if (!logo || !logoSvg || !logoSub || !logoLayer) return;

    const headerH = 84;
    const endWidth = 108;

    function setLogo(
      topPx: number,
      widthPx: number,
      subOpacity: number,
      subMarginTop: number,
      subFontSize: number
    ) {
      // Horizontal centering is owned entirely by CSS (left:0/right:0/margin:auto)
      // and never touched here — this only sets the vertical offset, so
      // there is zero horizontal transform math to ever drift sideways
      const offsetY = topPx - window.innerHeight / 2;
      logo!.style.transform = `translateY(calc(-50% + ${offsetY}px))`;
      logoSvg!.style.width = `${widthPx}px`;
      logoSvg!.style.height = `${widthPx * (116.63 / 382.9)}px`;
      logoSub!.style.opacity = String(subOpacity);
      logoSub!.style.marginTop = `${subMarginTop}px`;
      logoSub!.style.fontSize = `${subFontSize}px`;
    }

    // Starting state — big, centered in the hero, behind the preloader curtain
    function renderHero() {
      const startWidth = Math.min(window.innerWidth * 0.62, 620);
      setLogo(window.innerHeight * 0.5, startWidth, 1, 14, 11.5);
    }

    // Final state — small, docked in the header — triggered once, when the
    // intro curtain finishes lifting, rather than being driven by scroll
    (window as any).dockLogo = function () {
      setLogo(headerH / 2, endWidth, 0, 0, 9.6);
      logoLayer!.classList.add("docked");
    };

    renderHero();
    const handleResize = () => {
      if (!logoLayer!.classList.contains("docked")) renderHero();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      delete (window as any).dockLogo;
    };
  }, []);
}
