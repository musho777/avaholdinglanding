"use client";

import { useEffect } from "react";
import {
  Preloader,
  Hero,
  Header,
  SiteMenu,
  LogoLayer,
  QuoteSection,
  YerevanLocation,
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

  return (
    <>
      <Preloader />
      <Hero />
      <Header />
      <SiteMenu />
      <LogoLayer />
      <WhatsAppButton />

      <main id="main-content">
        <QuoteSection />
        {/* <YerevanLocation /> */}
        <Slider />
      </main>
      <Footer />
    </>
  );
}
