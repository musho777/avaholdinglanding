export default function Slider() {
  return (
    <section className="slider" id="slider">
      <div className="slide-viewport">
        <div className="slide-track" id="slideTrack"></div>
      </div>
      <div className="slide-scrim"></div>

      <div className="slider-top">
        <button className="pill-btn" data-key="residences">
          Residences
        </button>
        <button className="pill-btn" data-key="gallery">
          Gallery
        </button>
      </div>

      <div className="slider-bottom">
        <div className="slide-counter">
          <span className="cur" id="slideCur">
            01
          </span>
          <span className="total" id="slideTotal">
            / 05
          </span>
        </div>
        <div className="slider-tabs">
          <button className="tab-btn" data-key="villas">
            Villas
          </button>
          <button className="tab-btn active" data-key="residences">
            Residences
          </button>
        </div>
      </div>

      <div className="slider-arrows">
        <button className="arrow-btn" id="slidePrev" aria-label="Previous slide">
          &#8592;
        </button>
        <button className="arrow-btn" id="slideNext" aria-label="Next slide">
          &#8594;
        </button>
      </div>

      <div className="slider-peek" id="sliderPeek"></div>

      <div className="slider-track">
        <div className="slider-track-thumb" id="sliderThumb"></div>
      </div>
    </section>
  );
}
