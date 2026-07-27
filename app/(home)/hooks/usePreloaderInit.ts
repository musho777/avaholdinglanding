import { useEffect } from "react";

export function usePreloaderInit() {
  useEffect(() => {
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
  }, []);
}
