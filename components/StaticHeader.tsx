"use client";

import { useState } from "react";
import Link from "next/link";
import { BookCallModal } from "@/components/BookCallModal";
import LogoSvg from "@/public/assets/Logo";

export default function StaticHeader() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div className="static-header">
        <nav className="static-header-nav">
          <Link href="/" className="static-header-logo">
            <LogoSvg className="static-logo-svg" />
          </Link>

          <div className="nav-right">
            <a href="tel:+37477423333">+374 (77) 423333</a>
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
