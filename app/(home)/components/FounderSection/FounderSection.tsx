"use client";

export default function FounderSection() {
  return (
    <section className="founder-section-modern" id="founder">
      <div className="founder-modern-container">
        {/* Vision Card */}
        <div className="founder-vision-card scroll-reveal">
          <div className="vision-card-image">
            <img src="/assets/BrandAssets-03.png" alt="AVA Studio Founding Team" loading="lazy" />
          </div>
          <div className="vision-card-content">
            <h3 className="vision-card-title">VISION & CRAFTSMANSHIP</h3>
            <p className="vision-card-text">
              Founded with a passion for architectural excellence and timeless design, AVA brings
              together decades of expertise in creating spaces that harmonize with their
              environment. Our philosophy centers on sustainable luxury—where every detail is
              thoughtfully considered, from the first sketch to the final touch.
            </p>
            <p className="vision-card-text">
              Each project reflects our commitment to craftsmanship, innovation, and the belief
              that great architecture should enhance the way we live, connect us to nature, and
              stand as a testament to enduring beauty.
            </p>
          </div>
        </div>

        {/* Founder Profile */}
        <div className="founder-modern-profile">
          <div className="profile-header">
            <div>
              <h3 className="profile-name">Eduard Ghazaryan</h3>
              <p className="profile-role">Founder of AVA Holding and Developer of AVA Residences</p>
            </div>
          </div>

          <div className="profile-grid">
            <div className="profile-bio scroll-reveal delay-1">
              <p>
                Eduard Ghazaryan graduated from the Faculty of Economics before embarking on an
                entrepreneurial career spanning a diverse range of industries, including the
                restaurant and hospitality sectors, wheat importation, and flour milling. The
                extensive business experience he gained through establishing, managing and growing
                successful enterprises laid the foundation for his subsequent career in property
                development and investment projects.
              </p>
              <p>
                Over the years, Eduard has successfully delivered a number of residential and
                commercial developments, acquiring comprehensive expertise across every stage of the
                development process—from concept and design through to construction and project
                completion.
              </p>
            </div>

            <div className="profile-highlights scroll-reveal delay-2">
              <div className="highlight-item">
                <p>
                  Today, Eduard leads AVA Holding, a diversified property development company whose
                  portfolio includes residential communities, commercial real estate, a business
                  centre and logistics warehouse facilities. The company's flagship development, "AVA
                  Residences", is a premium residential complex in Yerevan featuring interiors by
                  "Elie Saab Maison".
                </p>
              </div>
              <div className="highlight-item">
                <p>
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
      </div>
    </section>
  );
}
