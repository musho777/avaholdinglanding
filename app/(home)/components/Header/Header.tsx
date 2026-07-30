"use client";

import { useState } from "react";
import { BookCallModal } from "@/components/BookCallModal";
import { useHeaderScroll } from "../../hooks/useHeaderScroll";

export default function Header() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { isHidden, hasBackground } = useHeaderScroll();

  return (
    <>
      <div
        className={`header-shell ${isHidden ? "header-hidden" : ""} ${hasBackground ? "header-with-bg" : ""}`}
        id="headerShell"
      >
        <nav className="header-nav">
          <div className="nav-left">
            <button className="menu-btn" id="menuBtn" aria-label="Open menu">
              <span className="menu-icon">
                <span></span>
                <span></span>
              </span>
              <span id="menuBtnLabel">Menu</span>
            </button>
          </div>
          <div className="nav-right">
            <a href="tel:+37498333372">+374 (77) 423333</a>
            <button className="book-btn" onClick={() => setIsModalOpen(true)}>
              <span>BOOK A CALL</span>
            </button>
          </div>
        </nav>
      </div>

      <BookCallModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
}
