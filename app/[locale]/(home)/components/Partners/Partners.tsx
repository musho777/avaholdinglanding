"use client";

import { useEffect, useState } from "react";
import LogoSvg from "@/public/assets/Logo";
import "./Partners.css";

const partners = [
  {
    name: "Partner 1",
    icon: <LogoSvg style={{ width: "90px", height: "90px" }} />,
  },
  {
    name: "Partner 2",
    icon: <LogoSvg style={{ width: "90px", height: "90px" }} />,
  },
  {
    name: "Partner 3",
    icon: <LogoSvg style={{ width: "90px", height: "90px" }} />,
  },
  {
    name: "Partner 4",
    icon: <LogoSvg style={{ width: "90px", height: "90px" }} />,
  },
  {
    name: "Partner 5",
    icon: <LogoSvg style={{ width: "90px", height: "90px" }} />,
  },
  {
    name: "Partner 6",
    icon: <LogoSvg style={{ width: "90px", height: "90px" }} />,
  },
  {
    name: "Partner 7",
    icon: <LogoSvg style={{ width: "90px", height: "90px" }} />,
  },
  {
    name: "Partner 8",
    icon: <LogoSvg style={{ width: "90px", height: "90px" }} />,
  },
];

export default function Partners() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section className="partners-section" id="partners">
      <div className="partners-container">
        <div className="partners-marquee">
          <div className="partners-track">
            {mounted && (
              <>
                <div className="partners-set">
                  {partners.map((partner, idx) => (
                    <div key={`partner-1-${idx}`} className="partner-item">
                      <div className="partner-icon">{partner.icon}</div>
                    </div>
                  ))}
                </div>
                {/* Duplicate set for seamless loop */}
                <div className="partners-set">
                  {partners.map((partner, idx) => (
                    <div key={`partner-2-${idx}`} className="partner-item">
                      <div className="partner-icon">{partner.icon}</div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
