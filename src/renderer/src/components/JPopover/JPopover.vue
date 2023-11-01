<template>
  <j-cover v-model="isShow" @click="onClick"></j-cover>
  <div class="relative flex items-center">
    <!-- buttom -->
    <div class="flex items-center" @click="onClick">
      <slot name="reference"></slot>
    </div>

    <!-- popover -->
    <Transition>
      <div
        v-if="isShow"
        class="popover absolute top-0% left-50% translate-x--50% translate-y-[calc(-100%+-10px)] bg-white shadow-md border-rounded"
      >
        <slot class="default"></slot>
        <span
          class="arrow w-10px h-10px absolute bottom-0 left-50% translate-x--50% translate-y-50% z--1"
        ></span>
      </div>
    </Transition>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import JCover from '../JCover/JCover.vue'

const isShow = ref<boolean>(false)

const onClick = () => {
  isShow.value = !isShow.value
}
</script>

<style lang="less" scoped>
.popover {
  border: 1px solid #e4e7ed;
}

.arrow::before {
  content: '';
  display: block;
  position: absolute;
  background: white;
  bottom: 0;
  left: 0;
  width: 10px;
  height: 10px;
  z-index: -1;
  transform: rotate(45deg);
  border-top-color: transparent !important;
  border-left-color: transparent !important;
  border: 1px solid #e4e7ed;
}

.v-enter-active,
.v-leave-active {
  transition: all 0.2s;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
