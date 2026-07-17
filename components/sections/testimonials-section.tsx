"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { testimonials } from "@/lib/content";

export function TestimonialsSection() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % testimonials.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  const item = testimonials[index];

  return (
    <section className="bg-[#f2eee7] py-24 text-[#1f1d1a] md:py-32">
      <div className="mx-auto w-full max-w-6xl px-6">
        <p className="mb-6 font-serif text-sm tracking-[0.28em] text-[#8f7647]">TRUST</p>
        <div className="min-h-[220px] rounded-sm bg-white/75 p-12 shadow-[0_24px_90px_rgba(0,0,0,0.12)]">
        <AnimatePresence mode="wait">
          <motion.blockquote
            key={item.author}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.9, ease: "easeInOut" }}
            className="space-y-5"
          >
            <p className="font-serif text-2xl leading-relaxed text-[#1f1d1a]">
              &ldquo;{item.quote}&rdquo;
            </p>
            <footer>
              <p className="text-[#1f1d1a]">{item.author}</p>
              <p className="text-sm text-[#5a5248]">{item.role}</p>
            </footer>
          </motion.blockquote>
        </AnimatePresence>
      </div>
      </div>
    </section>
  );
}
