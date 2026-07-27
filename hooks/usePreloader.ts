import { useEffect } from "react";

export default function usePreloader() {
  useEffect(() => {
    const preloader = document.getElementById("preloader");
    let hidden = false;

    function hidePreloader() {
      if (hidden || !preloader) return;
      hidden = true;
      preloader.classList.add("hidden");
      if ((window as any).dockLogo) (window as any).dockLogo();
    }

    // Hide once everything (including the large embedded photos) has loaded,
    // with a small pause so the color isn't just a flash, and a fallback
    // timeout in case the load event is ever delayed
    window.addEventListener("load", function () {
      setTimeout(hidePreloader, 500);
    });
    setTimeout(hidePreloader, 3500);

    return () => {
      // Cleanup if needed
    };
  }, []);
}
