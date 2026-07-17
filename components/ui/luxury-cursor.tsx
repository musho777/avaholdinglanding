"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect } from "react";

export function LuxuryCursor() {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const smoothX = useSpring(x, { damping: 28, stiffness: 280 });
  const smoothY = useSpring(y, { damping: 28, stiffness: 280 });

  useEffect(() => {
    const isTouchDevice = window.matchMedia("(pointer: coarse)").matches;
    if (isTouchDevice) return;

    const update = (event: MouseEvent) => {
      x.set(event.clientX - 18);
      y.set(event.clientY - 18);
    };

    window.addEventListener("mousemove", update);
    return () => window.removeEventListener("mousemove", update);
  }, [x, y]);

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-50 hidden h-9 w-9 rounded-full border border-[#C5A66A]/60 mix-blend-difference md:block"
      style={{ x: smoothX, y: smoothY }}
    />
  );
}
