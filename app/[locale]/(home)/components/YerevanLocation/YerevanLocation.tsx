"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import dynamic from "next/dynamic";
import "./YerevanLocation.css";

// Lazy load the heavy 1.8MB MapSvg component for better scroll performance
const MapSvg = dynamic(() => import("../MapSvg/MapSvg"), {
  ssr: false,
  loading: () => <div className="map-image map-placeholder" />,
});

// Location keys for translation lookup
const locationKeys = ["aua", "loversPark", "academy", "cascade", "opera"] as const;
const locationImages = [
  "/assets/usa.webp",
  "/assets/lovers_park.webp",
  "/assets/academia.webp",
  "/assets/location-1.webp",
  "/assets/opera.webp",
];

export default function YerevanLocation() {
  const t = useTranslations("location");
  const mapWrapperRef = useRef<HTMLDivElement>(null);
  const previousHoveredRef = useRef<number | null>(null);
  const [cursorPosition, setCursorPosition] = useState<{ x: number; y: number } | null>(null);
  const [isHoveringMap, setIsHoveringMap] = useState(false);
  const [hoveredLocation, setHoveredLocation] = useState<number | null>(null);

  // Build locations array from translations
  const locations = locationKeys.map((key, index) => ({
    id: index + 1,
    name: t(`locations.${key}.name`),
    driveTime: t(`locations.${key}.driveTime`),
    address: t(`locations.${key}.address`),
    image: locationImages[index],
  }));

  useEffect(() => {
    const centerScroll = () => {
      if (mapWrapperRef.current) {
        const wrapper = mapWrapperRef.current;
        const scrollWidth = wrapper.scrollWidth;
        const clientWidth = wrapper.clientWidth;
        const centerPosition = (scrollWidth - clientWidth) / 2;

        wrapper.scrollLeft = centerPosition;
      }
    };

    // Center on mount and after a short delay for images to load
    centerScroll();
    const timeoutId = setTimeout(centerScroll, 100);

    // Re-center on window resize
    window.addEventListener("resize", centerScroll);

    // Add hover listeners to address wrappers
    const addHoverListeners = () => {
      for (let i = 1; i <= 5; i++) {
        const wrapper = document.getElementById(`address${i}-wrapper`);
        if (wrapper) {
          wrapper.addEventListener("mouseenter", () => setHoveredLocation(i));
          wrapper.addEventListener("mouseleave", () => setHoveredLocation(null));
        }
      }
    };

    // Add listeners after a short delay to ensure SVG is loaded
    const listenersTimeoutId = setTimeout(addHoverListeners, 200);

    return () => {
      clearTimeout(timeoutId);
      clearTimeout(listenersTimeoutId);
      window.removeEventListener("resize", centerScroll);

      // Clean up hover listeners
      for (let i = 1; i <= 5; i++) {
        const wrapper = document.getElementById(`address${i}-wrapper`);
        if (wrapper) {
          wrapper.removeEventListener("mouseenter", () => setHoveredLocation(i));
          wrapper.removeEventListener("mouseleave", () => setHoveredLocation(null));
        }
      }
    };
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    setCursorPosition({ x: e.clientX, y: e.clientY });
  };

  const handleMouseEnter = () => {
    setIsHoveringMap(true);
  };

  const handleMouseLeave = () => {
    setIsHoveringMap(false);
    setCursorPosition(null);
  };

  // Add class to address wrapper when card is hovered
  useEffect(() => {
    // Remove class from previous hovered location
    if (previousHoveredRef.current) {
      const prevWrapper = document.getElementById(`address${previousHoveredRef.current}-wrapper`);
      if (prevWrapper) {
        prevWrapper.classList.remove("hovered-by-card");
      }
    }

    // Add class to new hovered location
    if (hoveredLocation) {
      const wrapper = document.getElementById(`address${hoveredLocation}-wrapper`);
      if (wrapper) {
        wrapper.classList.add("hovered-by-card");
      }
    }

    // Update ref
    previousHoveredRef.current = hoveredLocation;
  }, [hoveredLocation]);

  const openGoogleMaps = (address: string) => {
    const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
    window.open(googleMapsUrl, "_blank");
  };

  return (
    <section className="yerevan-location" id="location">
      <div className="location-container">
        {/* Map Section */}
        <div
          className="map-wrapper"
          ref={mapWrapperRef}
          onMouseMove={handleMouseMove}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          data-hovered-location={hoveredLocation || ""}
        >
          <MapSvg className="map-image" />

          <div className="map-text-overlay container-padding">
            <h2 className="map-title">
              <span className="title-line scroll-reveal">{t("titleLine1")}</span>
              <span className="title-line scroll-reveal delay-1">{t("titleLine2")}</span>
              <span className="title-line scroll-reveal delay-1">{t("titleLine3")}</span>
            </h2>
            <button
              className="see-map-btn scroll-reveal delay-3"
              onClick={() => openGoogleMaps("Derenik Demirchyan 2-4, Yerevan, Armenia")}
            >
              <span>{t("seeOnMap")}</span>
            </button>
          </div>

          {/* Location Cards Row - Always visible */}
          <div className="location-cards-row">
            {locations.map((location) => (
              <div
                key={location.id}
                className={`location-card ${hoveredLocation === location.id ? "active" : ""}`}
                onMouseEnter={() => setHoveredLocation(location.id)}
                onMouseLeave={() => setHoveredLocation(null)}
                onClick={() => openGoogleMaps(location.address)}
              >
                <div className="card-image-wrapper">
                  <div
                    className="card-image"
                    style={{ backgroundImage: `url(${location.image})` }}
                  ></div>
                  <div className="card-gradient-overlay"></div>
                </div>
                <div className="card-content">
                  <h3 className="card-location-name">{location.name.toUpperCase()}</h3>
                  <div className="card-time-wrapper">
                    <p className="card-address">{location.address}</p>
                    <span className="card-drive-time">{location.driveTime}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Custom cursor circles - WhatsApp style */}
      {isHoveringMap && cursorPosition && (
        <div
          className="custom-cursor-container"
          style={{
            left: `${cursorPosition.x}px`,
            top: `${cursorPosition.y}px`,
          }}
        >
          <div className="cursor-ring cursor-ring-1" />
          <div className="cursor-ring cursor-ring-2" />
          <div className="cursor-ring cursor-ring-3" />
        </div>
      )}
    </section>
  );
}
