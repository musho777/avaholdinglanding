"use client";

import React from "react";

export interface YerevanMapProps {
  className?: string;
}

export const YerevanMap: React.FC<YerevanMapProps> = ({ className = "" }) => {
  return (
    <svg
      viewBox="0 0 800 600"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{ maxWidth: "100%", height: "auto" }}
    >
      <defs>
        <style>{`
          .map-district { fill: #cec4b6; stroke: #5f5346; stroke-width: 1.5; transition: all 0.3s ease; }
          .map-district:hover { fill: #c9a267; }
          .map-road { stroke: #5f5346; stroke-width: 1; fill: none; opacity: 0.4; }
          .map-river { stroke: #8b9daa; stroke-width: 3; fill: none; opacity: 0.6; }
          .map-landmark { fill: #c9a267; stroke: #5f5346; stroke-width: 1.5; }
          .map-text { font-family: var(--font-sans, sans-serif); fill: #3a322b; font-size: 12px; }
          .map-text-large { font-size: 18px; font-weight: 600; letter-spacing: 0.05em; }
          .map-text-small { font-size: 10px; opacity: 0.8; }
        `}</style>
      </defs>

      {/* Districts */}
      <g id="districts">
        {/* Center (Kentron) */}
        <path
          className="map-district"
          d="M 350 250 L 450 250 L 480 300 L 460 350 L 380 360 L 330 320 Z"
        />

        {/* Arabkir */}
        <path
          className="map-district"
          d="M 200 150 L 350 180 L 350 250 L 330 320 L 250 300 L 180 220 Z"
        />

        {/* Shengavit */}
        <path
          className="map-district"
          d="M 330 320 L 380 360 L 400 420 L 320 450 L 250 420 L 250 350 Z"
        />

        {/* Nor Nork */}
        <path className="map-district" d="M 450 250 L 580 220 L 620 280 L 600 340 L 480 300 Z" />

        {/* Avan */}
        <path className="map-district" d="M 350 180 L 480 150 L 580 220 L 450 250 Z" />

        {/* Erebuni */}
        <path
          className="map-district"
          d="M 460 350 L 600 340 L 630 420 L 550 480 L 400 420 L 380 360 Z"
        />
      </g>

      {/* Hrazdan River */}
      <path
        className="map-river"
        d="M 100 120 Q 180 200 250 280 Q 320 360 400 440 L 450 500"
        strokeLinecap="round"
      />

      {/* Major Roads */}
      <g id="roads">
        <line className="map-road" x1="200" y1="100" x2="500" y2="500" />
        <line className="map-road" x1="100" y1="300" x2="700" y2="300" />
        <line className="map-road" x1="400" y1="100" x2="400" y2="500" />
      </g>

      {/* Landmarks */}
      <g id="landmarks">
        {/* Republic Square */}
        <circle className="map-landmark" cx="400" cy="300" r="8" />

        {/* Cascade */}
        <rect className="map-landmark" x="360" y="260" width="12" height="25" rx="2" />

        {/* Opera House */}
        <circle className="map-landmark" cx="380" cy="310" r="6" />

        {/* Mother Armenia */}
        <polygon className="map-landmark" points="280,270 290,280 270,280" />

        {/* Tsitsernakaberd Memorial */}
        <path className="map-landmark" d="M 250 360 L 260 355 L 260 365 Z" />
      </g>

      {/* Labels */}
      <g id="labels">
        <text className="map-text map-text-large" x="400" y="40" textAnchor="middle">
          YEREVAN
        </text>

        <text className="map-text" x="400" y="58" textAnchor="middle" opacity="0.6">
          Armenia
        </text>

        <text className="map-text map-text-small" x="290" y="240" textAnchor="middle">
          ARABKIR
        </text>

        <text className="map-text map-text-small" x="410" y="290" textAnchor="middle">
          KENTRON
        </text>

        <text className="map-text map-text-small" x="540" y="280" textAnchor="middle">
          NOR NORK
        </text>

        <text className="map-text map-text-small" x="290" y="390" textAnchor="middle">
          SHENGAVIT
        </text>

        <text className="map-text map-text-small" x="500" y="400" textAnchor="middle">
          EREBUNI
        </text>

        <text className="map-text map-text-small" x="415" y="220" textAnchor="middle">
          AVAN
        </text>

        {/* Landmark Labels */}
        <text className="map-text map-text-small" x="415" y="303" textAnchor="start">
          Republic Sq.
        </text>

        <text className="map-text map-text-small" x="377" y="270" textAnchor="end">
          Cascade
        </text>

        <text className="map-text map-text-small" x="135" y="125" textAnchor="start" opacity="0.7">
          Hrazdan River
        </text>
      </g>

      {/* Compass Rose */}
      <g id="compass" transform="translate(700, 80)">
        <circle fill="none" stroke="#5f5346" strokeWidth="1" r="25" opacity="0.3" />
        <path
          d="M 0,-20 L 3,-5 L 0,-8 L -3,-5 Z"
          fill="#c9a267"
          stroke="#5f5346"
          strokeWidth="0.5"
        />
        <text className="map-text map-text-small" y="-28" textAnchor="middle" fontWeight="600">
          N
        </text>
      </g>

      {/* Scale */}
      <g id="scale" transform="translate(50, 550)">
        <line x1="0" y1="0" x2="100" y2="0" stroke="#5f5346" strokeWidth="2" />
        <line x1="0" y1="-5" x2="0" y2="5" stroke="#5f5346" strokeWidth="2" />
        <line x1="100" y1="-5" x2="100" y2="5" stroke="#5f5346" strokeWidth="2" />
        <text className="map-text map-text-small" x="50" y="15" textAnchor="middle">
          5 km
        </text>
      </g>
    </svg>
  );
};

export default YerevanMap;
