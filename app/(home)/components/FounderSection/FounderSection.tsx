"use client";
import TimeSvg from "@/public/assets/TimeSvg";

export default function FounderSection() {
  return (
    <section className="founder-section" id="founder">
      <div className="founder-container container-padding">
        <div className="founder-content-centered">
          <div className="founder-left-section">
            <div className="founder-image-circle scroll-reveal">
              <TimeSvg />
            </div>
          </div>

          <div className="founder-right-section">
            <div className="founder-header scroll-reveal delay-1">
              <h2 className="founder-name">EDUARD GHAZARYAN</h2>
              <p className="founder-role">Founder of AVA Holding and Developer of AVA Residences</p>
            </div>

            <div className="founder-bio">
              <p className="founder-paragraph scroll-reveal delay-2">
                Eduard Ghazaryan graduated from the Faculty of Economics before embarking on an
                entrepreneurial career spanning a diverse range of industries, including the
                restaurant and hospitality sectors, wheat importation, and flour milling. The
                extensive business experience he gained through establishing, managing and growing
                successful enterprises laid the foundation for his subsequent career in property
                development and investment projects.
              </p>
              <p className="founder-paragraph scroll-reveal delay-2">
                Over the years, Eduard has successfully delivered a number of residential and
                commercial developments, acquiring comprehensive expertise across every stage of the
                development process—from concept and design through to construction and project
                completion.
              </p>
              <p className="founder-paragraph scroll-reveal delay-3">
                Today, Eduard leads AVA Holding, a diversified property development company whose
                portfolio includes residential communities, commercial real estate, a business
                centre and logistics warehouse facilities. The company's flagship development, "AVA
                Residences", is a premium residential complex in Yerevan featuring interiors by
                "Elie Saab Maison".
              </p>
              <p className="founder-paragraph scroll-reveal delay-3">
                Eduard's vision is to create developments that combine contemporary architecture,
                exceptional construction quality and international standards, with meticulous
                attention to aesthetics, craftsmanship and timeless elegance. His ambition is to
                introduce a new standard of residential living to Armenia by creating spaces that
                reflect the very best of contemporary international design and quality, enabling
                people to experience homes that meet the highest global standards.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
