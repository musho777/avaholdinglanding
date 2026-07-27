import { useEffect } from "react";

export function useFooterTabsInit() {
  useEffect(() => {
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
  }, []);
}
