"use client";

import { useEffect } from "react";
import Preloader from "@/components/Preloader";
import Hero from "@/components/Hero";
import Header from "@/components/Header";
import SiteMenu from "@/components/Menu";
import LogoLayer from "@/components/Logo";
import QuoteSection from "@/components/Quote";
import Slider from "@/components/Slider";
import Footer from "@/components/Footer";

export default function Home() {
  useEffect(() => {
    if ((window as any).__avaInit) return;
    (window as any).__avaInit = true;

    (function () {
      const preloader = document.getElementById("preloader");
      if (!preloader) return;
      let hidden = false;
      function hidePreloader() {
        if (hidden || !preloader) return;
        hidden = true;
        preloader.classList.add("hidden");
        if ((window as any).dockLogo) (window as any).dockLogo();
      }
      window.addEventListener("load", function () {
        setTimeout(hidePreloader, 500);
      });
      setTimeout(hidePreloader, 3500);
    })();

    (function () {
      if (window.matchMedia && window.matchMedia("(pointer: coarse)").matches) return;
      if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches)
        return;

      document.documentElement.style.scrollBehavior = "auto";

      let current = window.scrollY || window.pageYOffset;
      let target = current;
      const ease = 0.09;
      let ticking = false;

      function maxScroll() {
        return document.documentElement.scrollHeight - window.innerHeight;
      }

      function onWheel(e: WheelEvent) {
        e.preventDefault();
        target += e.deltaY;
        target = Math.max(0, Math.min(target, maxScroll()));
        if (!ticking) {
          ticking = true;
          requestAnimationFrame(tick);
        }
      }

      function tick() {
        current += (target - current) * ease;
        if (Math.abs(target - current) < 0.5) {
          current = target;
          window.scrollTo(0, current);
          ticking = false;
          return;
        }
        window.scrollTo(0, current);
        requestAnimationFrame(tick);
      }

      window.addEventListener(
        "scroll",
        function () {
          if (!ticking) {
            current = window.scrollY || window.pageYOffset;
            target = current;
          }
        },
        { passive: true }
      );

      window.addEventListener("wheel", onWheel, { passive: false });
    })();

    // Logo animation logic
    (function () {
      const logo = document.getElementById("logo");
      const logoSvg = document.getElementById("logoSvg");
      const logoSub = document.getElementById("logoSub");
      const logoLayer = document.getElementById("logoLayer");

      if (!logo || !logoSvg || !logoSub || !logoLayer) return;

      const headerH = 84;
      const endWidth = 108;

      function setLogo(
        topPx: number,
        widthPx: number,
        subOpacity: number,
        subMarginTop: number,
        subFontSize: number
      ) {
        if (!logo || !logoSvg || !logoSub) return;
        const offsetY = topPx - window.innerHeight / 2;
        logo.style.transform = "translateY(calc(-50% + " + offsetY + "px))";
        logoSvg.style.width = widthPx + "px";
        logoSvg.style.height = widthPx * (116.63 / 382.9) + "px";
        logoSub.style.opacity = String(subOpacity);
        logoSub.style.marginTop = subMarginTop + "px";
        logoSub.style.fontSize = subFontSize + "px";
      }

      function renderHero() {
        const startWidth = Math.min(window.innerWidth * 0.62, 620);
        setLogo(window.innerHeight * 0.5, startWidth, 1, 14, 11.5);
      }

      (window as any).dockLogo = function () {
        if (!logoLayer) return;
        setLogo(headerH / 2, endWidth, 0, 0, 9.6);
        logoLayer.classList.add("docked");
      };

      renderHero();
      window.addEventListener("resize", function () {
        if (logoLayer && !logoLayer.classList.contains("docked")) renderHero();
      });
    })();

    // Audio player logic
    (function () {
      const DURATION = 31;
      const BAR_COUNT = 90;

      const quoteText = document.getElementById("quoteText");
      const playWrap = document.getElementById("playWrap");
      const playBtn = document.getElementById("playBtn");
      const playBtnText = document.getElementById("playBtnText");
      const waveform = document.getElementById("waveform");
      const wfElapsed = document.getElementById("wfElapsed");
      const wfTotal = document.getElementById("wfTotal");

      if (
        !quoteText ||
        !playWrap ||
        !playBtn ||
        !playBtnText ||
        !waveform ||
        !wfElapsed ||
        !wfTotal
      )
        return;

      wfTotal.textContent = formatTime(DURATION);

      const rawWords = quoteText.textContent!.trim().split(/\s+/);
      quoteText.innerHTML = rawWords
        .map(function (w) {
          const letters = w
            .split("")
            .map(function (ch) {
              return '<span class="letter">' + ch + "</span>";
            })
            .join("");
          return '<span class="word" style="display:inline-block;">' + letters + "</span>";
        })
        .join(" ");
      const letterEls = Array.from(quoteText.querySelectorAll(".letter")) as HTMLElement[];

      const bars: HTMLElement[] = [];
      for (let i = 0; i < BAR_COUNT; i++) {
        const bar = document.createElement("div");
        bar.className = "bar";
        const h = 30 + Math.round(Math.sin(i * 0.7) * 20 + Math.random() * 25);
        bar.style.height = Math.max(15, Math.min(100, h)) + "%";
        waveform.appendChild(bar);
        bars.push(bar);
      }

      function formatTime(s: number) {
        const m = Math.floor(s / 60);
        const sec = Math.floor(s % 60);
        return m + ":" + (sec < 10 ? "0" : "") + sec;
      }

      let isPlaying = false;
      let elapsed = 0;
      let rafId: number | null = null;
      let lastFrame: number | null = null;

      function setProgress(pct: number) {
        pct = Math.max(0, Math.min(100, pct));

        const cursor = (pct / 100) * letterEls.length;
        const WAVE = 3.2;
        for (let w = 0; w < letterEls.length; w++) {
          const diff = cursor - w;
          let t = diff <= 0 ? 0 : diff >= WAVE ? 1 : diff / WAVE;
          t = t * t * (3 - 2 * t);
          const alpha = 0.28 + t * 0.72;
          letterEls[w].style.color = "rgba(58,50,43," + alpha.toFixed(3) + ")";
        }

        const activeBars = Math.round((pct / 100) * BAR_COUNT);
        for (let i = 0; i < BAR_COUNT; i++) {
          bars[i].classList.toggle("active", i < activeBars);
        }
      }

      function render() {
        wfElapsed!.textContent = formatTime(elapsed);
        setProgress((elapsed / DURATION) * 100);
      }

      function tick(now: number) {
        if (!isPlaying) return;
        if (lastFrame === null) lastFrame = now;
        const delta = (now - lastFrame) / 1000;
        lastFrame = now;
        elapsed = Math.min(DURATION, elapsed + delta);
        render();
        if (elapsed >= DURATION) {
          stop();
          return;
        }
        rafId = requestAnimationFrame(tick);
      }

      function play() {
        isPlaying = true;
        lastFrame = null;
        playBtnText!.textContent = "Pause";
        playWrap!.classList.add("playing");
        rafId = requestAnimationFrame(tick);
      }

      function pause() {
        isPlaying = false;
        playBtnText!.textContent = "Play";
        playWrap!.classList.remove("playing");
        if (rafId) cancelAnimationFrame(rafId);
      }

      function stop() {
        pause();
        playBtnText!.textContent = "Replay";
      }

      playBtn.addEventListener("click", function () {
        if (isPlaying) {
          pause();
        } else {
          if (elapsed >= DURATION) elapsed = 0;
          play();
        }
      });

      waveform.addEventListener("click", function (e: MouseEvent) {
        const rect = waveform!.getBoundingClientRect();
        const pct = (e.clientX - rect.left) / rect.width;
        elapsed = Math.max(0, Math.min(DURATION, pct * DURATION));
        render();
        playBtnText!.textContent = isPlaying ? "Pause" : "Play";
      });

      render();
    })();

    // Slider logic
    (function () {
      const NYC = "/assets/slider-nyc.jpg";
      const SHZ = "/assets/slider-shenzhen.jpg";

      const GRAD1 = "linear-gradient(135deg, #8b7d6b 0%, #5f5346 60%, #221c17 100%)";
      const GRAD2 = "linear-gradient(135deg, #c9a267 0%, #8b7d6b 55%, #3a322b 100%)";
      const GRAD3 = "linear-gradient(135deg, #5f5346 0%, #221c17 70%, #0d0a08 100%)";
      const GRAD4 = "linear-gradient(135deg, #cec4b6 0%, #8b7d6b 50%, #453a2f 100%)";

      const datasets: Record<string, Array<{ bg: string; type: string }>> = {
        residences: [
          { bg: NYC, type: "img" },
          { bg: GRAD1, type: "grad" },
          { bg: SHZ, type: "img" },
          { bg: GRAD2, type: "grad" },
          { bg: GRAD3, type: "grad" },
        ],
        gallery: [
          { bg: GRAD4, type: "grad" },
          { bg: SHZ, type: "img" },
          { bg: GRAD2, type: "grad" },
          { bg: NYC, type: "img" },
        ],
        villas: [
          { bg: GRAD1, type: "grad" },
          { bg: NYC, type: "img" },
          { bg: GRAD3, type: "grad" },
        ],
      };

      const slideTrack = document.getElementById("slideTrack");
      const slideCur = document.getElementById("slideCur");
      const slideTotal = document.getElementById("slideTotal");
      const sliderPeek = document.getElementById("sliderPeek") as HTMLElement;
      const sliderThumb = document.getElementById("sliderThumb");
      const slidePrev = document.getElementById("slidePrev");
      const slideNext = document.getElementById("slideNext");
      const pillBtns = document.querySelectorAll(".pill-btn") as NodeListOf<HTMLElement>;
      const sliderTabBtns = document.querySelectorAll(
        ".slider-tabs .tab-btn"
      ) as NodeListOf<HTMLElement>;

      if (
        !slideTrack ||
        !slideCur ||
        !slideTotal ||
        !sliderPeek ||
        !sliderThumb ||
        !slidePrev ||
        !slideNext
      )
        return;

      let currentKey = "residences";
      let index = 0;

      function pad(n: number) {
        return (n < 10 ? "0" : "") + n;
      }

      function styleFor(slideEl: HTMLElement, slide: { bg: string; type: string }) {
        if (slide.type === "img") {
          slideEl.style.backgroundImage = "url(" + slide.bg + ")";
        } else {
          slideEl.style.backgroundImage = slide.bg;
        }
      }

      function buildTrack() {
        const slides = datasets[currentKey];
        slideTrack!.innerHTML = "";
        slides.forEach(function (slide) {
          const el = document.createElement("div");
          el.className = "slide";
          styleFor(el, slide);
          slideTrack!.appendChild(el);
        });
      }

      function updateUI() {
        const slides = datasets[currentKey];

        slideTrack!.style.transform = "translateX(-" + index * 100 + "%)";

        slideCur!.textContent = pad(index + 1);
        slideTotal!.textContent = "/ " + pad(slides.length);

        const nextIndex = (index + 1) % slides.length;
        styleFor(sliderPeek, slides[nextIndex]);

        const trackH = sliderThumb!.parentElement!.clientHeight;
        const segment = trackH / slides.length;
        sliderThumb!.style.height = Math.max(segment - 6, 14) + "px";
        sliderThumb!.style.top = index * segment + 3 + "px";

        pillBtns.forEach(function (btn) {
          btn.classList.toggle("active", btn.dataset.key === currentKey);
        });
        sliderTabBtns.forEach(function (btn) {
          btn.classList.toggle("active", btn.dataset.key === currentKey);
        });
      }

      function goTo(newIndex: number) {
        const slides = datasets[currentKey];
        index = ((newIndex % slides.length) + slides.length) % slides.length;
        updateUI();
      }

      function setDataset(key: string) {
        if (!datasets[key]) return;
        currentKey = key;
        index = 0;
        buildTrack();
        updateUI();
      }

      slidePrev.addEventListener("click", function () {
        goTo(index - 1);
      });
      slideNext.addEventListener("click", function () {
        goTo(index + 1);
      });
      sliderPeek.addEventListener("click", function () {
        goTo(index + 1);
      });

      pillBtns.forEach(function (btn) {
        btn.addEventListener("click", function () {
          if (btn.dataset.key) setDataset(btn.dataset.key);
        });
      });
      sliderTabBtns.forEach(function (btn) {
        btn.addEventListener("click", function () {
          if (btn.dataset.key) setDataset(btn.dataset.key);
        });
      });

      window.addEventListener("resize", updateUI);
      buildTrack();
      updateUI();
    })();

    // Footer tabs logic
    (function () {
      const footerVillas = document.getElementById("footerVillas");
      const footerResidences = document.getElementById("footerResidences");

      if (!footerVillas || !footerResidences) return;

      footerVillas.addEventListener("click", function () {
        footerVillas.classList.add("active");
        footerResidences.classList.remove("active");
      });
      footerResidences.addEventListener("click", function () {
        footerResidences.classList.add("active");
        footerVillas.classList.remove("active");
      });
    })();

    // Location tabs logic
    (function () {
      const locVillas = document.getElementById("locVillas");
      const locResidences = document.getElementById("locResidences");

      if (!locVillas || !locResidences) return;

      locVillas.addEventListener("click", function () {
        locVillas.classList.add("active");
        locResidences.classList.remove("active");
      });
      locResidences.addEventListener("click", function () {
        locResidences.classList.add("active");
        locVillas.classList.remove("active");
      });

      // Drag-to-scroll for the amenities filmstrip
      const strip = document.getElementById("amenitiesStrip");
      if (!strip) return;

      let isDown = false;
      let startX: number;
      let scrollLeft: number;

      function startDrag(x: number) {
        isDown = true;
        strip!.classList.add("dragging");
        startX = x - strip!.offsetLeft;
        scrollLeft = strip!.scrollLeft;
      }
      function moveDrag(x: number) {
        if (!isDown) return;
        const walk = x - strip!.offsetLeft - startX;
        strip!.scrollLeft = scrollLeft - walk;
      }
      function endDrag() {
        isDown = false;
        strip!.classList.remove("dragging");
      }

      strip.addEventListener("mousedown", function (e: MouseEvent) {
        startDrag(e.pageX);
      });
      window.addEventListener("mouseup", endDrag);
      strip.addEventListener("mouseleave", endDrag);
      strip.addEventListener("mousemove", function (e: MouseEvent) {
        moveDrag(e.pageX);
      });

      strip.addEventListener(
        "touchstart",
        function (e: TouchEvent) {
          startDrag(e.touches[0].pageX);
        },
        { passive: true }
      );
      strip.addEventListener("touchend", endDrag);
      strip.addEventListener(
        "touchmove",
        function (e: TouchEvent) {
          moveDrag(e.touches[0].pageX);
        },
        { passive: true }
      );
    })();

    // Menu toggle logic
    (function () {
      const menuBtn = document.getElementById("menuBtn");
      const menuBtnLabel = document.getElementById("menuBtnLabel");
      const closeBtn = document.getElementById("closeBtn");
      const siteMenu = document.getElementById("siteMenu");

      if (!menuBtn || !menuBtnLabel || !closeBtn || !siteMenu) return;

      let isOpen = false;

      function setOpen(open: boolean) {
        if (!menuBtn || !siteMenu || !menuBtnLabel) return;
        isOpen = open;
        menuBtn.classList.toggle("open", open);
        siteMenu.classList.toggle("open", open);
        menuBtnLabel.textContent = open ? "Close" : "Menu";
        menuBtn.setAttribute("aria-label", open ? "Close menu" : "Open menu");
        document.body.style.overflow = open ? "hidden" : "";
      }

      menuBtn.addEventListener("click", function () {
        setOpen(!isOpen);
      });
      closeBtn.addEventListener("click", function () {
        setOpen(false);
      });

      const links = siteMenu.querySelectorAll("[data-menu-link]") as NodeListOf<HTMLElement>;
      links.forEach(function (link) {
        link.addEventListener("click", function () {
          setOpen(false);
        });
      });
    })();
  }, []);

  return (
    <>
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>

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
