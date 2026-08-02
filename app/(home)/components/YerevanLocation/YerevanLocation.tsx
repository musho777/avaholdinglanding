"use client";

import { useEffect, useRef, useState } from "react";
import "./YerevanLocation.css";
import MapSvg from "../MapSvg/MapSvg";

export default function YerevanLocation() {
  const mapWrapperRef = useRef<HTMLDivElement>(null);
  const [cursorPosition, setCursorPosition] = useState<{ x: number; y: number } | null>(null);
  const [isHoveringMap, setIsHoveringMap] = useState(false);

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

  // const openGoogleMaps = () => {
  //   const address = "Derenik Demirchyan 2-4, Yerevan, Armenia";
  //   const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
  //   window.open(googleMapsUrl, "_blank");
  // };

  return (
    <section className="yerevan-location" id="location">
      <div
        className="map-wrapper"
        ref={mapWrapperRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <MapSvg className="map-image" />

        {/* <div className="map-text-overlay container-padding">
          <h2 className="map-title">
            <span className="title-line scroll-reveal">PRIME LOCATION</span>
            <span className="title-line scroll-reveal delay-1">IN THE HEART OF</span>
            <span className="title-line scroll-reveal delay-1">YEREVAN</span>
          </h2>
          <button className="see-map-btn scroll-reveal delay-3" onClick={openGoogleMaps}>
            <span>SEE ON MAP</span>
          </button>
        </div> */}
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
