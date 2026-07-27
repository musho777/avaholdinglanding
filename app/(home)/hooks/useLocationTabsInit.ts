import { useEffect } from "react";

export function useLocationTabsInit() {
  useEffect(() => {
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
  }, []);
}
