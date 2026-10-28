"use client";

import { useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { cityMapPoints } from "./cityMapData";
// Card and cursor styles are shared with the location map
import "../YerevanLocation/YerevanLocation.css";
import "./CityMap.css";

// Translation keys, in card order; same order as the pins in cityMapData and locationImages
const locationKeys = [
  "l1", "l2", "l3", "l4", "l5", "l6", "l7", "l8", "l9", "l10", "l11",
] as const;
const locationImages = [
  "/assets/lovers-park-card.webp",
  "/assets/academy-card.webp",
  "/assets/metro.webp",
  "/assets/location-1.webp",
  "/assets/opera-card.webp",
  "/assets/parliament-park.webp",
  "/assets/british-school.webp",
  "/assets/usa.webp",
  "/assets/st-hovhannes-church.webp",
  "/assets/republic-square.webp",
  "/assets/saryan-street.webp",
];

// Dots appear one by one, quickly: 0.02s apart, and even the longest route
// finishes drawing within 0.6s
const DOT_DELAY = 0.02;
const MAX_ROUTE_DURATION = 0.6;

export default function CityMap() {
  const t = useTranslations("cityMap");
  const tLocation = useTranslations("location");
  const [cursorPosition, setCursorPosition] = useState<{ x: number; y: number } | null>(null);
  const [hoveredLocation, setHoveredLocation] = useState<number | null>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  // Hovering a pin brings its card to the middle of the card column
  // (vertical column on desktop, horizontal strip on tablets)
  const scrollCardIntoCenter = (id: number) => {
    const container = cardsRef.current;
    const card = container?.children[id - 1] as HTMLElement | undefined;
    if (!container || !card) return;
    const c = container.getBoundingClientRect();
    const r = card.getBoundingClientRect();
    container.scrollBy({
      top: r.top - c.top - (c.height - r.height) / 2,
      left: r.left - c.left - (c.width - r.width) / 2,
      behavior: "smooth",
    });
  };

  const locations = locationKeys.map((key, index) => ({
    id: index + 1,
    name: t(`locations.${key}.name`),
    driveTime: t(`locations.${key}.driveTime`),
    address: t(`locations.${key}.address`),
    image: locationImages[index],
  }));

  const openGoogleMaps = (address: string) => {
    if (!address) return;
    const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
    window.open(googleMapsUrl, "_blank");
  };

  return (
    <section className="city-map" id="city-map">
      {/* Header above the map, with the location map's title styles and button */}
      <header className="city-map-header container-padding">
        <h2 className="map-title">
          <span className="title-line scroll-reveal">{t("titleLine1")}</span>
          <span className="title-line scroll-reveal delay-1">{t("titleLine2")}</span>
        </h2>
        <button
          className="see-map-btn scroll-reveal delay-3"
          onClick={() => openGoogleMaps("Derenik Demirchyan 2-4, Yerevan, Armenia")}
        >
          <span>{tLocation("seeOnMap")}</span>
        </button>
      </header>

      <div className="city-map-viewport">
        <div
          className="city-map-wrapper"
          onMouseMove={(e) => setCursorPosition({ x: e.clientX, y: e.clientY })}
          onMouseLeave={() => setCursorPosition(null)}
        >
          {/* Static streets + residence fingerprint, kept out of the JS bundle */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className="city-map-base" src="/assets/map-2-base.svg" alt="" loading="lazy" />

          <svg
            className="city-map-overlay"
            viewBox="0 0 2606.6 1542.4"
            preserveAspectRatio="xMidYMid slice"
            aria-hidden="true"
          >
            {cityMapPoints.map((point, index) => {
              const id = index + 1;
              const step = Math.min(DOT_DELAY, MAX_ROUTE_DURATION / point.route.length);
              const [sx, sy, sh] = point.stem;
              return (
                <g
                  key={id}
                  className={`city-map-point ${hoveredLocation === id ? "active" : ""}`}
                  onMouseEnter={() => {
                    setHoveredLocation(id);
                    scrollCardIntoCenter(id);
                  }}
                  onMouseLeave={() => setHoveredLocation(null)}
                  onClick={() => openGoogleMaps(locations[index].address)}
                >
                  <g className="city-map-route">
                    {point.route.map(([x, y], i) => (
                      <circle
                        key={i}
                        cx={x}
                        cy={y}
                        r={3}
                        style={{ animationDelay: `${(i * step).toFixed(3)}s` }}
                      />
                    ))}
                  </g>
                  <circle className="city-map-pulse" cx={point.cx} cy={point.cy} r={30} />
                  <rect className="city-map-pin" x={sx} y={sy} width={2.1} height={sh} />
                  <ellipse className="city-map-pin" cx={point.cx} cy={point.cy} rx={11.8} ry={12.7} />
                  <circle className="city-map-hit" cx={point.cx} cy={point.cy + 8} r={32} />
                </g>
              );
            })}
          </svg>

          {/* Same cards as the location map (styles from YerevanLocation.css), scrolling vertically */}
          <div className="location-cards-row city-map-cards" data-native-scroll ref={cardsRef}>
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

      {/* Same WhatsApp-style cursor as the location map above */}
      {cursorPosition && (
        <div
          className="custom-cursor-container"
          style={{ left: `${cursorPosition.x}px`, top: `${cursorPosition.y}px` }}
        >
          <div className="cursor-ring cursor-ring-1" />
          <div className="cursor-ring cursor-ring-2" />
          <div className="cursor-ring cursor-ring-3" />
        </div>
      )}
    </section>
  );
}
