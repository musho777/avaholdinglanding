"use client";

export default function FounderSection() {
  return (
    <section className="founder-section" id="founder">
      <div className="founder-container">
        <div className="founder-content">
          <div className="founder-text">
            <h2 className="founder-title">Vision & Craftsmanship</h2>
            <p className="founder-description">
              Founded with a passion for architectural excellence and timeless design, AVA brings
              together decades of expertise in creating spaces that harmonize with their
              environment. Our philosophy centers on sustainable luxury—where every detail is
              thoughtfully considered, from the first sketch to the final touch.
            </p>
            <p className="founder-description">
              Each project reflects our commitment to craftsmanship, innovation, and the belief
              that great architecture should enhance the way we live, connect us to nature, and
              stand as a testament to enduring beauty.
            </p>
            <div className="founder-signature">
              <div className="signature-line"></div>
              <span className="founder-name">Founding Team, AVA Studio</span>
            </div>
          </div>

          <div className="founder-image-wrapper">
            <div className="founder-image">
              <img
                src="/assets/view-from-business-startup-teamwork-concept-startup-partners-sitting-coworking-space-talking-about-future-project-looking-through-examples-work-laptop-digital-tablet_176420-8330.avif"
                alt="AVA Studio Founding Team"
                loading="lazy"
              />
            </div>
            <div className="founder-image-accent"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
