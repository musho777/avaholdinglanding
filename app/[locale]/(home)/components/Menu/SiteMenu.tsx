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
        <div className="site-menu-content">
          <div className="site-menu-body">
            <div className="site-menu-image">
              <div className="site-menu-image-photo" id="siteMenuImage"></div>
              <div className="site-menu-image-cover"></div>
            </div>
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
          </div>
          <div className="site-menu-foot">
            <div className="foot-left">
              <LanguageSwitcher />
            </div>
            <div className="foot-right">
              <a href="tel:+37498333372">{tHeader("phone")}</a>
              <button
                className="menu-book-btn"
                onClick={() => setIsModalOpen(true)}
              >
                <span>{t("bookACall")}</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <BookCallModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}
