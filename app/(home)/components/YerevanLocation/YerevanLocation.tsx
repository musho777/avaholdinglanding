"use client";

import { useEffect, useRef, useState } from "react";
import "./YerevanLocation.css";
import MapSvg from "../MapSvg/MapSvg";

// Location data matching the map address points
const locations = [
  {
    id: 1,
    name: "Derenik Demirchyan 2-4",
    district: "Yerevan",
    description: "Premium office location in the heart of Yerevan's business district.",
    address: "Derenik Demirchyan 2-4, Yerevan, Armenia",
    coordinates: { x: 0, y: 0 },
  },
  {
    id: 2,
    name: "Northern Branch",
    district: "Yerevan",
    description: "Strategic location with excellent connectivity and modern amenities.",
    address: "Northern District, Yerevan, Armenia",
    coordinates: { x: 0, y: 0 },
  },
  {
    id: 3,
    name: "Central Office",
    district: "Yerevan",
    description: "Prime central location with easy access to major landmarks.",
    address: "Central District, Yerevan, Armenia",
    coordinates: { x: 0, y: 0 },
  },
  {
    id: 4,
    name: "Eastern Branch",
    district: "Yerevan",
    description: "Modern facilities in a rapidly developing area.",
    address: "Eastern District, Yerevan, Armenia",
    coordinates: { x: 0, y: 0 },
  },
  {
    id: 5,
    name: "Southern Branch",
    district: "Yerevan",
    description: "Well-connected location with excellent transport links.",
    address: "Southern District, Yerevan, Armenia",
    coordinates: { x: 0, y: 0 },
  },
];

export default function YerevanLocation() {
  const mapWrapperRef = useRef<HTMLDivElement>(null);
  const [cursorPosition, setCursorPosition] = useState<{ x: number; y: number } | null>(null);
  const [isHoveringMap, setIsHoveringMap] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState<number | null>(null);
  const [showCards, setShowCards] = useState(true);
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

    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener("resize", centerScroll);
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
        prevWrapper.classList.remove('hovered-by-card');
      }
    }

    // Add class to new hovered location
    if (hoveredLocation) {
      const wrapper = document.getElementById(`address${hoveredLocation}-wrapper`);
      if (wrapper) {
        wrapper.classList.add('hovered-by-card');
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
          data-hovered-location={hoveredLocation || ''}
        >
          <MapSvg className="map-image" />

          {/* Toggle Button */}
          <button
            className={`cards-toggle-btn ${showCards ? 'active' : ''}`}
            onClick={() => setShowCards(!showCards)}
            aria-label={showCards ? 'Hide locations' : 'Show locations'}
          >
            <span className="toggle-icon">
              {showCards ? (
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M15 10L5 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              ) : (
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M4 6h12M4 10h12M4 14h12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              )}
            </span>
            <span className="toggle-text">{showCards ? 'Hide Locations' : 'Show Locations'}</span>
          </button>

          {/* Floating Location Cards */}
          <div className={`location-cards-overlay ${showCards ? 'visible' : 'hidden'}`}>
            <div className="overlay-header">
              <h2 className="overlay-title">Premium Locations</h2>
              <div className="overlay-divider"></div>
            </div>

            <div className="location-cards-scroll">
              {locations.map((location, index) => (
                <div
                  key={location.id}
                  className={`floating-location-card ${selectedLocation === location.id ? "card-selected" : ""} ${hoveredLocation === location.id ? "card-hovered" : ""}`}
                  onClick={() => setSelectedLocation(location.id)}
                  onMouseEnter={() => setHoveredLocation(location.id)}
                  onMouseLeave={() => setHoveredLocation(null)}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="card-number">{String(index + 1).padStart(2, '0')}</div>
                  <div className="card-content">
                    <h3 className="card-title">{location.name}</h3>
                    <span className="card-district">{location.district}</span>
                    <p className="card-description">{location.description}</p>
                    <button
                      className="card-view-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        openGoogleMaps(location.address);
                      }}
                    >
                      <span>View Location</span>
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path d="M6 12L10 8L6 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>
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
