"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";

export function HeroSection() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 600], [0, 120]);

  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden px-6">
      <motion.video
        style={{ y }}
        className="absolute inset-0 h-[115%] w-full object-cover"
        src="https://cdn.coverr.co/videos/coverr-construction-site-1579/1080p.mp4"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        poster="/images/arch-06.svg"
      />
      <div className="absolute inset-0">
        <Image src="/images/arch-06.svg" alt="" fill className="object-cover opacity-25" priority />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-[#f8f8f6]/62 via-[#ece9e2]/58 to-[#e0d8cb]/72" />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.1, ease: "easeInOut" }}
        className="relative z-10 mx-auto max-w-4xl text-center"
      >
        <p className="mb-5 font-serif text-xl tracking-[0.35em] text-[#9a7d4f]">AVA Holding</p>
        <h1 className="font-serif text-4xl leading-tight text-[#1f1d1a] sm:text-6xl md:text-7xl">
          Building the Future
          <span className="block">with Precision</span>
        </h1>
      </motion.div>

      <motion.div
        animate={{ y: [0, 8, 0], opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 2.4, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
        className="absolute bottom-12 left-1/2 z-10 -translate-x-1/2"
        aria-hidden
      >
        <div className="h-12 w-[1px] bg-gradient-to-b from-[#C5A66A] to-transparent" />
      </motion.div>
    </section>
  );
}
