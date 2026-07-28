"use client";

import { useState, useEffect, useRef } from "react";

const images = ["/assets/1.jpg", "/assets/2.jpg", "/assets/3.jpg", "/assets/5.jpg"];

export default function Slider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [mounted, setMounted] = useState(false);
  const sliderThumbRef = useRef<HTMLDivElement>(null);
  const sliderTrackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    updateThumbPosition();
  }, [currentIndex]);

  const updateThumbPosition = () => {
    if (!sliderThumbRef.current || !sliderThumbRef.current.parentElement) return;

    const trackH = sliderThumbRef.current.parentElement.clientHeight;
    const segment = trackH / images.length;
    sliderThumbRef.current.style.height = Math.max(segment - 6, 14) + "px";
    sliderThumbRef.current.style.transform = `translate3d(0, ${currentIndex * segment + 3}px, 0)`;
  };

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const pad = (n: number) => String(n).padStart(2, "0");

  return (
    <section className="slider" id="slider">
      <div className="slide-viewport">
        <div
          className="slide-track"
          ref={sliderTrackRef}
          style={{
            transform: `translate3d(-${currentIndex * 100}%, 0, 0)`,
          }}
        >
          {mounted &&
            images.map((image, idx) => (
              <div key={idx} className={`slide ${idx === currentIndex ? "active" : ""}`}>
                <div
                  className="slide-inner"
                  style={{
                    backgroundImage: `url(${image})`,
                  }}
                />
              </div>
            ))}
        </div>
      </div>
      <div className="slide-scrim"></div>

      <div className="slider-bottom">
        <div className="slide-counter">
          <span className="cur">{pad(currentIndex + 1)}</span>
          <span className="total">/ {pad(images.length)}</span>
        </div>
      </div>

      <div className="slider-arrows">
        <button className="arrow-btn" onClick={goToPrevious} aria-label="Previous slide">
          &#8592;
        </button>
        <button className="arrow-btn" onClick={goToNext} aria-label="Next slide">
          &#8594;
        </button>
      </div>

      <div className="slider-track">
        <div className="slider-track-thumb" ref={sliderThumbRef}></div>
      </div>
    </section>
  );
}
