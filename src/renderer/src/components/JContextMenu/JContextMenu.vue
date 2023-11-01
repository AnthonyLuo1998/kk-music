<script setup lang="ts">
const props = defineProps({
  visibility: {
    type: Boolean,
    default: false
  },
  x: {
    type: Number,
    default: 0
  },
  y: {
    type: Number,
    default: 0
  }
})
</script>

<template>
  <Transition>
    <div
      v-if="props.visibility"
      class="shadow-md bg-[rgb(245,245,245)] w-160px h-300px fixed popup z-10"
      :style="{ top: `${props.y}px`, left: `${props.x}px` }"
    ></div>
  </Transition>
</template>

<style lang="less" scoped>
/* we will explain what these classes do next! */
.v-enter-active,
.v-leave-active {
  transition: opacity 0.2s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
