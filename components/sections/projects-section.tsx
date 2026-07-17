"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { projects } from "@/lib/content";
import { StaggerItem, StaggerList } from "@/components/animations/reveal";

function ProjectNarrativeCard({
  title,
  location,
  image,
  slug,
  alignRight,
}: {
  title: string;
  location: string;
  image: string;
  slug: string;
  alignRight: boolean;
}) {
  const ref = useRef<HTMLAnchorElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 85%", "end 20%"],
  });
  const imageScale = useTransform(scrollYProgress, [0, 1], [1.1, 1]);

  return (
    <Link
      ref={ref}
      href={`/projects/${slug}`}
      className={`group relative block h-[460px] overflow-hidden rounded-sm bg-white/60 shadow-[0_24px_70px_rgba(0,0,0,0.14)] ${
        alignRight ? "ml-auto w-full lg:w-[88%]" : "mr-auto w-full lg:w-[78%]"
      }`}
    >
      <motion.div style={{ scale: imageScale }} className="absolute inset-0">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover transition-transform duration-700 ease-in-out group-hover:scale-[1.03]"
          sizes="(max-width: 1024px) 100vw, 80vw"
        />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-t from-[#2d271f]/70 via-[#2d271f]/26 to-transparent" />
      <article
        className={`absolute bottom-0 w-full p-8 md:p-10 ${alignRight ? "md:max-w-[64%]" : "md:max-w-[58%]"}`}
      >
        <h3 className="font-serif text-3xl text-[#f8f4ec] sm:text-4xl">{title}</h3>
        <p className="mt-3 text-sm tracking-[0.2em] text-[#eadfca]">{location}</p>
        <p className="mt-5 max-w-xl text-[#f2ebde]">
          Signature development delivered with premium materials, precise execution, and long-term
          architectural value.
        </p>
      </article>
    </Link>
  );
}

export function ProjectsSection() {
  return (
    <section id="projects" className="bg-[#ece7de] py-24 md:py-32">
      <div className="mx-auto w-full max-w-6xl px-6">
        <StaggerList className="mb-12 space-y-4">
          <StaggerItem>
            <p className="font-serif text-sm tracking-[0.28em] text-[#8f7647]">PROJECTS</p>
          </StaggerItem>
          <StaggerItem>
            <h2 className="font-serif text-3xl text-[#1f1d1a] sm:text-5xl">Selected Landmarks</h2>
          </StaggerItem>
        </StaggerList>

        <StaggerList className="space-y-10 lg:space-y-16">
          {projects.map((project, idx) => (
            <StaggerItem key={project.slug}>
              <ProjectNarrativeCard
                title={project.title}
                location={project.location}
                image={project.image}
                slug={project.slug}
                alignRight={idx % 2 !== 0}
              />
            </StaggerItem>
          ))}
        </StaggerList>
      </div>
    </section>
  );
}
