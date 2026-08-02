"use client";

import { useEffect, useRef, useState } from "react";
import "./YerevanLocation.css";
import MapSvg from "../MapSvg/MapSvg";

// Location data matching the map address points
const locations = [
  {
    id: 1,
    name: "American University of Armenia",
    driveTime: "5-10min",
    driveUnit: "Walking",
    address: "40 Marshal Baghramyan Avenue",
    image: "/assets/usa.jpg",
  },
  {
    id: 2,
    name: "Lovers'Park",
    driveTime: "5 min Walking",
    address: "21 Marshal Baghramyan Ave",
    image: "/assets/lovers_park.jpg",
  },
  {
    id: 3,
    name: "NATIONAL ACADEMY OF SCIENCES OF ARMENIA",
    driveTime: "12 min Walking",
    address: "24 Marshal Baghramyan Avenue",
    image: "/assets/academia.jpg",
  },
  {
    id: 4,
    name: "Cascade Complex",
    driveTime: "12 min Walking",
    address: "10 Tamanyan Street",
    image: "/assets/location-1.jpg",
  },
  {
    id: 5,
    name: "Armenian Opera and Ballet Theatre",
    driveTime: "14 min Walking",
    address: "54 Tumanyan Street",
    image: "/assets/opera.jpg",
  },
];

export default function YerevanLocation() {
  const mapWrapperRef = useRef<HTMLDivElement>(null);
  const [cursorPosition, setCursorPosition] = useState<{ x: number; y: number } | null>(null);
  const [isHoveringMap, setIsHoveringMap] = useState(false);
  const [hoveredLocation, setHoveredLocation] = useState<number | null>(1); // Always show card 1 for testing
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

  // Add class to address wrapper when card is hovered - DISABLED FOR TESTING
  // useEffect(() => {
  //   // Remove class from previous hovered location
  //   if (previousHoveredRef.current) {
  //     const prevWrapper = document.getElementById(`address${previousHoveredRef.current}-wrapper`);
  //     if (prevWrapper) {
  //       prevWrapper.classList.remove("hovered-by-card");
  //     }
  //   }

  //   // Add class to new hovered location
  //   if (hoveredLocation) {
  //     const wrapper = document.getElementById(`address${hoveredLocation}-wrapper`);
  //     if (wrapper) {
  //       wrapper.classList.add("hovered-by-card");
  //     }
  //   }

  //   // Update ref
  //   previousHoveredRef.current = hoveredLocation;
  // }, [hoveredLocation]);

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
                      {/* Dark gradient overlay */}
                      <div className="card-gradient-overlay"></div>
                    </div>

                    {/* Card Content - Bottom positioned */}
                    <div className="card-content">
                      <div className="card-text-wrapper">
                        <h3 className="card-location-name">{location.name.toUpperCase()}</h3>
                      </div>
                      <div className="card-time-wrapper">
                        <p className="card-address">{location.address}</p>
                        <span className="card-drive-time">{location.driveTime}</span>
                      </div>
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
