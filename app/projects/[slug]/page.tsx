import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { projects } from "@/lib/content";

type ProjectPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((entry) => entry.slug === slug);

  if (!project) return {};

  return {
    title: `${project.title} | AVA Holding`,
    description: `${project.title} in ${project.location}, developed and delivered by AVA Holding.`,
    alternates: {
      canonical: `/projects/${project.slug}`,
    },
    openGraph: {
      title: `${project.title} | AVA Holding`,
      description: `${project.title} in ${project.location}, developed and delivered by AVA Holding.`,
      url: `https://avaholding.ae/projects/${project.slug}`,
      type: "article",
      images: [project.image],
    },
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = projects.find((entry) => entry.slug === slug);

  if (!project) notFound();

  return (
    <main className="mx-auto min-h-screen w-full max-w-5xl px-6 py-24">
      <p className="mb-4 font-serif text-sm tracking-[0.28em] text-[#C5A66A]">{project.location}</p>
      <h1 className="mb-10 font-serif text-4xl text-[#2b241d] sm:text-6xl">{project.title}</h1>
      <div className="relative h-[520px] overflow-hidden rounded-sm bg-white/70 shadow-[0_22px_70px_rgba(0,0,0,0.14)]">
        <Image src={project.image} alt={project.title} fill className="object-cover" sizes="100vw" />
      </div>
      <p className="mt-8 max-w-2xl text-[#5a4e40]">
        This project reflects AVA Holding&apos;s commitment to premium materials, precise engineering, and
        timeless architectural language.
      </p>
    </main>
  );
}
