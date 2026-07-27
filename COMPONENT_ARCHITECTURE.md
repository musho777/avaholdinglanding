# Component Architecture - AVA Next.js

## Overview

The AVA Next.js application has been refactored from a monolithic single-file structure into a **modular component architecture**. This improves code organization, maintainability, and reusability while preserving all original functionality and animations.

---

## Architecture Benefits

### ✅ **Modularity**
- Each section is now a separate, self-contained component
- Easy to locate and update specific features
- Clear separation of concerns

### ✅ **Reusability**
- Components can be reused across different pages
- Sub-components (MapPin, AmenityCard) can be extracted further if needed

### ✅ **Maintainability**
- Smaller files are easier to read and understand
- Changes to one component don't affect others
- Easier to test individual components

### ✅ **Type Safety**
- TypeScript types are properly defined in component props
- Better IDE autocomplete and error detection

### ✅ **Developer Experience**
- Clearer project structure
- Easier onboarding for new developers
- Better code navigation

---

## Project Structure

```
ava-nextjs/
├── app/
│   ├── layout.tsx              # Root layout with fonts and metadata
│   ├── page.tsx                # Main page using all components
│   ├── globals.css             # Global styles
│   └── sitemap.ts              # Dynamic sitemap
├── components/                 # All UI components (modular structure)
│   ├── Preloader/
│   │   ├── Preloader.tsx       # Loading screen component
│   │   └── index.ts            # Barrel export
│   ├── Hero/
│   │   ├── Hero.tsx            # Hero section with scroll cue
│   │   └── index.ts
│   ├── Header/
│   │   ├── Header.tsx          # Fixed header navigation
│   │   └── index.ts
│   ├── Menu/
│   │   ├── SiteMenu.tsx        # Full-screen navigation menu
│   │   └── index.ts
│   ├── Logo/
│   │   ├── LogoLayer.tsx       # Animated logo layer
│   │   └── index.ts
│   ├── Quote/
│   │   ├── QuoteSection.tsx    # Quote with audio player
│   │   └── index.ts
│   ├── Location/
│   │   ├── LocationSection.tsx # Map and amenities
│   │   └── index.ts
│   ├── Slider/
│   │   ├── Slider.tsx          # Image slider
│   │   └── index.ts
│   ├── CTA/
│   │   ├── ClosingCTA.tsx      # Closing call-to-action
│   │   └── index.ts
│   ├── Footer/
│   │   ├── Footer.tsx          # Site footer
│   │   └── index.ts
│   └── index.ts                # Central barrel export for all components
├── hooks/                      # Custom React hooks
│   ├── usePreloader.ts         # Preloader hiding logic
│   ├── useSmoothScroll.ts      # Smooth scroll functionality
│   ├── useLogoAnimation.ts     # Logo animation
│   ├── useInteractivity.ts     # Central interactivity hook
│   └── index.ts                # Barrel export
└── public/
    ├── assets/                 # Images and static assets
    └── robots.txt
```

---

## Component Details

### 1. **Preloader** (`components/Preloader`)
**Purpose:** Loading screen that fades out after page load

**Features:**
- Displays during initial page load
- Fades out with smooth transition
- Triggers logo docking animation

**Usage:**
```tsx
import Preloader from "@/components/Preloader";

<Preloader />
```

---

### 2. **Hero** (`components/Hero`)
**Purpose:** Full-viewport hero section with background layers

**Features:**
- Layered background (photo, tint, grain, vignette)
- Scroll cue animation
- Responsive height

**Usage:**
```tsx
import Hero from "@/components/Hero";

<Hero />
```

---

### 3. **Header** (`components/Header`)
**Purpose:** Fixed navigation header

**Features:**
- Menu toggle button
- Phone link
- "Book a call" CTA
- Sticky positioning

**Usage:**
```tsx
import Header from "@/components/Header";

<Header />
```

---

### 4. **SiteMenu** (`components/Menu`)
**Purpose:** Full-screen navigation overlay

**Features:**
- Smooth open/close animation
- Navigation links
- Contact information
- Close button

**Usage:**
```tsx
import SiteMenu from "@/components/Menu";

<SiteMenu />
```

---

### 5. **LogoLayer** (`components/Logo`)
**Purpose:** Animated logo that transitions from hero to header

**Features:**
- Smooth scaling and repositioning
- Subtitle fade-out animation
- Responsive sizing

**Usage:**
```tsx
import LogoLayer from "@/components/Logo";

<LogoLayer />
```

---

### 6. **QuoteSection** (`components/Quote`)
**Purpose:** Quote display with interactive audio player

**Features:**
- Reading wave animation
- Waveform visualization
- Play/pause/seek controls
- Time display

**Usage:**
```tsx
import QuoteSection from "@/components/Quote";

<QuoteSection />
```

---

### 7. **LocationSection** (`components/Location`)
**Purpose:** Interactive map with location markers and amenities

**Features:**
- SVG map with topography
- Location pins
- Amenity cards (drag-scrollable)
- Tabs for Villas/Residences

**Sub-components:**
- `MapPin` - Individual location marker
- `AmenityCard` - Amenity display card

