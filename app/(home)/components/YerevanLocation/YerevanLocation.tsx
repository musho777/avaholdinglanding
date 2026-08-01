"use client";

import { useEffect, useRef } from "react";
import "./YerevanLocation.css";
import MapSvg from "../MapSvg/MapSvg";

export default function YerevanLocation() {
  const mapWrapperRef = useRef<HTMLDivElement>(null);

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

  const openGoogleMaps = () => {
    const address = "Derenik Demirchyan 2-4, Yerevan, Armenia";
    const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
    window.open(googleMapsUrl, "_blank");
  };

  return (
    <section className="yerevan-location" id="location">
      <div className="map-wrapper" ref={mapWrapperRef}>
        <MapSvg className="map-image" />

        <div className="map-text-overlay">
          <h2 className="map-title">
            <span className="title-line scroll-reveal">PRIME LOCATION</span>
            <span className="title-line scroll-reveal delay-1">IN THE HEART OF</span>
            <span className="title-line scroll-reveal delay-1">YEREVAN</span>
          </h2>
          <button className="see-map-btn scroll-reveal delay-3" onClick={openGoogleMaps}>
            <span>SEE ON MAP</span>
          </button>
        </div>
      </div>
    </section>
  );
}
