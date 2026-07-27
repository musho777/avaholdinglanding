"use client";

import { useEffect } from "react";
import {
  Preloader,
  Hero,
  Header,
  SiteMenu,
  LogoLayer,
  QuoteSection,
  Slider,
  Footer,
} from "./components";

import {
  usePreloaderInit,
  useSmoothScrollInit,
  useLogoAnimationInit,
  useAudioPlayerInit,
  useSliderInit,
  useFooterTabsInit,
  useLocationTabsInit,
  useMenuToggleInit,
} from "./hooks";

export default function Home() {
  useEffect(() => {
    if ((window as any).__avaInit) return;
    (window as any).__avaInit = true;
  }, []);
  usePreloaderInit();
  useSmoothScrollInit();
  useLogoAnimationInit();
  useAudioPlayerInit();
  useSliderInit();
  useFooterTabsInit();
  useLocationTabsInit();
  useMenuToggleInit();

  return (
    <>
      <Preloader />
      <Hero />
      <Header />
      <SiteMenu />
      <LogoLayer />

      <main id="main-content">
        <QuoteSection />
        <Slider />
      </main>
      <Footer />
    </>
  );
}
