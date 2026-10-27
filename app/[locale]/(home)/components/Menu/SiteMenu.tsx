"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { BookCallModal } from "@/components/BookCallModal";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import LogoSvg from "@/public/assets/Logo";

export default function SiteMenu() {
  const t = useTranslations("menu");
  const tHeader = useTranslations("header");
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
            {t("close")}
          </button>
          <span className="site-menu-wordmark">
            <LogoSvg />
          </span>
        </div>

        <div className="site-menu-lang">
          <LanguageSwitcher />
        </div>

        <div className="site-menu-bottom">
          <nav className="site-menu-links">
            <a href="#story" data-menu-link>
              {t("projects")}
            </a>
            <a href="#location" data-menu-link>
              {t("location")}
            </a>
            <a href="#slider" data-menu-link>
              {t("gallery")}
            </a>
            <a href="#founder" data-menu-link>
              {t("founder")}
            </a>
            <a href="#contact" data-menu-link>
              {t("contact")}
            </a>
          </nav>
          <div className="site-menu-phone">
            <a href="tel:+37498333372">{tHeader("phone")}</a>
          </div>
        </div>
      </div>

      <BookCallModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
}
