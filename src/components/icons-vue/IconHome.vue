<script setup lang="ts">
import Icon, { IconProps } from '../Icon.vue';

defineProps<IconProps>();
</script>

<template>
  <Icon v-bind="$props">
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
    <polyline points="9 22 9 12 15 12 15 22" />
  </Icon>
</template>
