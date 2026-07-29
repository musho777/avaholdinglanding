export default function Hero() {
  return (
    <div className="hero-wrapper">
      <section className="hero">
        <div className="hero-photo">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="hero-video"
          >
            <source src="/assets/hero.mp4" type="video/mp4" />
          </video>
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
