# 🎨 Rocky Icons - Design System & Style Guide

## Design Philosophy | ปรัชญาการออกแบบ

### Core Principles

1. **Clarity First** (ความชัดเจนเป็นอันดับหนึ่ง)
   - Every icon must be instantly recognizable
   - Clear visual hierarchy
   - No ambiguous meanings

2. **Geometric Precision** (ความแม่นยำทางเรขาคณิต)
   - Perfect alignment to pixel grid
   - Consistent angles and curves
   - Mathematical proportions

3. **Minimalist Beauty** (ความงามแบบมินิมอล)
   - Remove unnecessary elements
   - Essential shapes only
   - Clean and modern

4. **Scalable Design** (ออกแบบให้ปรับขนาดได้)
   - Works from 16px to 512px
   - Maintain clarity at all sizes
   - Optimized for retina displays

5. **Accessible for All** (เข้าถึงได้สำหรับทุกคน)
   - WCAG 2.1 AA compliance
   - High contrast support
   - Screen reader friendly

## 📐 Grid System & Specifications

### Base Grid
```
Canvas Size: 24x24px (default)
Alternative Sizes: 16px, 20px, 32px, 48px, 64px
Grid: 1px precision
Safe Area: 2px padding from edges
Keylines: 20x20px active area
```

### Stroke Specifications
```css
/* Stroke Widths */
--stroke-thin: 1px;        /* Delicate icons */
--stroke-regular: 1.5px;   /* Default */
--stroke-bold: 2px;        /* Emphasis icons */
--stroke-heavy: 2.5px;     /* Strong presence */

/* Stroke Cap & Join */
stroke-linecap: round;
stroke-linejoin: round;
```

### Corner Radius
```css
/* Radius System */
--radius-none: 0px;        /* Sharp corners */
--radius-sm: 1px;          /* Subtle */
--radius-md: 2px;          /* Default */
--radius-lg: 4px;          /* Rounded */
--radius-xl: 8px;          /* Very rounded */
--radius-full: 50%;        /* Circles */
```

### Spacing & Alignment
```
Optical Alignment: Adjust for visual balance
Horizontal Centering: ±0.5px tolerance
Vertical Centering: ±0.5px tolerance
Inter-element Spacing: Multiples of 0.5px
```

## 🎨 Color System 2025

### Primary Palette
```css
/* Modern 2025 Colors */
--indigo-50: #EEF2FF;
--indigo-500: #6366F1;    /* Primary */
--indigo-600: #4F46E5;
--indigo-700: #4338CA;

--purple-500: #8B5CF6;    /* Secondary */
--purple-600: #7C3AED;

--emerald-500: #10B981;   /* Success */
--amber-500: #F59E0B;     /* Warning */
--red-500: #EF4444;       /* Error */
--blue-500: #3B82F6;      /* Info */
--slate-500: #64748B;     /* Neutral */
```

### Gradient Palette (2025 Trend)
```css
/* Vibrant Gradients */
--gradient-sunrise: linear-gradient(135deg, #FF6B6B 0%, #FFE66D 100%);
--gradient-ocean: linear-gradient(135deg, #4FACFE 0%, #00F2FE 100%);
--gradient-forest: linear-gradient(135deg, #0BA360 0%, #3CBA92 100%);
--gradient-sunset: linear-gradient(135deg, #FA709A 0%, #FEE140 100%);
--gradient-aurora: linear-gradient(135deg, #A8EDEA 0%, #FED6E3 100%);
--gradient-cyber: linear-gradient(135deg, #6B73FF 0%, #000DFF 100%);
--gradient-neon: linear-gradient(135deg, #F093FB 0%, #F5576C 100%);
--gradient-cosmic: linear-gradient(135deg, #4E54C8 0%, #8F94FB 100%);
```

### Glassmorphism (2025 Trend)
```css
.glass-effect {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
}
```

### 3D & Neumorphism
```css
.neomorphic {
  background: #E0E5EC;
  box-shadow: 9px 9px 16px #A3B1C6,
             -9px -9px 16px #FFFFFF;
}

.depth-shadow {
  box-shadow:
    0 2px 4px rgba(0,0,0,0.1),
    0 8px 16px rgba(0,0,0,0.1),
    0 16px 32px rgba(0,0,0,0.1);
}
```

## 🎭 Style Variants

### 1. Outline Style (Default)
```svg
<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
  <!-- Icon paths with strokes only -->
</svg>
```
- Clean and modern
- Lightweight file size
- Highly versatile

