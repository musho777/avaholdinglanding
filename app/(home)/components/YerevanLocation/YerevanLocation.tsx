"use client";

import "./YerevanLocation.css";

// Logo component
const LogoIcon = () => (
  <svg width="224" height="224" viewBox="0 0 224 224" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M89.1699 204.197V19.8037H94.6225V128.682H129.804V19.8037H135.256V204.213H129.804V133.187H94.6225V204.213H89.1699V204.197Z"
      fill="#DFD8CF"
    />
    <path
      d="M169.679 109.195C169.679 140.962 143.933 166.708 112.166 166.708C80.3982 166.708 54.6523 140.962 54.6523 109.195C54.6523 77.4275 80.3982 51.6816 112.166 51.6816C143.933 51.6816 169.679 77.4275 169.679 109.195ZM148.959 72.4016C127.575 51.002 93.7532 50.1486 73.4283 70.4734C53.1035 90.7983 53.9569 124.62 75.3565 146.02C96.7561 167.419 130.578 168.273 150.903 147.948C171.228 127.623 170.359 93.8012 148.975 72.4016H148.959Z"
      fill="#DFD8CF"
    />
  </svg>
);

// Location pin icon
const PinIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M11.5 4.50035C11.5001 3.82945 11.3073 3.17267 10.9447 2.60822C10.5821 2.04377 10.0648 1.59543 9.45463 1.3166C8.84442 1.03777 8.16692 0.940193 7.50283 1.03549C6.83873 1.13079 6.21602 1.41495 5.70885 1.85414C5.20167 2.29332 4.83141 2.86901 4.64215 3.51266C4.45289 4.15631 4.45261 4.8408 4.64135 5.4846C4.83008 6.12841 5.19987 6.7044 5.70669 7.144C6.2135 7.58359 6.83598 7.86826 7.5 7.9641V14.5004C7.5 14.633 7.55268 14.7601 7.64645 14.8539C7.74021 14.9477 7.86739 15.0004 8 15.0004C8.13261 15.0004 8.25979 14.9477 8.35355 14.8539C8.44732 14.7601 8.5 14.633 8.5 14.5004V7.9641C9.33245 7.84277 10.0935 7.42613 10.6443 6.79024C11.195 6.15434 11.4987 5.3416 11.5 4.50035ZM8 7.00035C7.50555 7.00035 7.0222 6.85373 6.61107 6.57903C6.19995 6.30432 5.87952 5.91388 5.6903 5.45706C5.50108 5.00025 5.45157 4.49758 5.54804 4.01263C5.6445 3.52768 5.8826 3.08222 6.23223 2.73259C6.58186 2.38296 7.02732 2.14485 7.51227 2.04839C7.99723 1.95193 8.49989 2.00144 8.95671 2.19065C9.41352 2.37987 9.80397 2.70031 10.0787 3.11143C10.3534 3.52255 10.5 4.0059 10.5 4.50035C10.5 4.82866 10.4353 5.15375 10.3097 5.45706C10.1841 5.76038 9.99991 6.03597 9.76777 6.26812C9.53562 6.50027 9.26002 6.68442 8.95671 6.81005C8.65339 6.93569 8.3283 7.00035 8 7.00035Z"
      fill="currentColor"
    />
  </svg>
);

// Location data - customize these positions for your map
const locations = [
  { id: 1, name: "Republic Square", top: "45%", left: "52%", showPin: true },
  { id: 2, name: "Cascade Complex", top: "38%", left: "48%", showPin: true },
  { id: 3, name: "Opera Theatre", top: "50%", left: "55%", showPin: true },
  { id: 4, name: "Northern Avenue", top: "42%", left: "60%", showPin: false },
  { id: 5, name: "Vernissage", top: "48%", left: "45%", showPin: false },
];

export default function YerevanLocation() {
  return (
    <section className="yerevan-location">
      <div className="map-wrapper">
        <img className="map-image" src="/assets/map.webp" alt="Yerevan map" />

        {/* Text overlay on the left */}
        <div className="map-text-overlay">
          <h2 className="map-title">
            <span className="title-line scroll-reveal">PRIME LOCATION</span>
            <span className="title-small scroll-reveal delay-1">IN THE HEART OF</span>
            <span className="title-line scroll-reveal delay-1">YEREVAN,</span>
            <span className="title-small scroll-reveal delay-2">CLOSE TO</span>
            <span className="title-line scroll-reveal delay-2">HISTORIC SITES</span>
          </h2>
          <button className="see-map-btn scroll-reveal delay-3">SEE ON MAP</button>
        </div>

        {/* Top right location label */}
        <div className="location-label-top scroll-reveal delay-1">YEREVAN, ARMENIA</div>

        {/* Logo overlay in center */}
        <div className="logo-overlay">
          <LogoIcon />
        </div>

        {/* Location pins and labels */}
        {locations.map((location) => (
          <div
            key={location.id}
            className="map-location"
            style={{ top: location.top, left: location.left }}
          >
            {location.showPin && (
              <button className="location-pin" aria-label={location.name}>
                <PinIcon />
              </button>
            )}
            <span className="location-name">{location.name}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
