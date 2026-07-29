"use client";

import { useEffect } from "react";

export default function QuoteSection() {
  useEffect(() => {
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
  }, []);

  return (
    <section className="quote-section" id="story">
      <div className="quote-bg"></div>
      <div className="quote-inner">
        <div>
          <p className="quote-fill scroll-reveal" id="quoteText">
            AVA HOLDING CREATES MORE THAN BUILDINGS — IT CREATES THE FOUNDATION FOR A COMFORTABLE, MEANINGFUL, AND FORWARD-LOOKING FUTURE.
          </p>
          <p className="quote-caption scroll-reveal delay-1">
            Founded in 2006, AVA Holding is one of Armenia's most promising real estate development and construction companies. Its core focus is the creation of multifunctional residential buildings that meet the evolving needs of modern life. Today, one of Armenia's most significant challenges — and opportunities — is to stand among the world's leading innovators. Achieving that visibility would firmly place our country on the global stage. At the same time, in a world advancing at high speed, we believe it is vital not to lose sight of what matters most: people, safety, and the feeling of home. That's why AVA Holding aims to build more than just modern buildings — it creates spaces where people feel warmth, comfort, and belonging. Each project blends forward-thinking architecture with everyday practicality, driven by a deep respect for both place and person, chasing the main manifesto — LIVING PERFECTED.
          </p>
        </div>

        <div className="play-wrap scroll-reveal delay-2" id="playWrap">
          <button className="play-btn" id="playBtn" type="button" aria-label="play the audio">
            <div className="button-bg"></div>
            <span className="button-animation">
              <span className="button-circle"></span>
              <span className="button-circle"></span>
              <span className="button-circle"></span>
              <span className="button-circle"></span>
            </span>
            <span className="button-text" id="playBtnText">
              Play
            </span>
          </button>
        </div>

        <div className="waveform-row scroll-reveal delay-3">
          <span className="wf-time" id="wfElapsed">
            0:00
          </span>
          <div className="waveform" id="waveform"></div>
          <span className="wf-time" id="wfTotal">
            0:31
          </span>
        </div>

        <p className="quote-credit scroll-reveal delay-4">AVA Studio &amp; Atmosphere Projects</p>
      </div>
    </section>
  );
}
