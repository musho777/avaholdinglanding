"use client";

import { useEffect } from "react";
import { useTranslations, useLocale } from "next-intl";

export default function QuoteSection() {
  const t = useTranslations("quote");
  const locale = useLocale();

  // Audio file based on locale
  const audioSrc =
    locale === "am" ? "/assets/ava-holding-am.mp3" : "/assets/Ava holding creates-2.mp3";

  useEffect(() => {
    let DURATION = 71;
    const BAR_COUNT = 90;

    const quoteText = document.getElementById("quoteText");
    const quoteCaption = document.getElementById("quoteCaption");
    const quoteCaptionTwo = document.getElementById("quoteCaptionTwo");
    const playWrap = document.getElementById("playWrap");
    const playBtn = document.getElementById("playBtn");
    const playBtnText = document.getElementById("playBtnText");
    const waveform = document.getElementById("waveform");
    const wfElapsed = document.getElementById("wfElapsed");
    const wfTotal = document.getElementById("wfTotal");
    const audioElement = document.getElementById("quoteAudio") as HTMLAudioElement;
    const animPhoto = document.querySelector(".anim-photo") as HTMLElement;

    if (
      !quoteText ||
      !quoteCaption ||
      !quoteCaptionTwo ||
      !playWrap ||
      !playBtn ||
      !playBtnText ||
      !waveform ||
      !wfElapsed ||
      !wfTotal ||
      !audioElement
    )
      return;

    // Get translated button texts
    const playText = playBtnText.getAttribute("data-play") || "Play";
    const pauseText = playBtnText.getAttribute("data-pause") || "Pause";
    const replayText = playBtnText.getAttribute("data-replay") || "Replay";

    // Update duration once audio metadata is loaded
    audioElement.addEventListener("loadedmetadata", function () {
      DURATION = audioElement.duration;
      wfTotal.textContent = formatTime(DURATION);
    });

    wfTotal.textContent = formatTime(DURATION);

    // Process both quote text and caption
    function processText(element: HTMLElement) {
      const rawWords = element.textContent!.trim().split(/\s+/);
      element.innerHTML = rawWords
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
    }

    processText(quoteText);
    processText(quoteCaption);
    processText(quoteCaptionTwo);

    // Collect all letters from all paragraphs
    const letterEls = [
      ...Array.from(quoteText.querySelectorAll(".letter")),
      ...Array.from(quoteCaption.querySelectorAll(".letter")),
      ...Array.from(quoteCaptionTwo.querySelectorAll(".letter")),
    ] as HTMLElement[];

    // Clear any existing bars before creating new ones
    waveform.innerHTML = "";

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
      lastFrame = now;
      elapsed = audioElement.currentTime;
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
      playBtnText!.textContent = pauseText;
      playWrap!.classList.add("playing");
      audioElement.play().catch((err) => console.error("Audio play failed:", err));
      rafId = requestAnimationFrame(tick);
    }

    function pause() {
      isPlaying = false;
      playBtnText!.textContent = playText;
      playWrap!.classList.remove("playing");
      audioElement.pause();
      if (rafId) cancelAnimationFrame(rafId);
    }

    function stop() {
      pause();
      audioElement.currentTime = 0;
      elapsed = 0;
      playBtnText!.textContent = replayText;
    }

    playBtn.addEventListener("click", function () {
      if (isPlaying) {
        pause();
      } else {
        if (elapsed >= DURATION) {
          elapsed = 0;
          audioElement.currentTime = 0;
        }
        play();
      }
    });

    waveform.addEventListener("click", function (e: MouseEvent) {
      const rect = waveform!.getBoundingClientRect();
      const pct = (e.clientX - rect.left) / rect.width;
      elapsed = Math.max(0, Math.min(DURATION, pct * DURATION));
      audioElement.currentTime = elapsed;
      render();
      playBtnText!.textContent = isPlaying ? pauseText : playText;
    });

    audioElement.addEventListener("ended", function () {
      stop();
    });

    function handleScroll() {
      if (!animPhoto) return;

      const rect = animPhoto.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      const progress = Math.max(
        0,
        Math.min(1, 1 - (rect.top + rect.height / 2) / (windowHeight + rect.height / 2))
      );
      const translateY = -20 + progress * 20;
      animPhoto.style.transform = `translate(0%, ${translateY}%)`;
    }

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    render();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <section className="quote-section" id="story">
      <audio id="quoteAudio" preload="auto" key={locale}>
        <source src={audioSrc} type={locale === "am" ? "audio/mpeg" : "audio/wav"} />
      </audio>
      <div className="quote-bg"></div>

      <div className="quote-container container-padding">
        <div className="quote-content">
          <div className="quote-text-wrapper">
            <p className="quote-fill scroll-reveal" id="quoteText">
              {t("mainText")}
            </p>
            <p
              className="quote-caption scroll-reveal delay-1"
              id="quoteCaption"
              style={{ marginBottom: "0" }}
            >
              {t("caption1")}
            </p>
            <p
              className="quote-caption scroll-reveal delay-1"
              id="quoteCaptionTwo"
              style={{ marginTop: "5px" }}
            >
              {t("caption2")}
            </p>
          </div>

          <div className="quote-controls">
            <div className="waveform-row scroll-reveal delay-3">
              <span className="wf-time" id="wfElapsed">
                0:00
              </span>
              <div className="waveform" id="waveform"></div>
              <span className="wf-time" id="wfTotal">
                1:12
              </span>
            </div>
            <div className="play-wrap scroll-reveal delay-2" id="playWrap">
              <button
                className="play-btn"
                id="playBtn"
                type="button"
                aria-label={t("playAriaLabel")}
              >
                <div className="button-bg"></div>
                <span className="button-animation">
                  <span className="button-circle"></span>
                  <span className="button-circle"></span>
                  <span className="button-circle"></span>
                  <span className="button-circle"></span>
                </span>
                <span
                  className="button-text"
                  id="playBtnText"
                  data-play={t("play")}
                  data-pause={t("pause")}
                  data-replay={t("replay")}
                >
                  {t("play")}
                </span>
              </button>
            </div>
          </div>
        </div>

        <div className="photo-wrapper scroll-reveal">
          <img src="/assets/1.png" alt={t("imageAlt")} className="inner-img" />
        </div>
      </div>
    </section>
  );
}
