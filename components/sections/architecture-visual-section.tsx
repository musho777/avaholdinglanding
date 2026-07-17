"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";

export function ArchitectureVisualSection() {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -120]);

  return (
    <section className="relative bg-[#f1ece4] py-24 md:py-32">
      <div className="relative h-[70vh] w-full overflow-hidden">
        <motion.div style={{ y }} className="absolute inset-0">
          <Image
            src="/images/arch-06.svg"
            alt="Architectural visual"
            fill
            className="object-cover"
            sizes="100vw"
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-b from-[#f3ece1]/20 via-[#efe8dc]/35 to-[#ece4d8]/50" />
        <div className="absolute inset-0 flex items-end px-6 pb-14 md:px-16">
          <div className="max-w-2xl">
            <p className="font-serif text-sm tracking-[0.28em] text-[#C5A66A]">ARCHITECTURE</p>
            <h2 className="mt-4 font-serif text-3xl text-[#1f1d1a] sm:text-5xl">
              Crafted structures, cinematic presence.
            </h2>
          </div>
        </div>
      </div>
    </section>
  );
}
