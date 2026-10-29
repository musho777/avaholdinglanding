"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import "./ExploreSection.css";

const cards = [
  { key: "derenikDemirchyan", image: "/assets/derenik-demirchyan.jpeg" },
  { key: "karapetUlnetsi", image: "/assets/karapet-ulnetsi.jpg" },
  { key: "archedBuilding", image: "/assets/davit-anhakht-17.webp" },
] as const;

export default function ExploreSection() {
  const t = useTranslations("explore");

  return (
    <section className="explore-section container-padding" id="explore">
      <div className="explore-header scroll-reveal">
        <h2 className="explore-title">{t("title")}</h2>
      </div>

      <div className="explore-grid">
        {cards.map((card, index) => (
          <div key={card.key} className={`explore-card scroll-reveal delay-${index + 1}`}>
            <div className={`explore-card-media reveal-mask delay-${index + 1}`}>
              <Image
                src={card.image}
                alt={t(card.key)}
                fill
                sizes="(max-width: 600px) 100vw, 33vw"
                className="explore-card-img"
              />
            </div>
            <div className="explore-card-caption">
              <span className="explore-card-number">{String(index + 1).padStart(2, "0")}</span>
              <p className="explore-card-label">{t(card.key)}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