### 2. Filled Style
```svg
<svg viewBox="0 0 24 24" fill="currentColor">
  <!-- Solid shapes -->
</svg>
```
- Bold and prominent
- Better for small sizes
- High contrast

### 3. Duotone Style
```svg
<svg viewBox="0 0 24 24">
  <g opacity="0.2" fill="currentColor"><!-- Background --></g>
  <g fill="currentColor"><!-- Foreground --></g>
</svg>
```
- Two-tone design
- Depth and hierarchy
- Modern aesthetic

### 4. Gradient Style (2025 Trend)
```svg
<svg viewBox="0 0 24 24">
  <defs>
    <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#6366F1" />
      <stop offset="100%" style="stop-color:#8B5CF6" />
    </linearGradient>
  </defs>
  <path fill="url(#grad1)" d="..." />
</svg>
```

### 5. 3D Style (2025 Trend)
```svg
<svg viewBox="0 0 24 24">
  <!-- Shadow layer -->
  <path opacity="0.2" transform="translate(1, 1)" d="..." />
  <!-- Main shape with gradient -->
  <path fill="url(#3d-gradient)" d="..." />
  <!-- Highlight -->
  <path opacity="0.3" fill="white" d="..." />
</svg>
```

## 🎬 Animation System

### Animation Principles

1. **Purpose** - Every animation has a reason
2. **Performance** - 60fps minimum
3. **Subtlety** - Not distracting
4. **Consistency** - Unified timing and easing

### Timing & Easing
```css
/* Durations */
--duration-instant: 100ms;
--duration-fast: 200ms;
--duration-normal: 300ms;
--duration-slow: 500ms;
--duration-slower: 800ms;

/* Easing Functions */
--ease-linear: cubic-bezier(0, 0, 1, 1);
--ease-in: cubic-bezier(0.4, 0, 1, 1);
--ease-out: cubic-bezier(0, 0, 0.2, 1);
--ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);

/* Custom Easings (2025) */
--ease-bounce: cubic-bezier(0.68, -0.55, 0.265, 1.55);
--ease-elastic: cubic-bezier(0.68, -0.6, 0.32, 1.6);
--ease-smooth: cubic-bezier(0.25, 0.46, 0.45, 0.94);
```

### Animation Types

#### 1. Hover Animations
```css
.icon-hover-lift {
  transition: transform var(--duration-fast) var(--ease-out);
}
.icon-hover-lift:hover {
  transform: translateY(-2px);
}

.icon-hover-scale {
  transition: transform var(--duration-fast) var(--ease-bounce);
}
.icon-hover-scale:hover {
  transform: scale(1.1);
}

.icon-hover-rotate {
  transition: transform var(--duration-normal) var(--ease-smooth);
}
.icon-hover-rotate:hover {
  transform: rotate(15deg);
}
```

#### 2. Click Animations
```css
.icon-click-pulse {
  animation: pulse 0.6s ease-out;
}

@keyframes pulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.2); }
}

.icon-click-bounce {
  animation: bounce 0.8s var(--ease-bounce);
}

@keyframes bounce {
  0%, 100% { transform: translateY(0); }
  25% { transform: translateY(-10px); }
  50% { transform: translateY(-5px); }
  75% { transform: translateY(-2px); }
}
```

#### 3. Loading Animations
```css
.icon-spin {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.icon-pulse-infinite {
  animation: pulse-infinite 2s ease-in-out infinite;
}

@keyframes pulse-infinite {
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.5; transform: scale(0.9); }
}
```

#### 4. Path Drawing Animation
```css
.icon-draw {
  stroke-dasharray: 1000;
  stroke-dashoffset: 1000;
  animation: draw 2s ease-out forwards;
}

@keyframes draw {
  to { stroke-dashoffset: 0; }
}
```

#### 5. Morphing Animation (2025 Trend)
```html
<svg viewBox="0 0 24 24">
  <path d="M...">
    <animate
      attributeName="d"
      from="M4,12 L20,12"
      to="M12,4 L12,20"
      dur="0.3s"
      fill="freeze"
    />
  </path>
</svg>
```

## 🎯 2025 Design Trends Implementation

### 1. Glassmorphism Icons
```svg
<svg viewBox="0 0 24 24" class="glass-icon">
  <defs>
    <filter id="glass-blur">
      <feGaussianBlur in="SourceGraphic" stdDeviation="2" />
    </filter>
  </defs>
  <rect fill="rgba(255,255,255,0.1)" filter="url(#glass-blur)" />
  <path stroke="rgba(255,255,255,0.8)" stroke-width="1.5" />
</svg>
```

