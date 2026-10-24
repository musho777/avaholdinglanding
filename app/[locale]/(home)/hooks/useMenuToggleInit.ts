import { useEffect } from "react";

export function useMenuToggleInit() {
  useEffect(() => {
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
  }, []);
}
