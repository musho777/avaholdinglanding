"use client";

import { useTranslations } from "next-intl";

export default function FounderTextSection() {
  const t = useTranslations("founderText");

  return (
    <section className="founder-text-section" id="founder">
      <div className="founder-text-content scroll-reveal">
        <div className="founder-text-heading">
          <h2 className="founder-text-name">{t("name")}</h2>
          <p className="founder-text-role">{t("role")}</p>
        </div>

        <div className="founder-text-bio">
          <p className="founder-text-paragraph">
            {t("paragraph1")}
              <span style={{ display: "block", marginTop: "1.5em" }}>
    {t("paragraph3")}
  </span>
          </p>
          <p className="founder-text-paragraph">
            {t("paragraph2")}
             <span style={{ display: "block", marginTop: "1.5em" }}>
    {t("paragraph4")}
  </span>
          </p>
          {/* <p className="founder-text-paragraph">
            {t("paragraph3")}

          </p> */}
           {/* <p className="founder-text-paragraph">
            {t("paragraph4")}
          </p> */}
        </div>
      </div>
    </section>
  );
}
