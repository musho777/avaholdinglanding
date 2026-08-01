# Map SVG Hover Effects - Instructions

This document explains how to add hover effects to different address points on the map.

## Current Implementation

### Address 2 Hover Effect
Currently, `address2` has a hover effect where:
- When hovering over address2, it changes color to white
- The 11 route points (beautiful circular dots) appear in black **one by one** (sequentially)
- Each dot has a beautiful bounce animation with drop shadow
- Animation uses cubic-bezier easing for smooth, professional effect
- When unhovering, everything returns to the original color

## How to Add Hover Effects to Other Address Points

### File to Edit
`/Users/musho99icloud.com/Downloads/ava-nextjs/app/(home)/components/MapSvg/MapSvg.jsx`

### Structure in the SVG

1. **Address Point Structure** (example):
   ```jsx
   <g id="address1">
     <path className="cls-2" d="..." />
     <ellipse className="cls-3" cx={...} cy={...} rx={...} ry={...} />
   </g>
   ```

2. **With Route Points** (like address2):
   ```jsx
   <g id="address2-wrapper">
     <g id="address2">
       <path className="cls-2" d="..." />
       <ellipse className="cls-3" cx={...} cy={...} rx={...} ry={...} />
     </g>
     <g id="address2-route">
       <path className="route-rect" d="..." />
       <path className="route-rect" d="..." />
       <!-- ... more route-rect paths ... -->
     </g>
   </g>
   ```

### CSS Pattern for Hover Effects

The CSS is located in the `<style>` tag inside the `<defs>` section (line 12-14).

#### Basic Address Hover (No Route Points)
```css
#address1:hover .cls-2{stroke:#fff!important}
#address1:hover .cls-3{fill:#fff!important}
```

#### Address with Route Points (Beautiful Sequential Animation)
```css
/* Wrapper for isolation */
#address2-wrapper{isolation:isolate}

/* Address point color change on hover */
#address2-wrapper:hover #address2 .cls-2{stroke:#fff!important}
#address2-wrapper:hover #address2 .cls-3{fill:#fff!important}

/* Route dots base style */
.route-rect{
  fill:#000;
  opacity:0;
  transform-origin:center;
  transform-box:fill-box;
  pointer-events:none;
  will-change:opacity,transform;
  filter:drop-shadow(0 2px 4px rgba(0,0,0,0.3))
}

/* Route dots turn black on hover */
#address2-wrapper:hover #address2-route .route-rect{
  fill:#000!important
}

/* Beautiful bounce animation keyframes */
@keyframes routeFlow{
  0%{opacity:0;transform:scale(0.5)}
  50%{opacity:1;transform:scale(1.2)}
  100%{opacity:1;transform:scale(1)}
}

/* Sequential animation for each route dot */
#address2-wrapper:hover #address2-route .route-rect{
  animation:routeFlow 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) forwards
}

#address2-wrapper:hover #address2-route .route-rect:nth-child(1){
  animation-delay:0s
}
#address2-wrapper:hover #address2-route .route-rect:nth-child(2){
  animation-delay:0.08s
}
/* ... continue for all 11 route dots with 0.08s increments ... */
```

**SVG Structure for Route Dots:**
```jsx
<g id="address2-route">
  <circle className="route-rect" cx="742" cy="491.65" r="4" />
  <circle className="route-rect" cx="751.65" cy="487.52" r="4" />
  <!-- ... 11 circular dots total ... -->
</g>
```

## Step-by-Step: Adding Hover to a New Address Point

### Example: Adding hover to "address1"

1. **Locate the address in the SVG** (search for `id="address1"`)

2. **Decide if it needs route points:**
   - **NO route points**: Just change the address color on hover
   - **WITH route points**: Add wrapper and route group

3. **Update the SVG structure** (if adding route points):
   ```jsx
   <g id="address1-wrapper">
     <g id="address1">
       <!-- existing address1 content -->
     </g>
     <g id="address1-route">
       <path className="route-rect" d="..." />
       <!-- add route paths here -->
     </g>
   </g>
   ```

4. **Add CSS to the style section**:

   **Option A - Simple hover (no routes):**
   ```css
   #address1:hover .cls-2{stroke:#fff!important}
   #address1:hover .cls-3{fill:#fff!important}
   ```

   **Option B - With route points:**
   ```css
   #address1-wrapper{isolation:isolate}
   #address1-wrapper:hover #address1 .cls-2{stroke:#fff!important}
   #address1-wrapper:hover #address1 .cls-3{fill:#fff!important}
   #address1-wrapper:hover #address1-route .route-rect{fill:#000!important}
   #address1-wrapper:hover #address1-route .route-rect:nth-child(1){animation:routeFlow 0.3s ease forwards;animation-delay:0s}
   #address1-wrapper:hover #address1-route .route-rect:nth-child(2){animation:routeFlow 0.3s ease forwards;animation-delay:0.1s}
   /* ... add for each route point ... */
   ```

## Customization Options

### Colors
- **Address hover color**: Change `#fff` in `stroke:#fff!important` and `fill:#fff!important`
- **Route dots color**: Change `#000` in `fill:#000!important`
- **Shadow color**: Change `rgba(0,0,0,0.3)` in `filter:drop-shadow(0 2px 4px rgba(0,0,0,0.3))`

### Timing
- **Animation speed**: Change `0.4s` in `animation:routeFlow 0.4s cubic-bezier(...) forwards`
- **Delay between points**: Change `0.08s` increment in `animation-delay`
- **Total animation time**: (number of points × 0.08s) + 0.4s = ~1.28s

### Animation Style
- **Current**: Beautiful bounce effect with scale animation
  - Starts at 50% size (scale 0.5)
  - Bounces to 120% size (scale 1.2)
  - Settles at 100% size (scale 1)
  - Uses cubic-bezier easing for smooth motion
- **Easing function**: `cubic-bezier(0.34, 1.56, 0.64, 1)` creates the bounce effect
- **Drop shadow**: Adds depth with `filter:drop-shadow(0 2px 4px rgba(0,0,0,0.3))`

### Shape Options
- **Current**: Circular dots using `<circle>` elements with radius 4
- **Alternative shapes**:
  - Arrows: Use SVG path with arrowhead marker
  - Diamonds: Rotate squares 45 degrees
  - Custom icons: Replace with any SVG shape

## Quick Reference

| Address ID | Has Route Points? | Number of Routes | Status |
|------------|-------------------|------------------|--------|
| address1   | No                | 0                | Not implemented |
| address2   | Yes               | 11               | ✅ Implemented |

## Notes
- Always test in the browser after making changes
- The `routeFlow` animation is already defined, reuse it for other addresses
- Use `isolation:isolate` on wrapper to prevent CSS conflicts
- All routes use class `route-rect` for consistent styling
