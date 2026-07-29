"use client";

import { useEffect } from "react";
import {
  Preloader,
  Hero,
  Header,
  SiteMenu,
  LogoLayer,
  FounderSection,
  QuoteSection,
  Slider,
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
} from "./hooks";

export default function Home() {
  useEffect(() => {
    if ((window as any).__avaInit) return;
    (window as any).__avaInit = true;
  }, []);
  usePreloaderInit();
  useSmoothScrollInit();
  useLogoAnimationInit();
  useFooterTabsInit();
  useLocationTabsInit();
  useMenuToggleInit();
  useScrollAnimation();

  return (
    <>
      <Preloader />
      <Hero />
      <Header />
      <SiteMenu />
      <LogoLayer />
      <WhatsAppButton />

      <main id="main-content">
        <FounderSection />
        <QuoteSection />
        {/* <YerevanLocation /> */}
        <Slider />
      </main>
      <Footer />
    </>
  );
}
