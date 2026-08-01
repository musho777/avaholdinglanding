"use client";

import Link from "next/link";
import LogoSvg from "@/public/assets/Logo";

export default function Footer() {
  const openGoogleMaps = () => {
    const address = "Derenik Demirchyan 2-4, Yerevan, Armenia";
    const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
    window.open(googleMapsUrl, "_blank");
  };

  return (
    <>
      <footer className="site-footer" role="contentinfo" id="contact">
        <div className="footer-top">
          <div className="footer-contact">
            <p className="eyebrow">Contact</p>
          </div>
          <div className="footer-reach">
            <a href="tel:+37498333372" className="footer-phone">
              +374 (77) 423333
            </a>
            <a href="mailto:info@avaholding.com" className="footer-email">info@avaholding.com</a>
          </div>
        </div>

        <div className="footer-mark">
          <LogoSvg aria-label="AVA" />
        </div>

        <div className="footer-mid">
          <div className="footer-locations">
            <div className="footer-location-item">
              <p className="footer-location">YEREVAN, ARMENIA</p>
              <div className="footer-location-row">
                <button className="map-btn" onClick={openGoogleMaps}>
                  <span>See on map</span>
                </button>
                <button className="social-btn" aria-label="Facebook">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M13.5 21v-7.6h2.55l.38-2.96h-2.93v-1.9c0-.86.24-1.44 1.47-1.44h1.57V4.42c-.27-.04-1.2-.12-2.28-.12-2.26 0-3.8 1.38-3.8 3.9v2.18H8v2.96h2.46V21h3.04z" />
                  </svg>
                </button>
                <button
                  className="social-btn"
                  aria-label="Instagram"
                  onClick={() =>
                    window.open(
                      "https://www.instagram.com/avaholding.armenia?igsh=MTU1cHYxdWJ3ZGNmbg==",
                      "_blank"
                    )
                  }
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                    <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
                    <circle cx="12" cy="12" r="4" />
                    <circle cx="17.2" cy="6.8" r="1" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy;AVA — 2026 all rights reserved</p>
          <div className="footer-legal">
            <Link href="/privacy">Privacy policy</Link>
          </div>
        </div>
      </footer>
    </>
  );
}
