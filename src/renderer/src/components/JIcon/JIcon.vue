<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps({
  gap: {
    type: Number,
    default: 0
  },
  size: {
    type: Number,
    default: 12
  },
  color: {
    type: String,
    default: '#7f8c8d'
  },
  hoverColor: {
    type: String,
    default: '#2ed573'
  },
  disabled: {
    type: Boolean,
    default: false
  }
})

const customStyle = computed(() => {
  return {
    '--icon-hover-color': props.hoverColor,
    '--icon-color': props.color,
    '--icon-font-size': `${props.size}px`,
    '--icon-gap': `${props.gap}px`
  }
})
</script>

<template>
  <div class="icon" :class="{ 'icon-disabled': disabled }" :style="customStyle">
    <slot></slot>
    <slot name="title"></slot>
  </div>
</template>

<style lang="less" scoped>
.icon {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: var(--icon-gap);
  color: var(--icon-color);
  font-size: var(--icon-font-size);
  cursor: pointer;
}

.icon:hover {
  color: var(--icon-hover-color);
}

.icon-disabled {
  color: #bdc3c7;
  pointer-events: none;
}
</style>
