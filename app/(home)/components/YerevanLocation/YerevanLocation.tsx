"use client";

import "./YerevanLocation.css";

export default function YerevanLocation() {
  const openGoogleMaps = () => {
    const address = "Derenik Demirchyan 2-4, Yerevan, Armenia";
    const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
    window.open(googleMapsUrl, "_blank");
  };

  return (
    <section className="yerevan-location" id="location">
      <div className="map-wrapper">
        <img className="map-image" src="/assets/AVA_Map1.svg" alt="Yerevan map" />

        <div className="map-text-overlay">
          <h2 className="map-title">
            <span className="title-line scroll-reveal">PRIME LOCATION</span>
            <span className="title-line scroll-reveal delay-1">IN THE HEART OF</span>
            <span className="title-line scroll-reveal delay-1">YEREVAN</span>
          </h2>
          <button className="see-map-btn scroll-reveal delay-3" onClick={openGoogleMaps}>
            SEE ON MAP
          </button>
        </div>

        <div className="location-label-top scroll-reveal delay-1">YEREVAN, ARMENIA</div>
      </div>
    </section>
  );
}