**Usage:**
```tsx
import LocationSection from "@/components/Location";

<LocationSection />
```

---

### 8. **Slider** (`components/Slider`)
**Purpose:** Full-screen image slider with multiple datasets

**Features:**
- Multiple image datasets (Residences, Gallery, Villas)
- Previous/next navigation
- Slide counter
- Thumbnail preview
- Tab switching

**Usage:**
```tsx
import Slider from "@/components/Slider";

<Slider />
```

---

### 9. **ClosingCTA** (`components/CTA`)
**Purpose:** Closing call-to-action section

**Features:**
- Headline
- Availability message
- CTA button

**Usage:**
```tsx
import ClosingCTA from "@/components/CTA";

<ClosingCTA />
```

---

### 10. **Footer** (`components/Footer`)
**Purpose:** Site footer with contact info and navigation

**Features:**
- Contact information
- Social media links
- Property selection buttons
- Legal links
- Copyright notice

**Usage:**
```tsx
import Footer from "@/components/Footer";

<Footer />
```

---

## Custom Hooks

### `usePreloader()`
Manages preloader hiding logic and triggers logo animation.

### `useSmoothScroll()`
Implements custom smooth scrolling for desktop trackpad/mouse.

### `useLogoAnimation()`
Handles logo scaling and repositioning animation from hero to header.

### `useInteractivity()`
Central hook for all vanilla JavaScript interactivity (consolidated approach).

---

## Import Patterns

### Individual Imports
```tsx
import Preloader from "@/components/Preloader";
import Hero from "@/components/Hero";
import Header from "@/components/Header";
```

### Barrel Imports (Alternative)
```tsx
import { Preloader, Hero, Header } from "@/components";
```

---

## Styling

All components use **global CSS** from `app/globals.css`. The original CSS has been preserved as-is to maintain exact visual fidelity.

**Styling Approach:**
- Global CSS with BEM-like naming
- CSS variables for colors and fonts
- No CSS modules or CSS-in-JS
- All styles in one file for simplicity

---

## Interactivity

All vanilla JavaScript logic is preserved in the main `page.tsx` file within a single `useEffect` hook. This approach:

✅ **Maintains original timing and behavior**
✅ **Avoids introducing animation bugs**
✅ **Keeps all DOM interactions in one place**
✅ **Easy to locate and debug**

The JavaScript logic could be further extracted into individual hooks (like `usePreloader`, `useSmoothScroll`, etc.) for even better organization, but the current approach prioritizes stability.

---

## Adding New Components

To add a new component:

1. **Create component folder:**
   ```bash
   mkdir components/NewComponent
   ```

2. **Create component file:**
   ```tsx
   // components/NewComponent/NewComponent.tsx
   export default function NewComponent() {
     return <div>New Component</div>;
   }
   ```

3. **Create barrel export:**
   ```tsx
   // components/NewComponent/index.ts
   export { default } from "./NewComponent";
   ```

4. **Update central barrel:**
   ```tsx
   // components/index.ts
   export { default as NewComponent } from "./NewComponent";
   ```

5. **Use in page:**
   ```tsx
   import NewComponent from "@/components/NewComponent";

   <NewComponent />
   ```

---

## Testing Strategy

### Component Testing
```tsx
import { render } from "@testing-library/react";
import Hero from "@/components/Hero";

test("renders hero section", () => {
  const { container } = render(<Hero />);
  expect(container.querySelector(".hero")).toBeInTheDocument();
});
```

### Integration Testing
Test the full page with all components integrated.

---

## Future Improvements

### Potential Enhancements:
1. **Extract sub-components** - MapPin, AmenityCard, SocialButton could be separate components
2. **Add component props** - Make components configurable via props
3. **Create Storybook** - Visual component documentation
4. **Add unit tests** - Test each component in isolation
5. **Extract hooks further** - Separate all JavaScript logic into individual hooks
6. **Add loading states** - Skeleton screens for better UX
7. **Implement error boundaries** - Graceful error handling

---

## Migration Notes

### Before (Monolithic)
- **1 file** - `app/page.tsx` (~775 lines)
- **1 massive component** with all markup
- **Difficult to navigate** and maintain

### After (Modular)
- **10 components** in separate folders
- **Clear organization** by feature
- **Easy to locate** and update specific sections
- **Reusable** components

### What Stayed the Same
✅ All original functionality preserved
✅ All animations work exactly as before
✅ All styling unchanged
✅ All vanilla JavaScript logic intact

---

## Performance

The modular architecture has **no performance impact**:
- All components are still client-side rendered
- Same bundle size
- Same JavaScript execution
- Same CSS
- Same DOM structure

The benefits are purely **organizational and developmental**.

---

## Conclusion

The modular component architecture improves code quality without sacrificing functionality. The codebase is now:

- ✅ **More maintainable** - Easy to find and update code
- ✅ **More scalable** - Easy to add new features
- ✅ **More testable** - Components can be tested in isolation
- ✅ **More readable** - Clear structure and organization
- ✅ **Better typed** - TypeScript benefits from smaller components

All while maintaining **100% of the original design and functionality**! 🎉
