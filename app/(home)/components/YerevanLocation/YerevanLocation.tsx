"use client";

import "./YerevanLocation.css";

export default function YerevanLocation() {
  return (
    <section className="yerevan-location">
      <div className="map-wrapper">
        <img className="map-image" src="/assets/AVA_Map.svg" alt="Yerevan map" />

        <div className="map-text-overlay">
          <h2 className="map-title">
            <span className="title-line scroll-reveal">PRIME LOCATION</span>
            <span className="title-line scroll-reveal delay-1">IN THE HEART OF</span>
            <span className="title-line scroll-reveal delay-1">YEREVAN</span>
          </h2>
          <button className="see-map-btn scroll-reveal delay-3">SEE ON MAP</button>
        </div>

        <div className="location-label-top scroll-reveal delay-1">YEREVAN, ARMENIA</div>
      </div>
    </section>
  );
}
