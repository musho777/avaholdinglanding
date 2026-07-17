"use client";

import Image from "next/image";
import { services } from "@/lib/content";
import { FadeIn } from "@/components/animations/reveal";

export function ServicesSection() {
  const serviceImages = [
    "/images/arch-01.svg",
    "/images/arch-02.svg",
    "/images/arch-03.svg",
    "/images/arch-04.svg",
  ];

  return (
    <section id="services" className="bg-[#f2eee7] py-24 text-[#1b1a18] md:py-32">
      <div className="mx-auto w-full max-w-6xl px-6">
        <FadeIn className="mb-16">
          <p className="mb-4 font-serif text-sm tracking-[0.28em] text-[#8f7647]">SERVICES</p>
          <h2 className="font-serif text-3xl sm:text-5xl">Integrated Expertise</h2>
        </FadeIn>
        <div className="space-y-16 lg:space-y-24">
          {services.map((service, idx) => (
            <FadeIn
              key={service.title}
              delay={idx * 0.08}
              className={`flex flex-col gap-8 lg:items-center ${idx % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"}`}
            >
              <div className="relative aspect-[5/3] w-full overflow-hidden rounded-sm bg-[#d9d1c5]/45 shadow-[0_20px_70px_rgba(0,0,0,0.16)] lg:w-[56%]">
                <Image
                  src={serviceImages[idx]}
                  alt={service.title}
                  fill
                  className="object-cover transition-transform duration-700 ease-in-out hover:scale-[1.04]"
                  sizes="(max-width: 1024px) 100vw, 56vw"
                />
              </div>
              <article className="lg:w-[44%] lg:px-8">
                <h3 className="font-serif text-4xl text-[#1b1a18] sm:text-5xl">{service.title}</h3>
                <p className="mt-6 max-w-xl text-lg leading-relaxed text-[#4a443b]">{service.description}</p>
              </article>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
