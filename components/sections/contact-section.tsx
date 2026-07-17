"use client";

import { motion } from "framer-motion";
import { FadeIn } from "@/components/animations/reveal";

export function ContactSection() {
  const socialLinks = [
    {
      href: "https://t.me",
      label: "Telegram",
      icon: (
        <path d="M21.944 2.507a1 1 0 0 0-1.043-.154L2.3 9.5a1 1 0 0 0 .083 1.875l4.8 1.6 1.6 4.8a1 1 0 0 0 1.873.088l7.197-18.6a1 1 0 0 0-.09-1.018ZM9.8 15.333l-1.03-3.091 6.563-6.564-5.533 7.03Z" />
      ),
    },
    {
      href: "https://instagram.com",
      label: "Instagram",
      icon: (
        <path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5Zm0 2a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3H7Zm10.5 1.75a1.25 1.25 0 1 1 0 2.5 1.25 1.25 0 0 1 0-2.5ZM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10Zm0 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6Z" />
      ),
    },
    {
      href: "https://facebook.com",
      label: "Facebook",
      icon: (
        <path d="M13.5 21.5v-8h2.8l.4-3.1h-3.2V8.4c0-.9.3-1.5 1.6-1.5h1.7V4.1c-.8-.1-1.6-.1-2.4-.1-2.4 0-4.1 1.5-4.1 4.3v2.1H8v3.1h2.3v8h3.2Z" />
      ),
    },
    {
      href: "https://linkedin.com",
      label: "LinkedIn",
      icon: (
        <path d="M6.2 8.6H3.1V20h3.1V8.6Zm.2-3.6A1.8 1.8 0 1 0 2.8 5a1.8 1.8 0 0 0 3.6 0ZM20.9 13.3c0-3.4-1.8-5-4.2-5a3.6 3.6 0 0 0-3.2 1.8v-1.5h-3V20h3.1v-6.1c0-1.6.3-3.1 2.3-3.1s2 1.8 2 3.2V20H21v-6.7Z" />
      ),
    },
  ];

  return (
    <section id="contact" className="mx-auto w-full max-w-6xl px-6 py-24 md:py-32">
      <FadeIn className="mb-12">
        <p className="font-serif text-sm tracking-[0.28em] text-[#C5A66A]">CONTACT</p>
        <h2 className="mt-3 font-serif text-4xl text-[#2b241d] sm:text-6xl">Start Your Project</h2>
      </FadeIn>

      <FadeIn className="grid gap-8 rounded-sm bg-[#b8a489]/18 p-7 shadow-[0_24px_90px_rgba(0,0,0,0.2)] backdrop-blur-xl lg:grid-cols-[1.05fr_0.95fr] lg:p-10">
        <aside className="rounded-sm bg-[#2f271f]/86 p-7 text-[#f4efe7] shadow-[0_18px_54px_rgba(0,0,0,0.28)] md:p-8">
          <h3 className="font-serif text-3xl">Contact Desk</h3>
          <p className="mt-4 text-[#ddd1c1]">
            Share your project idea and our team will respond with a tailored execution roadmap.
          </p>

          <div className="mt-8 space-y-2">
            <p className="text-sm tracking-[0.2em] text-[#c5a66a]">WORKING HOURS</p>
            <p>Mon - Fri: 09:00 - 19:00</p>
            <p>Sat: 10:00 - 16:00</p>
            <p>Sun: Closed</p>
          </div>

          <div className="mt-8">
            <p className="text-sm tracking-[0.2em] text-[#c5a66a]">LOCATION</p>
            <div className="mt-3 h-52 overflow-hidden rounded-sm bg-black/20">
              <iframe
                title="AVA Holding location map"
                src="https://www.google.com/maps?q=Dubai%20International%20Financial%20Centre&output=embed"
                loading="lazy"
                className="h-full w-full border-0"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>

          <div className="mt-8 flex items-center gap-3">
            {socialLinks.map((item) => (
              <a
                key={item.label}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={item.label}
                className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-[#f4efe7] transition-all duration-300 hover:scale-105 hover:bg-[#c5a66a] hover:text-[#241d16]"
              >
                <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current" aria-hidden>
                  {item.icon}
                </svg>
              </a>
            ))}
          </div>
        </aside>

        <form className="grid content-start gap-6 rounded-sm bg-white/45 p-7 backdrop-blur-sm md:grid-cols-2 md:p-8">
          <label className="flex flex-col gap-2 text-sm text-[#4b4136]">
            Name
            <input
              type="text"
              placeholder="Your name"
              className="h-12 rounded-sm bg-white/65 px-4 text-[#1f1d1a] outline-none ring-1 ring-[#b9a688]/50 transition-all duration-300 placeholder:text-[#7a6c5b]/80 focus:bg-white/85 focus:ring-[#9e8660]"
            />
          </label>
          <label className="flex flex-col gap-2 text-sm text-[#4b4136]">
            Email
            <input
              type="email"
              placeholder="you@email.com"
              className="h-12 rounded-sm bg-white/65 px-4 text-[#1f1d1a] outline-none ring-1 ring-[#b9a688]/50 transition-all duration-300 placeholder:text-[#7a6c5b]/80 focus:bg-white/85 focus:ring-[#9e8660]"
            />
          </label>
          <label className="md:col-span-2 flex flex-col gap-2 text-sm text-[#4b4136]">
            Project Details
            <textarea
              rows={6}
              placeholder="Tell us about your vision..."
              className="rounded-sm bg-white/65 p-4 text-[#1f1d1a] outline-none ring-1 ring-[#b9a688]/50 transition-all duration-300 placeholder:text-[#7a6c5b]/80 focus:bg-white/85 focus:ring-[#9e8660]"
            />
          </label>
          <div className="md:col-span-2">
            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex h-12 items-center justify-center rounded-sm bg-[#9f8560] px-10 font-medium text-[#f8f3ea] shadow-[0_14px_40px_rgba(90,70,45,0.35)] transition-all duration-500 hover:bg-[#876d4c]"
            >
              Submit Inquiry
            </motion.button>
          </div>
        </form>
      </FadeIn>
    </section>
  );
}
