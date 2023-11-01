<script setup lang="ts">
defineProps({
  modelValue: {
    type: Boolean,
    default: false
  }
})

const emits = defineEmits(['update:modelValue', 'click'])
</script>

<template>
  <div
    v-if="modelValue"
    class="no-drag w-100vw h-100vh fixed top-0 left-0"
    @click="emits('click', false)"
  ></div>
</template>
