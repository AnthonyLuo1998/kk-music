<script setup lang="ts">
defineProps({
  modelValue: {
    type: Boolean,
    default: false
  }
})

const emits = defineEmits(['update:modelValue'])
</script>

<template>
  <!-- cover -->
  <div
    v-if="modelValue"
    class="no-drag w-100vw h-100vh fixed top-0 left-0"
    @click="emits('update:modelValue', false)"
  ></div>
  <Transition>
    <div
      v-if="modelValue"
      class="no-drag w-320px h-full fixed top-0 right-0 bg-white shadow-md z-10"
    >
      <slot name="content"></slot>
    </div>
  </Transition>
</template>

<style lang="less" scoped>
/* we will explain what these classes do next! */
.v-enter-active,
.v-leave-active {
  transition: transform 0.4s ease;
}

.v-enter-from,
.v-leave-to {
  transform: translateX(320px);
}
</style>
