"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";

const images = [
  "/assets/AVA1.jpg",
  "/assets/AVA2.jpg",
  "/assets/AVA3.jpg",
  "/assets/AVA4.jpg",
  "/assets/AVA5.jpg",
  "/assets/AVA6.jpg",
  "/assets/AVA7.jpg",
  "/assets/AVA8.jpg",
  "/assets/AVA9.jpg",
  "/assets/AVA10.jpg",
  "/assets/AVA11.jpg",
];

export default function Slider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [mounted, setMounted] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const sliderThumbRef = useRef<HTMLDivElement>(null);
  const dragStartY = useRef(0);

  const autoplayPlugin = useRef(
    Autoplay({ delay: 4500, stopOnInteraction: false })
  );

  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
      duration: 25,
      skipSnaps: false,
    },
    [autoplayPlugin.current]
  );

  useEffect(() => {
    setMounted(true);
  }, []);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setCurrentIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;

    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);

    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi, onSelect]);

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

  const scrollPrev = useCallback(() => {
    if (emblaApi) {
      emblaApi.scrollPrev();
      autoplayPlugin.current.reset();
    }
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) {
      emblaApi.scrollNext();
      autoplayPlugin.current.reset();
    }
  }, [emblaApi]);

  const scrollTo = useCallback(
    (index: number) => {
      if (emblaApi) {
        emblaApi.scrollTo(index);
        autoplayPlugin.current.reset();
      }
    },
    [emblaApi]
  );

  // Thumb dragging handlers
  const handleThumbMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
    dragStartY.current = e.clientY;
  };

  const handleThumbTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    dragStartY.current = e.touches[0].clientY;
  };

  useEffect(() => {
    const handleMove = (clientY: number) => {
      if (!isDragging || !sliderThumbRef.current?.parentElement) return;

      const track = sliderThumbRef.current.parentElement;
      const rect = track.getBoundingClientRect();
      const y = clientY - rect.top;
      const percentage = Math.max(0, Math.min(1, y / rect.height));
      const newIndex = Math.floor(percentage * images.length);

      if (newIndex !== currentIndex && newIndex >= 0 && newIndex < images.length) {
        scrollTo(newIndex);
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      handleMove(e.clientY);
    };

    const handleTouchMove = (e: TouchEvent) => {
      handleMove(e.touches[0].clientY);
    };

    const handleEnd = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleEnd);
      document.addEventListener("touchmove", handleTouchMove);
      document.addEventListener("touchend", handleEnd);
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleEnd);
      document.removeEventListener("touchmove", handleTouchMove);
      document.removeEventListener("touchend", handleEnd);
    };
  }, [isDragging, currentIndex, scrollTo]);

  const pad = (n: number) => String(n).padStart(2, "0");

  return (
    <section className="slider" id="slider">
      <div className="slide-viewport" ref={emblaRef}>
        <div className="slide-track">
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

      <div className="slider-bottom scroll-reveal container-padding">
        <div className="slide-counter">
          <span className="cur">{pad(currentIndex + 1)}</span>
          <span className="total">/ {pad(images.length)}</span>
        </div>
        <div className="slider-arrows">
          <button className="arrow-btn" onClick={scrollPrev} aria-label="Previous slide">
            &#8592;
          </button>
          <button className="arrow-btn" onClick={scrollNext} aria-label="Next slide">
            &#8594;
          </button>
        </div>
      </div>

      <div className="slider-track">
        <div
          className="slider-track-thumb"
          ref={sliderThumbRef}
          onMouseDown={handleThumbMouseDown}
          onTouchStart={handleThumbTouchStart}
          style={{ cursor: isDragging ? "grabbing" : "grab" }}
        ></div>
      </div>
    </section>
  );
}
