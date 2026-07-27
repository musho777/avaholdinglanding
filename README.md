# AVA — Next.js

This is the AVA landing page, converted from the original single-file HTML
build into a Next.js 14 (App Router) project.

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

To build for production:

```bash
npm run build
npm start
```

## Project structure

```
app/
  layout.tsx     — root layout, loads the Fraunces/Inter Google Fonts
  page.tsx        — the entire page: markup (JSX) + all interaction logic
  globals.css     — all styling (ported 1:1 from the original <style> block)
public/
  assets/         — hero photo, slider photos, all served as real static
                    files instead of inline base64 (much smaller JS bundle)
```

## What changed in the conversion

- **Markup**: the original static HTML was mechanically converted to JSX
  (`class` → `className`, `stroke-width` → `strokeWidth`, inline
  `style="..."` strings → `style={{...}}` objects). The structure and every
  class name are otherwise identical, so all existing CSS still applies
  unchanged.
- **Images**: previously embedded as base64 data URIs directly in the HTML
  (which made the file over 1MB). They're now real files in `public/assets`,
  referenced by normal `/assets/...` paths — this is why the JS bundle for
  the page is only ~6KB instead of megabytes.
- **Interactivity**: all the vanilla JS (preloader, logo dock animation,
  smooth scroll, quote reading-wave, waveform player, image slider, location
  map tabs, drag-to-scroll amenities strip, full-screen menu) is ported
  as-is into a single `useEffect` in `page.tsx`, running once on mount. It
  wasn't rewritten into idiomatic React state/hooks — the priority was
  preserving the exact behavior and timing of every animation without
  introducing new bugs during the conversion. If you'd like any specific
  piece (the slider, the menu, etc.) refactored into a proper React
  component with hooks and props, that's a reasonable next step and can be
  done incrementally, section by section.

## Fonts

Constantia and Canela (referenced in the font stack as the first choices)
are commercial fonts not available via any CDN, so they only render for
visitors who already have them installed locally. Everyone else falls back
to Fraunces, which is loaded properly via Google Fonts in `layout.tsx`.
