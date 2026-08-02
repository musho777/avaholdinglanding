"use client";
import TimeSvg from "@/public/assets/TimeSvg";

export default function FounderSection() {
  return (
    <>
      <section className="founder-section" id="founder">
        <div className="founder-container container-padding">
          <div className="founder-content founder-content-reverse">
            <div className="founder-text">
              <h2 className="founder-title scroll-reveal">Eduard Ghazaryan</h2>
              <h3 className="founder-subtitle scroll-reveal delay-1">
                Founder of AVA Holding and Developer of AVA Residences
              </h3>
              <p className="founder-description scroll-reveal delay-1">
                Eduard Ghazaryan graduated from the Faculty of Economics before embarking on an
                entrepreneurial career spanning a diverse range of industries, including the
                restaurant and hospitality sectors, wheat importation, and flour milling. The
                extensive business experience he gained through establishing, managing and growing
                successful enterprises laid the foundation for his subsequent career in property
                development and investment projects.
              </p>
              <p className="founder-description scroll-reveal delay-2">
                Over the years, Eduard has successfully delivered a number of residential and
                commercial developments, acquiring comprehensive expertise across every stage of the
                development process—from concept and design through to construction and project
                completion.
              </p>
              <p className="founder-description scroll-reveal delay-2">
                Today, Eduard leads AVA Holding, a diversified property development company whose
                portfolio includes residential communities, commercial real estate, a business
                centre and logistics warehouse facilities. The company's flagship development, "AVA
                Residences", is a premium residential complex in Yerevan featuring interiors by
                "Elie Saab Maison".
              </p>
              <p className="founder-description scroll-reveal delay-3">
                Eduard's vision is to create developments that combine contemporary architecture,
                exceptional construction quality and international standards, with meticulous
                attention to aesthetics, craftsmanship and timeless elegance. His ambition is to
                introduce a new standard of residential living to Armenia by creating spaces that
                reflect the very best of contemporary international design and quality, enabling
                people to experience homes that meet the highest global standards.
              </p>
              <div className="founder-signature scroll-reveal delay-3">
                <div className="signature-line"></div>
              </div>
            </div>
            <div className="founder-image-wrapper">
              <TimeSvg width="100%" height="auto" style={{ maxWidth: '500px' }} />
            </div>
          </div>
        </div>
      </section>
      {/* <section className="founder-section founder-section-reverse">
        <div className="founder-container container-padding">
          <div className="founder-content">
            <div className="founder-text">
              <h2 className="founder-title scroll-reveal">FOUNDERS</h2>
              <p className="founder-description scroll-reveal delay-1">
                Founded with a passion for architectural excellence and timeless design, AVA brings
                together decades of expertise in creating spaces that harmonize with their
                environment. Our philosophy centers on sustainable luxury—where every detail is
                thoughtfully considered, from the first sketch to the final touch.
              </p>
              <p className="founder-description scroll-reveal delay-2">
                Each project reflects our commitment to craftsmanship, innovation, and the belief
                that great architecture should enhance the way we live, connect us to nature, and
                stand as a testament to enduring beauty
              </p>
              <div className="founder-signature scroll-reveal delay-3">
                <div className="signature-line"></div>
              </div>
            </div>

            <div className="founder-image-wrapper">
              <div className="founder-image">
                <img
                  src="/assets/view-from-business-startup-teamwork-concept-startup-partners-sitting-coworking-space-talking-about-future-project-looking-through-examples-work-laptop-digital-tablet_176420-8330.avif"
                  alt="Our Approach"
                  loading="lazy"
                />
              </div>
              <div className="founder-image-accent"></div>
            </div>
          </div>
        </div>
      </section> */}
    </>
  );
}
