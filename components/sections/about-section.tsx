"use client";

import Image from "next/image";
import { FadeIn, StaggerItem, StaggerList } from "@/components/animations/reveal";

const lines = [
  "We design and build spaces that endure across generations.",
  "Every detail reflects discipline, engineering rigor, and architectural clarity.",
  "Our philosophy is simple: fewer compromises, higher standards, exceptional outcomes.",
];

export function AboutSection() {
  return (
    <section className="bg-[#f3efe8] py-24 md:py-32">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-14 px-6 lg:flex-row lg:items-center lg:gap-20">
        <StaggerList className="flex flex-1 flex-col justify-center gap-6">
        <StaggerItem>
          <p className="font-serif text-sm tracking-[0.28em] text-[#C5A66A]">PHILOSOPHY</p>
        </StaggerItem>
        <StaggerItem>
          <h2 className="font-serif text-3xl leading-tight text-[#1f1d1a] sm:text-5xl">
            Architecture with Purpose.
          </h2>
        </StaggerItem>
        {lines.map((line) => (
          <StaggerItem key={line}>
            <p className="max-w-xl text-lg leading-relaxed text-[#4f493f]">{line}</p>
          </StaggerItem>
        ))}
      </StaggerList>

        <FadeIn className="relative min-h-[420px] flex-1 overflow-hidden rounded-sm bg-white/[0.03] shadow-[0_24px_80px_rgba(0,0,0,0.35)]">
          <Image
            src="/images/arch-05.svg"
            alt="Luxury construction planning"
            fill
            className="object-cover transition-transform duration-700 ease-in-out hover:scale-[1.03]"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </FadeIn>
      </div>
    </section>
  );
}
