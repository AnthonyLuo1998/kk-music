<template>
  <div
    class="avatar"
    :class="[props.shape]"
    :style="{ width: `${size}`, margin: `0px ${props.gap}px` }"
  >
    <slot name="icon"></slot>
  </div>
</template>

<script setup lang="ts">
import { computed, type PropType } from 'vue'
type SizeOptions = 'small' | 'large' | 'default'
type ShapeOptions = 'circle' | 'square'

const props = defineProps({
  size: {
    type: String as PropType<SizeOptions | string>,
    default: 'default'
  },
  shape: {
    type: String as PropType<ShapeOptions>,
    default: 'circle'
  },
  gap: {
    type: Number,
    default: 0
  }
})

const size = computed(() => {
  switch (props.size) {
    case 'large':
      return '40px'
    case 'small':
      return '24px'
    case 'default':
      return '32px'
    default:
      return props.size + 'px'
  }
})
</script>

<style lang="less" scoped>
.avatar {
  aspect-ratio: 1/1;
  overflow: hidden;
}
.circle {
  border-radius: 50%;
}
</style>
