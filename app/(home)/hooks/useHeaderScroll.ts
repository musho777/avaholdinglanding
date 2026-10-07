"use client";

import { useEffect, useState } from "react";

// Shared state for header and logo
let scrollState = {
  isHidden: false,
  hasBackground: false,
};

const listeners = new Set<(state: typeof scrollState) => void>();
let scrollListenerActive = false;
let __lastScrollY = 0;
let ticking = false;

function notifyListeners() {
  listeners.forEach((listener) => listener({ ...scrollState }));
}

function updateScroll() {
  const currentScrollY = window.scrollY;
  const heroSection = document.querySelector(".hero-wrapper");
  const heroHeight = heroSection?.clientHeight || 0;

  const newIsHidden = scrollState.isHidden;
  let newHasBackground = scrollState.hasBackground;

  // Hide header/logo when scrolling down, show when scrolling up
  // Commented out to keep header always visible
  // if (currentScrollY > _lastScrollY && currentScrollY > 100) {
  //   newIsHidden = true;
  // } else if (currentScrollY < _lastScrollY) {
  //   newIsHidden = false;
  // }

  // Add background after hero section
  if (currentScrollY > heroHeight - 100) {
    newHasBackground = true;
  } else {
    newHasBackground = false;
  }

  // Only update if changed
  if (newIsHidden !== scrollState.isHidden || newHasBackground !== scrollState.hasBackground) {
    scrollState = { isHidden: newIsHidden, hasBackground: newHasBackground };
    notifyListeners();
  }

  _lastScrollY = currentScrollY;
  ticking = false;
}

function handleScroll() {
  if (!ticking) {
    window.requestAnimationFrame(updateScroll);
    ticking = true;
  }
}

function initScrollListener() {
  if (!scrollListenerActive) {
    _lastScrollY = window.scrollY;
    window.addEventListener("scroll", handleScroll, { passive: true });
    scrollListenerActive = true;
  }
}

function cleanupScrollListener() {
  if (scrollListenerActive && listeners.size === 0) {
    window.removeEventListener("scroll", handleScroll);
    scrollListenerActive = false;
  }
}

export function useHeaderScroll() {
  const [state, setState] = useState(scrollState);

  useEffect(() => {
    listeners.add(setState);
    initScrollListener();

    return () => {
      listeners.delete(setState);
      cleanupScrollListener();
    };
  }, []);

  return state;
}
