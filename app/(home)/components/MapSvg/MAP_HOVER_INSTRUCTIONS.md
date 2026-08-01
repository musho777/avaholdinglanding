# Map SVG Hover Effects - Instructions

This document explains how to add hover effects to different address points on the map.

## Current Implementation

### Address 2 Hover Effect
Currently, `address2` has a hover effect where:
- When hovering over address2, it changes color to white
- The 11 route points (`route-rect`) change to black **one by one** (sequentially)
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

#### Address with Route Points (Sequential Animation)
```css
/* Wrapper for isolation */
#address2-wrapper{isolation:isolate}

/* Address point color change on hover */
#address2-wrapper:hover #address2 .cls-2{stroke:#fff!important}
#address2-wrapper:hover #address2 .cls-3{fill:#fff!important}

/* Route rectangles base style */
.route-rect{
  fill:#6a635b;
  opacity:0;
  transform-origin:center;
  transform-box:fill-box;
  pointer-events:none;
  will-change:opacity,transform
}

/* Route rectangles turn black on hover */
#address2-wrapper:hover #address2-route .route-rect{
  fill:#000!important
}

/* Animation keyframes */
@keyframes routeFlow{
  0%{opacity:0}
  100%{opacity:1}
}

/* Sequential animation for each route point (1-11) */
#address2-wrapper:hover #address2-route .route-rect:nth-child(1){
  animation:routeFlow 0.3s ease forwards;
  animation-delay:0s
}
#address2-wrapper:hover #address2-route .route-rect:nth-child(2){
  animation:routeFlow 0.3s ease forwards;
  animation-delay:0.1s
}
/* ... continue for all route points ... */
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
- **Route points color**: Change `#000` in `fill:#000!important`
- **Original route color**: Change `#6a635b` in `.route-rect{fill:#6a635b}`

### Timing
- **Animation speed**: Change `0.3s` in `animation:routeFlow 0.3s ease forwards`
- **Delay between points**: Change `0.1s` increment in `animation-delay`
- **Total animation time**: (number of points × 0.1s) + 0.3s

### Animation Style
- **Current**: Points fade in one by one (opacity 0 to 1)
- **Alternative**: Add scale effect by changing keyframes:
  ```css
  @keyframes routeFlow{
    0%{opacity:0;transform:scale(0.5)}
    100%{opacity:1;transform:scale(1)}
  }
  ```

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