### 2. Gradient Mesh (Advanced 2025)
```svg
<svg viewBox="0 0 24 24">
  <defs>
    <radialGradient id="mesh1">
      <stop offset="0%" stop-color="#6366F1" />
      <stop offset="50%" stop-color="#8B5CF6" />
      <stop offset="100%" stop-color="#EC4899" />
    </radialGradient>
  </defs>
</svg>
```

### 3. Micro-interactions
```javascript
// Haptic-like visual feedback
const microInteraction = {
  tap: {
    scale: 0.95,
    duration: 100,
    easing: 'ease-out'
  },
  success: {
    color: '#10B981',
    shake: { x: [-2, 2, -2, 2, 0] },
    duration: 400
  }
};
```

### 4. Fluid Animations (2025)
```css
.icon-fluid {
  animation: fluid 3s ease-in-out infinite;
}

@keyframes fluid {
  0%, 100% {
    border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%;
  }
  50% {
    border-radius: 30% 60% 70% 40% / 50% 60% 30% 60%;
  }
}
```

## 📏 Icon Design Templates

### Essential Icon Template
```svg
<!-- 24x24 Base Template -->
<svg
  viewBox="0 0 24 24"
  width="24"
  height="24"
  fill="none"
  stroke="currentColor"
  stroke-width="1.5"
  stroke-linecap="round"
  stroke-linejoin="round"
  xmlns="http://www.w3.org/2000/svg"
>
  <!-- Icon content here -->
  <!-- Keep within 20x20 safe area (2px padding) -->
</svg>
```

### Animated Icon Template
```svg
<svg viewBox="0 0 24 24" class="rocky-icon-animated">
  <defs>
    <!-- Gradients -->
    <linearGradient id="icon-gradient">
      <stop offset="0%" stop-color="var(--color-start)" />
      <stop offset="100%" stop-color="var(--color-end)" />
    </linearGradient>

    <!-- Filters -->
    <filter id="glow">
      <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
      <feMerge>
        <feMergeNode in="coloredBlur"/>
        <feMergeNode in="SourceGraphic"/>
      </feMerge>
    </filter>
  </defs>

  <!-- Animated paths -->
  <g class="icon-layer">
    <path d="..." />
    <animateTransform
      attributeName="transform"
      type="rotate"
      from="0 12 12"
      to="360 12 12"
      dur="2s"
      repeatCount="indefinite"
    />
  </g>
</svg>
```

## ✅ Quality Checklist

### Design Quality
- [ ] Aligned to pixel grid
- [ ] Consistent stroke width
- [ ] Optical balance achieved
- [ ] Scales well at all sizes
- [ ] Recognizable at 16px
- [ ] Works in monochrome
- [ ] No unnecessary complexity

### Technical Quality
- [ ] Clean, optimized SVG code
- [ ] No transform matrices
- [ ] Minimal path points
- [ ] Proper viewBox
- [ ] Valid SVG syntax
- [ ] File size < 2KB
- [ ] Accessible labels

### Animation Quality
- [ ] Smooth 60fps
- [ ] No jank or stutter
- [ ] Appropriate duration
- [ ] Can be disabled
- [ ] Respects prefers-reduced-motion
- [ ] GPU accelerated
- [ ] File size optimized

## 🎓 Design Guidelines

### DO ✅
- Use consistent stroke weights within an icon
- Align to pixel grid for crisp rendering
- Test at multiple sizes (16px, 24px, 48px)
- Consider dark mode compatibility
- Use semantic naming
- Maintain visual weight balance
- Follow the grid system

### DON'T ❌
- Mix different style variants in one icon
- Create overly complex shapes
- Use thin strokes that disappear at small sizes
- Ignore optical alignment
- Use too many colors
- Create inconsistent spacing
- Forget accessibility

## 📚 Resources

### Design Tools
- Figma (recommended)
- Adobe Illustrator
- Sketch
- Inkscape (free)

### Optimization Tools
- SVGO
- SVG OMG
- ImageOptim

### Testing Tools
- Chrome DevTools
- Lighthouse
- WAVE (accessibility)

### Inspiration
- Material Design Icons
- Phosphor Icons
- Heroicons
- Lucide Icons
- Feather Icons

---

**Version**: 1.0.0
**Last Updated**: 2025
**Maintained by**: Rocky Icons Design Team

