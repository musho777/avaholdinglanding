"use client";

import { useState, useEffect, useRef } from "react";

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
  const [currentIndex, setCurrentIndex] = useState(1);
  const [mounted, setMounted] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const sliderThumbRef = useRef<HTMLDivElement>(null);
  const sliderTrackRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const dragStartY = useRef(0);
  const swipeStartX = useRef(0);
  const swipeStartY = useRef(0);
  const autoSlideTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Create extended array with clones for infinite loop effect
  // [last, ...original images..., first]
  const extendedImages = [images[images.length - 1], ...images, images[0]];

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    updateThumbPosition();
  }, [currentIndex]);

  // Handle infinite loop transitions
  useEffect(() => {
    if (!isTransitioning) return;

    const handleTransitionEnd = () => {
      // When we reach the cloned first slide (at the end)
      if (currentIndex === extendedImages.length - 1) {
        setIsTransitioning(false);
        setCurrentIndex(1); // Jump to real first slide
      }
      // When we reach the cloned last slide (at the beginning)
      else if (currentIndex === 0) {
        setIsTransitioning(false);
        setCurrentIndex(extendedImages.length - 2); // Jump to real last slide
      }
    };

    const track = sliderTrackRef.current;
    if (track) {
      track.addEventListener("transitionend", handleTransitionEnd);
      return () => track.removeEventListener("transitionend", handleTransitionEnd);
    }
  }, [currentIndex, isTransitioning, extendedImages.length]);

  // Re-enable transitions after jumping
  useEffect(() => {
    if (!isTransitioning) {
      const timeout = setTimeout(() => {
        setIsTransitioning(true);
      }, 50);
      return () => clearTimeout(timeout);
    }
  }, [isTransitioning]);

  // Auto-slide with reset capability
  const startAutoSlide = () => {
    // Clear existing timeout
    if (autoSlideTimeoutRef.current) {
      clearInterval(autoSlideTimeoutRef.current);
    }

    // Start new interval
    autoSlideTimeoutRef.current = setInterval(() => {
      setIsTransitioning(true);
      setCurrentIndex((prev) => prev + 1);
    }, 4500);
  };

  // Initialize auto-slide on mount
  useEffect(() => {
    startAutoSlide();
    return () => {
      if (autoSlideTimeoutRef.current) {
        clearInterval(autoSlideTimeoutRef.current);
      }
    };
  }, []);

  const updateThumbPosition = () => {
    if (!sliderThumbRef.current || !sliderThumbRef.current.parentElement) return;

    const trackH = sliderThumbRef.current.parentElement.clientHeight;
    const segment = trackH / images.length;

    // Calculate actual index for thumb position (excluding clones)
    let actualIndex = currentIndex - 1;
    if (currentIndex === 0) actualIndex = images.length - 1;
    if (currentIndex === extendedImages.length - 1) actualIndex = 0;

    sliderThumbRef.current.style.height = Math.max(segment - 6, 14) + "px";
    sliderThumbRef.current.style.transform = `translate3d(0, ${actualIndex * segment + 3}px, 0)`;
  };

  const goToPrevious = () => {
    setIsTransitioning(true);
    setCurrentIndex((prev) => prev - 1);
    startAutoSlide(); // Reset the auto-slide interval
  };

  const goToNext = () => {
    setIsTransitioning(true);
    setCurrentIndex((prev) => prev + 1);
    startAutoSlide(); // Reset the auto-slide interval
  };

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
      const newActualIndex = Math.floor(percentage * images.length);
      const newIndex = newActualIndex + 1; // Add 1 for the cloned slide at the beginning

      if (newIndex !== currentIndex && newIndex >= 1 && newIndex <= images.length) {
        setIsTransitioning(true);
        setCurrentIndex(newIndex);
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
      startAutoSlide(); // Reset the auto-slide interval after dragging
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
  }, [isDragging, currentIndex]);

  // Swipe handlers for the viewport
  const handleSwipeStart = (clientX: number, clientY: number) => {
    swipeStartX.current = clientX;
    swipeStartY.current = clientY;
  };

  const handleSwipeEnd = (clientX: number, clientY: number) => {
    const diffX = swipeStartX.current - clientX;
    const diffY = Math.abs(swipeStartY.current - clientY);

    // Only trigger if horizontal swipe is dominant
    if (Math.abs(diffX) > 50 && Math.abs(diffX) > diffY) {
      if (diffX > 0) {
        goToNext();
      } else {
        goToPrevious();
      }
    }
  };

  const handleViewportMouseDown = (e: React.MouseEvent) => {
    handleSwipeStart(e.clientX, e.clientY);
  };

  const handleViewportMouseUp = (e: React.MouseEvent) => {
    handleSwipeEnd(e.clientX, e.clientY);
  };

  const handleViewportTouchStart = (e: React.TouchEvent) => {
    handleSwipeStart(e.touches[0].clientX, e.touches[0].clientY);
  };

  const handleViewportTouchEnd = (e: React.TouchEvent) => {
    handleSwipeEnd(e.changedTouches[0].clientX, e.changedTouches[0].clientY);
  };

  const pad = (n: number) => String(n).padStart(2, "0");

  // Get actual display index (for counter)
  const getDisplayIndex = () => {
    if (currentIndex === 0) return images.length - 1;
    if (currentIndex === extendedImages.length - 1) return 0;
    return currentIndex - 1;
  };

  return (
    <section className="slider" id="slider">
      <div
        className="slide-viewport"
        ref={viewportRef}
        onMouseDown={handleViewportMouseDown}
        onMouseUp={handleViewportMouseUp}
        onTouchStart={handleViewportTouchStart}
        onTouchEnd={handleViewportTouchEnd}
        style={{ cursor: "grab", userSelect: "none" }}
      >
        <div
          className="slide-track"
          ref={sliderTrackRef}
          style={{
            transform: `translate3d(-${currentIndex * 100}%, 0, 0)`,
            transition: isTransitioning ? "transform 0.5s ease-in-out" : "none",
          }}
        >
          {mounted &&
            extendedImages.map((image, idx) => (
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

      <div className="slider-bottom scroll-reveal">
        <div className="slide-counter">
          <span className="cur">{pad(getDisplayIndex() + 1)}</span>
          <span className="total">/ {pad(images.length)}</span>
        </div>
      </div>

      <div className="slider-arrows scroll-reveal delay-1">
        <button className="arrow-btn" onClick={goToPrevious} aria-label="Previous slide">
          &#8592;
        </button>
        <button className="arrow-btn" onClick={goToNext} aria-label="Next slide">
          &#8594;
        </button>
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
