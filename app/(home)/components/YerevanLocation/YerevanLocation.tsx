"use client";

import { useEffect, useRef, useState } from "react";
import "./YerevanLocation.css";
import MapSvg from "../MapSvg/MapSvg";

// Location data matching the map address points
const locations = [
  {
    id: 1,
    name: "Republic Square",
    driveTime: "5",
    driveUnit: "MIN DRIVE BY CAR",
    address: "Republic Square, Yerevan, Armenia",
    image: "/assets/location-1.jpeg", // Add your image path
  },
  {
    id: 2,
    name: "Cascade Complex",
    driveTime: "8",
    driveUnit: "MIN DRIVE BY CAR",
    address: "Cascade, Tamanyan St, Yerevan",
    image: "/images/location-2.jpg", // Add your image path
  },
  {
    id: 3,
    name: "Zvartnots Airport",
    driveTime: "15",
    driveUnit: "MIN DRIVE BY CAR",
    address: "Zvartnots International Airport",
    image: "/images/location-3.jpg", // Add your image path
  },
  {
    id: 4,
    name: "Tsaghkadzor Ski Resort",
    driveTime: "45",
    driveUnit: "MIN DRIVE BY CAR",
    address: "Tsaghkadzor, Armenia",
    image: "/images/location-4.jpg", // Add your image path
  },
  {
    id: 5,
    name: "Lake Sevan",
    driveTime: "60",
    driveUnit: "MIN DRIVE BY CAR",
    address: "Lake Sevan, Armenia",
    image: "/images/location-5.jpg", // Add your image path
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
                      <button
                        className="card-location-pin"
                        onClick={(e) => {
                          e.stopPropagation();
                          openGoogleMaps(location.address);
                        }}
                        aria-label="View on map"
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                          <path
                            d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"
                            fill="currentColor"
                          />
                        </svg>
                      </button>
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
