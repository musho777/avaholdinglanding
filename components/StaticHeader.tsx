"use client";

import { useState } from "react";
import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";
import { BookCallModal } from "@/components/BookCallModal";
import LogoSvg from "@/public/assets/Logo";

export default function StaticHeader() {
  const t = useTranslations("staticHeader");
  const locale = useLocale();
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div className="static-header">
        <nav className="static-header-nav">
          <Link href={`/${locale}`} className="static-header-logo">
            <LogoSvg className="static-logo-svg" />
          </Link>

          <div className="nav-right">
            <a href="tel:+37498333372">{t("phone")}</a>
            <button className="book-btn" onClick={() => setIsModalOpen(true)}>
              <span>{t("bookACall")}</span>
            </button>
          </div>
        </nav>
      </div>

      <BookCallModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
}
