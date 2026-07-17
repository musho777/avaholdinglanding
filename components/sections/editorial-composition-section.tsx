"use client";

import Image from "next/image";
import { FadeIn } from "@/components/animations/reveal";

export function EditorialCompositionSection() {
  return (
    <section className="bg-[#e9e4dc] py-24 text-[#1f1d1a] md:py-32">
      <div className="mx-auto w-full max-w-6xl px-6">
        <FadeIn className="mb-14 max-w-3xl">
          <p className="mb-4 font-serif text-sm tracking-[0.28em] text-[#8f7647]">COMPOSITION</p>
          <h2 className="font-serif text-4xl leading-tight sm:text-6xl">
            Architecture as Editorial Narrative
          </h2>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-[#4b463f]">
            We curate each project through layered material studies, structural precision, and spatial rhythm.
            The result is a composition that feels intentional from every angle.
          </p>
        </FadeIn>

        <div className="space-y-8 lg:relative lg:min-h-[700px] lg:space-y-0">
          <FadeIn className="overflow-hidden rounded-sm bg-[#d9d1c5]/45 shadow-[0_24px_70px_rgba(0,0,0,0.15)] lg:absolute lg:left-0 lg:top-8 lg:w-[56%]">
            <div className="relative aspect-[4/5]">
              <Image
                src="/images/arch-05.svg"
                alt="Premium facade detail"
                fill
                className="object-cover transition-transform duration-700 ease-in-out hover:scale-[1.04]"
                sizes="(max-width: 1024px) 100vw, 56vw"
              />
            </div>
          </FadeIn>

          <FadeIn className="overflow-hidden rounded-sm bg-[#d9d1c5]/40 shadow-[0_24px_70px_rgba(0,0,0,0.12)] lg:absolute lg:right-0 lg:top-0 lg:w-[38%]">
            <div className="relative aspect-[4/3]">
              <Image
                src="/images/arch-06.svg"
                alt="Structural geometry"
                fill
                className="object-cover transition-transform duration-700 ease-in-out hover:scale-[1.04]"
                sizes="(max-width: 1024px) 100vw, 38vw"
              />
            </div>
          </FadeIn>

          <FadeIn className="rounded-sm bg-white/60 p-9 shadow-[0_18px_55px_rgba(0,0,0,0.1)] backdrop-blur-sm lg:absolute lg:bottom-0 lg:right-[9%] lg:w-[42%]">
            <h3 className="font-serif text-3xl">Material Intelligence</h3>
            <p className="mt-4 text-base leading-relaxed text-[#4b463f]">
              Each texture, finish, and proportion is chosen to preserve clarity and elevate long-term value.
            </p>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
