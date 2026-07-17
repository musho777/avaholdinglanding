"use client";

import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const slides = [
  {
    id: "vision",
    heading: "Vision Cast in Concrete",
    description:
      "AVA Holding transforms ambitious concepts into enduring architecture, balancing restraint, proportion, and engineering precision.",
    image: "/images/arch-01.svg",
  },
  {
    id: "craft",
    heading: "Crafted with Discipline",
    description:
      "From structure to finish, every decision is deliberate. We orchestrate construction like a luxury product, not a routine process.",
    image: "/images/arch-02.svg",
  },
  {
    id: "legacy",
    heading: "Built for Generational Value",
    description:
      "Our developments are designed to remain relevant in decades to come, with timeless forms and uncompromising performance.",
    image: "/images/arch-03.svg",
  },
  {
    id: "future",
    heading: "The Future, Engineered Today",
    description:
      "Innovation meets reliability through data-driven planning, advanced systems, and clear execution from foundation to handover.",
    image: "/images/arch-04.svg",
  },
];

type SlideData = (typeof slides)[number];

function StorySlide({
  slide,
  index,
  total,
  progress,
}: {
  slide: SlideData;
  index: number;
  total: number;
  progress: ReturnType<typeof useScroll>["scrollYProgress"];
}) {
  const reduceMotion = useReducedMotion();
  const start = index / total;
  const end = (index + 1) / total;
  const opacity = useTransform(progress, [start, (start + end) / 2, end], [0.45, 1, 0.45]);
  const scale = useTransform(
    progress,
    [start, (start + end) / 2, end],
    reduceMotion ? [1, 1, 1] : [0.97, 1, 0.97],
  );

  return (
    <motion.article
      style={{ opacity, scale }}
      className="relative flex h-screen w-screen items-center px-10 lg:px-20"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(197,166,106,0.18),transparent_35%),radial-gradient(circle_at_80%_70%,rgba(255,255,255,0.08),transparent_38%)]" />
      <div
        className={`relative mx-auto grid w-full max-w-6xl items-center gap-12 lg:gap-16 ${
          index % 2 === 0 ? "lg:grid-cols-[1.1fr_0.9fr]" : "lg:grid-cols-[0.9fr_1.1fr]"
        }`}
      >
        <div className={`max-w-2xl ${index % 2 === 0 ? "lg:order-1" : "lg:order-2 lg:justify-self-end"}`}>
          <p className="mb-6 font-serif text-sm tracking-[0.28em] text-[#C5A66A]">
            CHAPTER {String(index + 1).padStart(2, "0")}
          </p>
          <h2 className="text-balance font-serif text-5xl leading-[1.05] text-[#1f1d1a] lg:text-7xl">
            {slide.heading}
          </h2>
          <p className="mt-8 max-w-xl text-lg leading-relaxed text-[#4f493f]">{slide.description}</p>
        </div>

        <div
          className={`relative aspect-[4/5] w-full overflow-hidden rounded-sm bg-white/[0.04] shadow-[0_28px_90px_rgba(0,0,0,0.42)] ${
            index % 2 === 0 ? "lg:order-2" : "lg:order-1"
          }`}
        >
          <Image
            src={slide.image}
            alt={slide.heading}
            fill
            className="object-cover transition-transform duration-700 ease-in-out hover:scale-[1.04]"
            sizes="(max-width: 1280px) 40vw, 520px"
          />
        </div>
      </div>
    </motion.article>
  );
}

function DesktopHorizontalStory() {
  const ref = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  const x = useTransform(
    scrollYProgress,
    [0, 1],
    ["0vw", `-${(slides.length - 1) * 100}vw`],
  );

  return (
    <section ref={ref} className="relative hidden h-[350vh] bg-[#efe9df] md:block" aria-label="Storytelling">
      <div className="sticky top-0 h-screen overflow-hidden bg-[#efe9df]">
        <motion.div className="flex h-full" style={{ x, width: `${slides.length * 100}vw` }}>
          {slides.map((slide, index) => (
            <StorySlide
              key={slide.id}
              slide={slide}
              index={index}
              total={slides.length}
              progress={scrollYProgress}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function MobileStoryStack() {
  return (
    <section className="bg-[#efe9df] px-6 py-20 md:hidden" aria-label="Storytelling">
      <div className="mx-auto max-w-6xl space-y-12">
        {slides.map((slide, index) => (
          <article key={slide.id} className="space-y-6 rounded-sm bg-white/70 p-8 shadow-[0_20px_72px_rgba(0,0,0,0.14)]">
            <p className="font-serif text-xs tracking-[0.28em] text-[#C5A66A]">
              CHAPTER {String(index + 1).padStart(2, "0")}
            </p>
            <h2 className="font-serif text-4xl leading-tight text-[#1f1d1a]">{slide.heading}</h2>
            <p className="text-base leading-relaxed text-[#4f493f]">{slide.description}</p>
            <div className="relative aspect-[16/10] overflow-hidden rounded-sm">
              <Image
                src={slide.image}
                alt={slide.heading}
                fill
                className="object-cover transition-transform duration-700 ease-in-out hover:scale-[1.04]"
                sizes="100vw"
              />
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export function StorytellingHorizontalSection() {
  return (
    <>
      <DesktopHorizontalStory />
      <MobileStoryStack />
    </>
  );
}
