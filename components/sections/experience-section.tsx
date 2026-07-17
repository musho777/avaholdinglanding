"use client";

import { animate, motion, useInView, useMotionValue, useTransform } from "framer-motion";
import { useEffect, useRef } from "react";
import { stats } from "@/lib/content";
import { FadeIn } from "@/components/animations/reveal";

function Counter({ value }: { value: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const motionValue = useMotionValue(0);
  const rounded = useTransform(motionValue, (latest) =>
    Intl.NumberFormat("en-US").format(Math.floor(latest)),
  );

  useEffect(() => {
    if (!inView) return;
    const controls = animate(motionValue, value, {
      duration: 1.3,
      ease: "easeInOut",
    });
    return controls.stop;
  }, [inView, motionValue, value]);

  return <motion.span ref={ref}>{rounded}</motion.span>;
}

export function ExperienceSection() {
  return (
    <section className="mx-auto w-full max-w-6xl px-6 py-24 md:py-32">
      <FadeIn className="mb-14">
        <h2 className="font-serif text-3xl text-[#F4F1EA] sm:text-5xl">By the Numbers</h2>
      </FadeIn>
      <div className="flex flex-wrap gap-7">
        {stats.map((item, idx) => (
          <FadeIn
            key={item.label}
            delay={idx * 0.08}
            className={`rounded-sm bg-white/[0.04] p-9 shadow-[0_18px_60px_rgba(0,0,0,0.35)] transition-transform duration-500 hover:scale-[1.03] ${
              idx === 0 || idx === 3 ? "min-h-[190px] w-full lg:w-[calc(58%-14px)]" : "min-h-[190px] w-full lg:w-[calc(42%-14px)]"
            }`}
          >
            <p className="font-serif text-5xl text-[#C5A66A]">
              <Counter value={item.value} />
            </p>
            <p className="mt-4 text-sm tracking-wide text-[#CDC8BE]">{item.label}</p>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}
