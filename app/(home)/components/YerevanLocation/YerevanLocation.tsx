"use client";

import { useEffect, useRef, useState } from "react";
import "./YerevanLocation.css";
import MapSvg from "../MapSvg/MapSvg";

// Location data matching the map address points
const locations = [
  {
    id: 1,
    name: "American University of Armenia",
    driveTime: "5",
    driveUnit: "MIN DRIVE BY CAR",
    address: "Republic Square, Yerevan, Armenia",
    image: "/assets/usa.avif", // Add your image path
  },
  {
    id: 2,
    name: "Lovers' Park",
    driveTime: "8",
    driveUnit: "MIN DRIVE BY CAR",
    address: "Lovers' Park, Yerevan",
    image: "/assets/LoversPark.jpg", // Add your image path
  },
  {
    id: 3,
    name: "National Academy of Sciences",
    driveTime: "15",
    driveUnit: "MIN DRIVE BY CAR",
    image: "/assets/academia.jpg", // Add your image path
  },
  {
    id: 4,
    name: "Cascade",
    driveTime: "5",
    driveUnit: "MIN DRIVE BY CAR",
    image: "/assets/location-1.jpeg", // Add your image path
  },
  {
    id: 5,
    name: "OPERA",
    driveTime: "60",
    driveUnit: "MIN DRIVE BY CAR",
    image: "/assets/opera.png", // Add your image path
  },
];

export default function YerevanLocation() {
  const mapWrapperRef = useRef<HTMLDivElement>(null);
  const [cursorPosition, setCursorPosition] = useState<{ x: number; y: number } | null>(null);
  const [isHoveringMap, setIsHoveringMap] = useState(false);
  const [hoveredLocation, setHoveredLocation] = useState<number | null>(null);
  const previousHoveredRef = useRef<number | null>(null);

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
              <span className="title-line scroll-reveal">PRIME LOCATION</span>
              <span className="title-line scroll-reveal delay-1">IN THE HEART OF</span>
              <span className="title-line scroll-reveal delay-1">YEREVAN</span>
            </h2>
            <button
              className="see-map-btn scroll-reveal delay-3"
              onClick={() => openGoogleMaps("Derenik Demirchyan 2-4, Yerevan, Armenia")}
            >
              <span>SEE ON MAP</span>
            </button>
          </div>

          {/* Single Floating Location Card - appears on hover */}
          {hoveredLocation && (
            <div className="location-card-popup">
              {(() => {
                const location = locations.find((loc) => loc.id === hoveredLocation);
                if (!location) return null;
                return (
                  <div className="floating-location-card">
                    {/* Card Image - background */}
                    <div className="card-image-wrapper">
                      <div
                        className="card-image"
                        style={{ backgroundImage: `url(${location.image})` }}
                      ></div>
                    </div>

                    {/* Card Content */}
                    <div className="card-content">
                      <div className="card-drive-time">{location.driveTime}</div>
                      <div className="card-drive-unit">{location.driveUnit}</div>
                      <h3 className="card-location-name">{location.name}</h3>
                    </div>
                  </div>
                );
              })()}
            </div>
          )}
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
