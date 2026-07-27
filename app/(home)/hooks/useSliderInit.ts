import { useEffect } from "react";

export function useSliderInit() {
  useEffect(() => {
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
  }, []);
}
