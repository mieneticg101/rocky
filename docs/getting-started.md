# Getting Started with Rocky Icons

Welcome to Rocky Icons! This guide will help you get started with using our modern icon library in your projects.

## Installation

### NPM
```bash
npm install @rocky-icons/library
```

### Yarn
```bash
yarn add @rocky-icons/library
```

### PNPM
```bash
pnpm add @rocky-icons/library
```

### CDN
```html
<script type="module">
  import { IconHome } from 'https://cdn.jsdelivr.net/npm/@rocky-icons/library/+esm';
</script>
```

## Basic Usage

### React

```jsx
import React from 'react';
import { IconHome, IconSearch, IconUser } from '@rocky-icons/library/react';

function App() {
  return (
    <div>
      {/* Basic usage */}
      <IconHome />

      {/* With size and color */}
      <IconSearch size={32} color="#6366F1" />

      {/* With hover animation */}
      <IconUser size={24} hover="lift" />

      {/* With loading animation */}
      <IconHome loading="spin" />

      {/* With click handler */}
      <IconSearch
        size={24}
        onClick={() => console.log('Search clicked!')}
        className="cursor-pointer"
      />
    </div>
  );
}
```

### Vue 3

```vue
<template>
  <div>
    <!-- Basic usage -->
    <IconHome />

    <!-- With size and color -->
    <IconSearch :size="32" color="#6366F1" />

    <!-- With hover animation -->
    <IconUser :size="24" hover="lift" />

    <!-- With loading animation -->
    <IconHome loading="spin" />

    <!-- With click handler -->
    <IconSearch
      :size="24"
      @click="handleSearch"
      class="cursor-pointer"
    />
  </div>
</template>

<script setup>
import { IconHome, IconSearch, IconUser } from '@rocky-icons/library/vue';

const handleSearch = () => {
  console.log('Search clicked!');
};
</script>
```

### Vanilla JavaScript / HTML

```html
<!DOCTYPE html>
<html>
<head>
  <link rel="stylesheet" href="@rocky-icons/library/dist/styles.css">
</head>
<body>
  <!-- Direct SVG usage -->
  <svg class="rocky-icon" viewBox="0 0 24 24" width="24" height="24">
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
  </svg>

  <!-- Using img tag -->
  <img src="@rocky-icons/library/icons/home.svg" alt="Home" width="24" height="24">
</body>
</html>
```

## Props / Options

All icons accept the following props:

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `size` | `number \| string` | `24` | Icon size in pixels or CSS value |
| `color` | `string` | `'currentColor'` | Icon color (hex, rgb, named color) |
| `strokeWidth` | `number` | `1.5` | Stroke width for outline icons |
| `fill` | `string` | `'none'` | Fill color |
| `className` | `string` | `''` | Additional CSS classes |
| `style` | `object` | `{}` | Inline styles |
| `animated` | `boolean` | `false` | Enable animation |
| `hover` | `string` | - | Hover animation: `'lift'`, `'scale'`, `'rotate'`, `'bounce'`, `'shake'` |
| `click` | `string` | - | Click animation: `'pulse'`, `'bounce'`, `'rotate'` |
| `loading` | `string` | - | Loading animation: `'spin'`, `'pulse'`, `'bounce'`, `'fade'` |
| `effect` | `string` | - | 2025 effects: `'gradient'`, `'glass'`, `'3d'`, `'glow'`, `'morph'` |
| `variant` | `string` | `'outline'` | Style variant: `'outline'`, `'filled'`, `'duotone'`, `'gradient'` |

## Animation Examples

### Hover Animations

```jsx
// Lift on hover
<IconHome hover="lift" />

// Scale on hover
<IconSearch hover="scale" />

// Rotate on hover
<IconSettings hover="rotate" />

// Full rotation on hover
<IconSettings hover="rotate-full" />

// Bounce on hover
<IconHeart hover="bounce" />

// Shake on hover
<IconBell hover="shake" />
```

### Loading Animations

```jsx
// Spin animation
<IconHome loading="spin" />

// Slow spin
<IconHome loading="spin-slow" />

// Fast spin
<IconHome loading="spin-fast" />

// Pulse animation
<IconHome loading="pulse" />

// Bounce animation
<IconHome loading="bounce" />

// Fade animation
<IconHome loading="fade" />
```

### Click Animations

```jsx
// Pulse on click
<IconHome click="pulse" />

// Bounce on click
<IconHome click="bounce" />

// Rotate on click
<IconHome click="rotate" />
```

## Style Variants

```jsx
// Outline (default)
<IconHome variant="outline" />

// Filled
<IconHome variant="filled" />

// Duotone
<IconHome variant="duotone" />

// Gradient (2025 trend)
<IconHome variant="gradient" />
```

## 2025 Effects

```jsx
// Gradient effect
<IconHome effect="gradient" />

// Glassmorphism
<IconHome effect="glass" />

// 3D effect
<IconHome effect="3d" />

// Glow effect
<IconHome effect="glow" />

// Morphing animation
<IconHome effect="morph" />
```

## Custom Styling

### CSS Classes

```jsx
<IconHome
  className="my-custom-icon"
  style={{ marginRight: '8px' }}
/>
```

```css
.my-custom-icon {
  color: #6366F1;
  transition: all 0.3s ease;
}

.my-custom-icon:hover {
  color: #8B5CF6;
  transform: scale(1.1);
}
```

### Tailwind CSS

```jsx
<IconHome className="text-indigo-500 hover:text-purple-500 w-6 h-6" />
```

## Tree Shaking

Rocky Icons supports tree shaking out of the box. Import only the icons you need:

```jsx
// ✅ Good - Only imports IconHome
import { IconHome } from '@rocky-icons/library/react';

// ❌ Avoid - Imports everything
import * as Icons from '@rocky-icons/library/react';
```

## TypeScript Support

Rocky Icons is written in TypeScript and includes type definitions:

```tsx
import { IconHome, IconProps } from '@rocky-icons/library/react';

const MyComponent: React.FC = () => {
  const iconProps: IconProps = {
    size: 24,
    color: '#6366F1',
    hover: 'lift',
  };

  return <IconHome {...iconProps} />;
};
```

## Accessibility

All icons include proper ARIA attributes:

```jsx
// For decorative icons
<IconHome aria-hidden="true" />

// For interactive icons with meaning
<IconSearch
  aria-label="Search"
  role="img"
  onClick={handleSearch}
/>
```

## Performance Tips

1. **Use Tree Shaking**: Import only what you need
2. **Lazy Load**: Load icons on demand for large applications
3. **Optimize Sizes**: Use appropriate sizes (avoid oversized icons)
4. **Reduce Animations**: Disable animations on low-end devices
5. **Respect Motion Preferences**: Animations are disabled for users who prefer reduced motion

## Next Steps

- [Design Guidelines](./design-guidelines.md)
- [Animation Guide](./animation-guide.md)
- [API Reference](./api-reference.md)
- [Customization](./customization.md)
- [Examples](./examples.md)

## Support

Need help? Check out:
- [Documentation](https://rocky-icons.dev/docs)
- [GitHub Issues](https://github.com/mieneticg101/Rocky/issues)
- [Discord Community](https://discord.gg/rocky-icons)

---

Happy coding with Rocky Icons! 🎨
