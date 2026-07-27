export default function QuoteSection() {
  return (
    <section className="quote-section" id="story">
      <div className="quote-bg"></div>
      <div className="quote-inner">
        <div>
          <p className="quote-fill" id="quoteText">
            "Each residence is set to hold the view, so the ridge, the water, and the shifting
            light stay part of daily life, not scenery glimpsed on the way somewhere else."
          </p>
          <p className="quote-caption">
            From every vantage point on the property, the outlook changes with the season and the
            hour. The cabins are built to stay quiet in front of it.
          </p>
        </div>

        <div className="play-wrap" id="playWrap">
          <button className="play-btn" id="playBtn" type="button" aria-label="play the audio">
            <div className="button-bg"></div>
            <span className="button-animation">
              <span className="button-circle"></span>
              <span className="button-circle"></span>
              <span className="button-circle"></span>
              <span className="button-circle"></span>
            </span>
            <span className="button-text" id="playBtnText">
              Play
            </span>
          </button>
        </div>

        <div className="waveform-row">
          <span className="wf-time" id="wfElapsed">
            0:00
          </span>
          <div className="waveform" id="waveform"></div>
          <span className="wf-time" id="wfTotal">
            0:31
          </span>
        </div>

        <p className="quote-credit">AVA Studio &amp; Atmosphere Projects</p>
      </div>
    </section>
  );
}
