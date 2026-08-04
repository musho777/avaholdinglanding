"use client";

import { useEffect } from "react";
import {
  Preloader,
  Hero,
  Header,
  SiteMenu,
  CenturySection,
  TimeSvgSection,
  FounderTextSection,
  QuoteSection,
  YerevanLocation,
  Slider,
  Partners,
  Footer,
  WhatsAppButton,
} from "./components";

import {
  usePreloaderInit,
  useSmoothScrollInit,
  useLogoAnimationInit,
  useFooterTabsInit,
  useLocationTabsInit,
  useMenuToggleInit,
  useScrollAnimation,
  useAnchorScrollInit,
} from "./hooks";

export default function Home() {
  useEffect(() => {
    if ((window as any).__avaInit) return;
    (window as any).__avaInit = true;

    // Disable browser scroll restoration
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }

    // Force scroll to top on mobile devices to prevent scroll restoration issues
    if (window.matchMedia && window.matchMedia("(pointer: coarse)").matches) {
      window.scrollTo(0, 0);
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    }
  }, []);
  usePreloaderInit();
  useSmoothScrollInit();
  useLogoAnimationInit();
  useFooterTabsInit();
  useLocationTabsInit();
  useMenuToggleInit();
  useScrollAnimation();
  useAnchorScrollInit();

  return (
    <>
      <Preloader />
      <Hero />
      <Header />
      <SiteMenu />
      <WhatsAppButton />

      <main id="main-content">
        <QuoteSection />
        <YerevanLocation />
        <Slider />
        <CenturySection />
        <TimeSvgSection />
        <FounderTextSection />
      </main>
      <Partners />
      <Footer />
    </>
  );
}
