"use client";

import { useEffect } from "react";
import { useTranslations } from "next-intl";
import StaticHeader from "@/components/StaticHeader";
import "./privacy.css";

export default function PrivacyPolicy() {
  const t = useTranslations("privacy");
  const tFooter = useTranslations("footer");

  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate-in");
        }
      });
    }, observerOptions);

    const elements = document.querySelectorAll(".fade-in");
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <StaticHeader />
      <div className="privacy-page">
        <div className="privacy-header fade-in">
          <h1 className="privacy-title">{t("title")}</h1>
          <p className="privacy-subtitle">{t("lastUpdated")}</p>
        </div>

      <div className="privacy-content">
        <section className="privacy-section fade-in">
          <h2>{t("section1.title")}</h2>
          <p>{t("section1.content")}</p>
        </section>

        <section className="privacy-section fade-in">
          <h2>{t("section2.title")}</h2>
          <p>{t("section2.intro")}</p>
          <ul>
            <li>
              <strong>{t("section2.identityData")}</strong> {t("section2.identityDataDesc")}
            </li>
            <li>
              <strong>{t("section2.contactData")}</strong> {t("section2.contactDataDesc")}
            </li>
            <li>
              <strong>{t("section2.technicalData")}</strong> {t("section2.technicalDataDesc")}
            </li>
            <li>
              <strong>{t("section2.usageData")}</strong> {t("section2.usageDataDesc")}
            </li>
          </ul>
        </section>

        <section className="privacy-section fade-in">
          <h2>{t("section3.title")}</h2>
          <p>{t("section3.intro")}</p>
          <ul>
            <li>{t("section3.item1")}</li>
            <li>{t("section3.item2")}</li>
            <li>{t("section3.item3")}</li>
            <li>{t("section3.item4")}</li>
            <li>{t("section3.item5")}</li>
            <li>{t("section3.item6")}</li>
          </ul>
        </section>

        <section className="privacy-section fade-in">
          <h2>{t("section4.title")}</h2>
          <p>{t("section4.content")}</p>
        </section>

        <section className="privacy-section fade-in">
          <h2>{t("section5.title")}</h2>
          <p>{t("section5.content")}</p>
        </section>

        <section className="privacy-section fade-in">
          <h2>{t("section6.title")}</h2>
          <p>{t("section6.intro")}</p>
          <ul>
            <li>{t("section6.item1")}</li>
            <li>{t("section6.item2")}</li>
            <li>{t("section6.item3")}</li>
            <li>{t("section6.item4")}</li>
            <li>{t("section6.item5")}</li>
            <li>{t("section6.item6")}</li>
            <li>{t("section6.item7")}</li>
          </ul>
        </section>

        <section className="privacy-section fade-in">
          <h2>{t("section7.title")}</h2>
          <p>{t("section7.content")}</p>
        </section>

        <section className="privacy-section fade-in">
          <h2>{t("section8.title")}</h2>
          <p>{t("section8.content")}</p>
        </section>

        <section className="privacy-section fade-in">
          <h2>{t("section9.title")}</h2>
          <p>{t("section9.content")}</p>
          <p className="contact-info">
            Email: <a href="mailto:info@avaholding.com">{tFooter("email")}</a>
            <br />
            Phone: <a href="tel:+37498333372">{tFooter("phone")}</a>
          </p>
        </section>
      </div>
    </div>
    </>
  );
}
