import LogoSvg from "@/public/assets/Logo";
export default function LogoLayer() {
  return (
    <div className="logo-layer" id="logoLayer">
      <div className="logo" id="logo">
        <LogoSvg className="logo-svg" id="logoSvg" />
        <div className="logo-sub" id="logoSub"></div>
      </div>
    </div>
  );
}
