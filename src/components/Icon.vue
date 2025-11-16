<script setup lang="ts">
import { computed } from 'vue';

export interface IconProps {
  /** Icon size in pixels or CSS value */
  size?: number | string;
  /** Icon color */
  color?: string;
  /** Stroke width for outline icons */
  strokeWidth?: number;
  /** Fill color for filled icons */
  fill?: string;
  /** Enable animation */
  animated?: boolean;
  /** Hover animation type */
  hover?: 'lift' | 'scale' | 'rotate' | 'rotate-full' | 'bounce' | 'shake';
  /** Click animation type */
  click?: 'pulse' | 'bounce' | 'rotate';
  /** Loading animation type */
  loading?: 'spin' | 'spin-slow' | 'spin-fast' | 'pulse' | 'bounce' | 'fade';
  /** 2025 effects */
  effect?: 'gradient' | 'glass' | '3d' | 'glow' | 'morph';
  /** Additional CSS classes */
  className?: string;
  /** Style variant */
  variant?: 'outline' | 'filled' | 'duotone' | 'gradient';
}

const props = withDefaults(defineProps<IconProps>(), {
  size: 24,
  color: 'currentColor',
  strokeWidth: 1.5,
  fill: 'none',
  animated: false,
  variant: 'outline',
  className: '',
});

// Build class names
const classes = computed(() => {
  return [
    'rocky-icon',
    props.hover && `rocky-icon-hover-${props.hover}`,
    props.click && `rocky-icon-click-${props.click}`,
    props.loading && `rocky-icon-${props.loading}`,
    props.effect && `rocky-icon-${props.effect}`,
    props.className,
  ]
    .filter(Boolean)
    .join(' ');
});

// Convert size to pixels if it's a number
const sizeValue = computed(() => {
  return typeof props.size === 'number' ? `${props.size}px` : props.size;
});

const fillValue = computed(() => {
  return props.variant === 'filled' ? props.color : props.fill;
});

const strokeValue = computed(() => {
  return props.variant === 'filled' ? 'none' : props.color;
});

const strokeWidthValue = computed(() => {
  return props.variant === 'outline' ? props.strokeWidth : undefined;
});
</script>

<template>
  <svg
    :width="sizeValue"
    :height="sizeValue"
    viewBox="0 0 24 24"
    :fill="fillValue"
    :stroke="strokeValue"
    :stroke-width="strokeWidthValue"
    stroke-linecap="round"
    stroke-linejoin="round"
    :class="classes"
    role="img"
    xmlns="http://www.w3.org/2000/svg"
  >
    <slot />
  </svg>
</template>

<style scoped>
@import '../styles/animations.css';
</style>
