<script lang="ts" setup>
import { ref, watchEffect } from 'vue'

const props = defineProps({
  modelValue: {
    type: Number,
    default: 0
  },
  progress: {
    type: Number,
    default: 0
  },
  load: {
    type: Number,
    default: 0
  },
  disabled: {
    type: Boolean,
    default: true
  }
})

const emits = defineEmits(['update:modelValue', 'moveEnd', 'moveStart'])

const realBar = ref<HTMLDivElement>()

const fakeBar = ref<HTMLDivElement>()

const isMove = ref<boolean>(false)

watchEffect(() => {
  if (realBar.value && !isMove.value) {
    updateProgress(props.modelValue / props.progress)
  }
})

const move = (e: MouseEvent) => {
  if (fakeBar.value) {
    const fakeBarInfo = fakeBar.value.getBoundingClientRect()

    // 已经移动的距离
    const span = e.clientX - fakeBarInfo.left

    // 转换成百分比分数
    let p = span / fakeBarInfo.width
    p > 1 && (p = 1)
    p < 0 && (p = 0)

    // 计算当前所在位置的秒数
    const s = Math.round(p * props.progress)

    // 修改双向绑定秒数
    emits('update:modelValue', s)

    // 修改宽度
    updateProgress(p)
  }
}

// 移动结束
const moveEnd = () => {
  isMove.value = false
  // 生命周期：拖拽结束
  emits('moveEnd')
  window.removeEventListener('mousemove', move)
  window.removeEventListener('mouseup', moveEnd)
}

// 移动开始
const moveStart = () => {
  if (props.disabled) return
  isMove.value = true
  // 生命周期：拖拽开始
  emits('moveStart', true)
  window.addEventListener('mousemove', move)
  window.addEventListener('mouseup', moveEnd)
}

// 点击跳转
function moveByClick(e: MouseEvent) {
  if (realBar.value && fakeBar.value && !props.disabled) {
    const fakeBarInfo = fakeBar.value.getBoundingClientRect()
    const p = (e.clientX - fakeBarInfo.left) / fakeBarInfo.width
    emits('update:modelValue', p * props.progress)
    updateProgress(p)
    emits('moveEnd')
  }
}

// 修改进度
function updateProgress(percentage: number) {
  if (realBar.value) {
    if (percentage) {
      realBar.value.style.width = `${percentage * 100}%`
    } else {
      realBar.value.style.width = `0%`
    }
  }
}
</script>

<template>
  <div class="w-full h-20px flex items-center progress" @click="moveByClick">
    <div ref="fakeBar" class="w-full h-2px bg-[rgba(222,222,222,0.9)] relative">
      <div ref="realBar" class="h-2px bg-#2ed573 absolute top-0 left-0">
        <div
          rer="movePoinit"
          class="w-6px h-6px hidden border-rounded-50% bg-#2ed573 absolute top-50% translate-y--50% right--3px move-pointer"
          @mousedown="moveStart"
        ></div>
      </div>
      <div
        ref="loadBar"
        class="h-2px bg-[rgba(46,213,115,.3)] absolute top-0 left-0"
        :style="{ width: `${load}%` }"
      ></div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.progress:hover {
  .move-pointer {
    display: block;
  }
}
</style>
