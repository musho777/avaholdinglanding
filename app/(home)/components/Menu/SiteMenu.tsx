"use client";

import { useState } from "react";
import { BookCallModal } from "@/components/BookCallModal";
import LogoSvg from "@/public/assets/Logo";

export default function SiteMenu() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div className="site-menu" id="siteMenu">
        <div className="site-menu-top">
          <button className="close-btn" id="closeBtn">
            <span className="close-icon">
              <span></span>
              <span></span>
            </span>
            Close
          </button>
          <span className="site-menu-wordmark">
            <LogoSvg />
          </span>
        </div>
        <div className="site-menu-content">
          <div className="site-menu-body">
            <div className="site-menu-image">
              <div className="site-menu-image-photo" id="siteMenuImage"></div>
              <div className="site-menu-image-cover"></div>
            </div>
            <nav className="site-menu-links">
              <a href="#story" data-menu-link>
                THE RESIDENCES
              </a>
              <a href="#location" data-menu-link>
                LOCATION
              </a>
              <a href="#slider" data-menu-link>
                GALLERY
              </a>
              <a href="#founder" data-menu-link>
                FOUNDER
              </a>
              <a href="#contact" data-menu-link>
                CONTACT
              </a>
            </nav>
          </div>
          <div className="site-menu-foot">
            <div className="foot-left"></div>
            <div className="foot-right">
              <a href="tel:+37498333372">+374 (77) 423333</a>
              <button className="menu-book-btn" onClick={() => setIsModalOpen(true)}>
                <span>BOOK A CALL</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <BookCallModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
}
