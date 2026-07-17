"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export function SiteHeader() {
  const [visible, setVisible] = useState(true);
  const lastY = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const currentY = window.scrollY;
      const scrollingUp = currentY < lastY.current;

      if (currentY < 40) {
        setVisible(true);
      } else {
        setVisible(scrollingUp);
      }

      lastY.current = currentY;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-transform duration-500 ${
        visible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div className="mx-auto flex h-20 w-full max-w-6xl items-center justify-between px-6">
        <Link href="/" className="font-serif text-2xl tracking-wide text-[#2a241d]">
          AVA Holding
        </Link>
        <nav className="flex items-center gap-7 text-sm tracking-[0.18em] text-[#4f4336]">
          <a href="#projects" className="transition-colors hover:text-[#8f7647]">
            Projects
          </a>
          <a href="#services" className="transition-colors hover:text-[#8f7647]">
            Services
          </a>
          <a href="#contact" className="transition-colors hover:text-[#8f7647]">
            Contact
          </a>
        </nav>
      </div>
    </header>
  );
}
