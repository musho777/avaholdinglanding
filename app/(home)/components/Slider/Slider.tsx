export default function Slider() {
  return (
    <section className="slider" id="slider">
      <div className="slide-viewport">
        <div className="slide-track" id="slideTrack"></div>
      </div>
      <div className="slide-scrim"></div>

      <div className="slider-bottom">
        <div className="slide-counter">
          <span className="cur" id="slideCur">
            01
          </span>
          <span className="total" id="slideTotal">
            / 05
          </span>
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
