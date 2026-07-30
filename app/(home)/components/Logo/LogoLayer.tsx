"use client";

import LogoSvg from "@/public/assets/Logo";
import { useHeaderScroll } from "../../hooks/useHeaderScroll";

export default function LogoLayer() {
  const { isHidden } = useHeaderScroll();

  return (
    <div className={`logo-layer ${isHidden ? "logo-hidden" : ""}`} id="logoLayer">
      <div className="logo" id="logo">
        <LogoSvg className="logo-svg" id="logoSvg" />
        <div className="logo-sub" id="logoSub"></div>
      </div>
    </div>
  );
}
