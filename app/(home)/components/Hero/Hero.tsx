export default function Hero() {
  return (
    <div className="hero-wrapper">
      <section className="hero">
        <div className="hero-photo">
          <video autoPlay loop muted playsInline preload="auto" className="hero-video">
            <source src="/assets/hero.mp4" type="video/mp4" />
          </video>
        </div>
        <div className="hero-text-overlay">
          <p className="hero-text-top">For those</p>
          <h1 className="hero-text-main">WHO CHOOSE</h1>
          <p className="hero-text-bottom">the right moment.</p>
        </div>
        <p className="hero-caption">
          <span className="scroll-cue">
            <span className="line"></span>Scroll
          </span>
        </p>
      </section>
    </div>
  );
}
