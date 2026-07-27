"use client";

import { useState } from "react";
import { Modal, ModalBody } from "@/components/ui/Modal/Modal";
import { YerevanMap } from "@/components/maps";

export default function YerevanLocation() {
  const [isMapModalOpen, setIsMapModalOpen] = useState(false);

  return (
    <>
      <section className="location-section">
        <div className="location-content">
          <div className="location-header">
            <h2 className="location-title">
              <span className="location-title-main">PRIME LOCATION</span>{" "}
              <span className="location-title-between">BETWEEN</span>
              <br />
              <span className="location-title-places">
                KENTRON, ARABKIR,
              </span>
              <br />
              <span className="location-title-and">AND</span>{" "}
              <span className="location-title-places">CASCADE</span>{" "}
              <span className="location-title-on">ON THE</span>
              <br />
              <span className="location-title-picturesque">HISTORIC</span>{" "}
              <span className="location-title-coastline">STREETS OF</span>
              <br />
              <span className="location-title-country">YEREVAN</span>
            </h2>
            <button
              className="location-map-btn"
              onClick={() => setIsMapModalOpen(true)}
            >
              SEE ON MAP
            </button>
          </div>

          <div className="location-coords">YEREVAN, ARMENIA</div>

          {/* Background Map */}
          <div className="location-map-bg">
            <svg
              viewBox="0 0 1400 700"
              xmlns="http://www.w3.org/2000/svg"
              className="location-map-svg"
            >
              <defs>
                <style>{`
                  .loc-pin { fill: none; stroke: currentColor; stroke-width: 1.2; }
                  .loc-label { font-family: var(--font-sans, sans-serif); fill: currentColor; font-size: 10px; letter-spacing: 0.12em; text-transform: uppercase; opacity: 0.5; }
                  .loc-circle { fill: currentColor; }
                  .loc-marker { fill: none; stroke: currentColor; stroke-width: 2; }
                `}</style>
              </defs>

              {/* Location pins scattered across the map */}
              {/* Zvartnots Airport */}
              <g transform="translate(280, 180)">
                <circle className="loc-pin" cx="0" cy="-8" r="5" />
                <line className="loc-pin" x1="0" y1="-3" x2="0" y2="5" />
                <circle className="loc-circle" cx="0" cy="-8" r="1.5" />
              </g>
              <text className="loc-label" x="300" y="185" fontSize="9">
                ZVARTNOTS
              </text>
              <text className="loc-label" x="300" y="197" fontSize="8" opacity="0.35">
                AIRPORT
              </text>

              {/* Kentron (Center) */}
              <g transform="translate(700, 350)">
                <circle className="loc-marker" cx="0" cy="0" r="28" strokeWidth="1.5" />
                <text
                  className="loc-label"
                  x="0"
                  y="8"
                  textAnchor="middle"
                  fontSize="32"
                  fontWeight="200"
                  opacity="0.8"
                  letterSpacing="0.05em"
                >
                  Y
                </text>
              </g>
              <text className="loc-label" x="700" y="398" textAnchor="middle" fontWeight="500" opacity="0.6">
                KENTRON
              </text>

              {/* Arabkir */}
              <g transform="translate(480, 280)">
                <circle className="loc-pin" cx="0" cy="-8" r="5" />
                <line className="loc-pin" x1="0" y1="-3" x2="0" y2="5" />
                <circle className="loc-circle" cx="0" cy="-8" r="1.5" />
              </g>
              <text className="loc-label" x="480" y="305" textAnchor="middle" fontSize="9">
                ARABKIR
              </text>

              {/* Cascade */}
              <g transform="translate(620, 260)">
                <circle className="loc-pin" cx="0" cy="-8" r="5" />
                <line className="loc-pin" x1="0" y1="-3" x2="0" y2="5" />
                <circle className="loc-circle" cx="0" cy="-8" r="1.5" />
              </g>
              <text className="loc-label" x="620" y="285" textAnchor="middle" fontSize="9">
                CASCADE
              </text>

              {/* Republic Square */}
              <g transform="translate(750, 380)">
                <circle className="loc-pin" cx="0" cy="-8" r="5" />
                <line className="loc-pin" x1="0" y1="-3" x2="0" y2="5" />
                <circle className="loc-circle" cx="0" cy="-8" r="1.5" />
              </g>
              <text className="loc-label" x="750" y="405" textAnchor="middle" fontSize="8">
                REPUBLIC SQ.
              </text>

              {/* Northern Avenue */}
              <g transform="translate(720, 310)">
                <circle className="loc-pin" cx="0" cy="-8" r="5" />
                <line className="loc-pin" x1="0" y1="-3" x2="0" y2="5" />
                <circle className="loc-circle" cx="0" cy="-8" r="1.5" />
              </g>
              <text className="loc-label" x="720" y="335" textAnchor="middle" fontSize="8">
                NORTHERN AVE
              </text>

              {/* Erebuni */}
              <g transform="translate(920, 450)">
                <circle className="loc-pin" cx="0" cy="-8" r="5" />
                <line className="loc-pin" x1="0" y1="-3" x2="0" y2="5" />
                <circle className="loc-circle" cx="0" cy="-8" r="1.5" />
              </g>
              <text className="loc-label" x="920" y="475" textAnchor="middle" fontSize="9">
                EREBUNI
              </text>

              {/* Tsitsernakaberd */}
              <g transform="translate(520, 400)">
                <circle className="loc-pin" cx="0" cy="-8" r="5" />
                <line className="loc-pin" x1="0" y1="-3" x2="0" y2="5" />
                <circle className="loc-circle" cx="0" cy="-8" r="1.5" />
              </g>
              <text className="loc-label" x="450" y="425" fontSize="8">
                TSITSERNAKABERD
              </text>

              {/* Vernissage */}
              <g transform="translate(800, 340)">
                <circle className="loc-pin" cx="0" cy="-8" r="5" />
                <line className="loc-pin" x1="0" y1="-3" x2="0" y2="5" />
                <circle className="loc-circle" cx="0" cy="-8" r="1.5" />
              </g>
              <text className="loc-label" x="800" y="365" textAnchor="middle" fontSize="8">
                VERNISSAGE
              </text>

              {/* Nor Nork */}
              <g transform="translate(950, 320)">
                <circle className="loc-pin" cx="0" cy="-8" r="5" />
                <line className="loc-pin" x1="0" y1="-3" x2="0" y2="5" />
                <circle className="loc-circle" cx="0" cy="-8" r="1.5" />
              </g>
              <text className="loc-label" x="950" y="345" textAnchor="middle" fontSize="9">
                NOR NORK
              </text>

              {/* Shengavit */}
              <g transform="translate(580, 480)">
                <circle className="loc-pin" cx="0" cy="-8" r="5" />
                <line className="loc-pin" x1="0" y1="-3" x2="0" y2="5" />
                <circle className="loc-circle" cx="0" cy="-8" r="1.5" />
              </g>
              <text className="loc-label" x="580" y="505" textAnchor="middle" fontSize="9">
                SHENGAVIT
              </text>

              {/* Additional decorative pins */}
              <g transform="translate(350, 320)">
                <circle className="loc-pin" cx="0" cy="-8" r="5" />
                <line className="loc-pin" x1="0" y1="-3" x2="0" y2="5" />
                <circle className="loc-circle" cx="0" cy="-8" r="1.5" />
              </g>

              <g transform="translate(1050, 380)">
                <circle className="loc-pin" cx="0" cy="-8" r="5" />
                <line className="loc-pin" x1="0" y1="-3" x2="0" y2="5" />
                <circle className="loc-circle" cx="0" cy="-8" r="1.5" />
              </g>

              <g transform="translate(850, 280)">
                <circle className="loc-pin" cx="0" cy="-8" r="5" />
                <line className="loc-pin" x1="0" y1="-3" x2="0" y2="5" />
                <circle className="loc-circle" cx="0" cy="-8" r="1.5" />
              </g>

              <g transform="translate(420, 420)">
                <circle className="loc-pin" cx="0" cy="-8" r="5" />
                <line className="loc-pin" x1="0" y1="-3" x2="0" y2="5" />
                <circle className="loc-circle" cx="0" cy="-8" r="1.5" />
              </g>
            </svg>
          </div>

          {/* Drive Times */}
          <div className="location-stats">
            <div className="location-stat-item">
              <div className="location-stat-number">12</div>
              <div className="location-stat-label">
                <span className="location-stat-label-time">MIN DRIVE BY CAR</span>
                <div className="location-stat-label-split">
                  <span>VILLAS</span>
                  <span>RESIDENCES</span>
                </div>
              </div>
            </div>

            <div className="location-stat-item">
              <div className="location-stat-number">8</div>
              <div className="location-stat-label">
                <span className="location-stat-label-time">MIN DRIVE BY CAR</span>
              </div>
            </div>

            <div className="location-stat-item">
              <div className="location-stat-number">15</div>
              <div className="location-stat-label">
                <span className="location-stat-label-time">MIN DRIVE BY CAR</span>
              </div>
            </div>

            <div className="location-stat-item">
              <div className="location-stat-number">20</div>
              <div className="location-stat-label">
                <span className="location-stat-label-time">MIN DRIVE BY CAR</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Modal
        isOpen={isMapModalOpen}
        onClose={() => setIsMapModalOpen(false)}
        title="Yerevan, Armenia"
        size="xl"
      >
        <ModalBody>
          <div className="map-container">
            <YerevanMap />
          </div>
        </ModalBody>
      </Modal>
    </>
  );
}
