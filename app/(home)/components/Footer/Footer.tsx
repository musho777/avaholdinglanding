"use client";

import { useState } from "react";
import { Modal, ModalBody } from "@/components/ui/Modal/Modal";
import { YerevanMap } from "@/components/maps";
import LogoSvg from "@/public/assets/Logo";

export default function Footer() {
  const [isMapModalOpen, setIsMapModalOpen] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState<"spain" | "yerevan" | null>(null);

  const openMapModal = (location: "spain" | "yerevan") => {
    setSelectedLocation(location);
    setIsMapModalOpen(true);
  };

  const closeMapModal = () => {
    setIsMapModalOpen(false);
    setSelectedLocation(null);
  };

  return (
    <>
      <footer className="site-footer" role="contentinfo">
        <div className="footer-top">
          <div className="footer-contact">
            <p className="eyebrow">Contact</p>
            <p className="eyebrow dim">Sales office</p>
          </div>
          <div className="footer-reach">
            <a href="tel:+37498333372" className="footer-phone">
              +374 (98) 333372
            </a>
            <p className="footer-email">info@ava-retreat.com</p>
          </div>
        </div>

        <div className="footer-mark">
          <LogoSvg aria-label="AVA" />
        </div>

        <div className="footer-mid">
          <div className="footer-locations">
            <div className="footer-location-item">
              <p className="footer-location">Yerevan, Armenia</p>
              <div className="footer-location-row">
                <button className="map-btn" onClick={() => openMapModal("yerevan")}>
                  See on map
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
            <a href="#privacy">Privacy policy</a>
            <a href="#terms">Terms of use</a>
          </div>
        </div>
      </footer>

      <Modal
        isOpen={isMapModalOpen}
        onClose={closeMapModal}
        title={selectedLocation === "spain" ? "Mijas, Malaga, Spain" : "Yerevan, Armenia"}
        size="xl"
      >
        <ModalBody>
          {selectedLocation === "yerevan" ? (
            <div className="map-container">
              <YerevanMap />
            </div>
          ) : (
            <div className="map-container">
              <p style={{ textAlign: "center", padding: "2rem", color: "#5f5346" }}>
                Spain map coming soon...
              </p>
            </div>
          )}
        </ModalBody>
      </Modal>
    </>
  );
}
