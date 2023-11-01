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
  }
})

const emits = defineEmits(['update:modelValue', 'moveEnd', 'moveStart'])

const realBar = ref<HTMLDivElement>()

const fakeBar = ref<HTMLDivElement>()

const isMove = ref<boolean>(false)

watchEffect(() => {
  if (realBar.value) {
    console.log('hello:', props.modelValue)
    realBar.value.style.height = `${(props.modelValue / props.progress) * 100}%`
  }
})

const move = (e: MouseEvent) => {
  if (realBar.value && fakeBar.value) {
    const fakeBarInfo = fakeBar.value.getBoundingClientRect()
    // 已经移动的距离
    const span = fakeBarInfo.top + fakeBarInfo.height - e.clientY

    // 转换成百分比分数
    let p = span / fakeBar.value.clientHeight

    // 限制百分数
    p > 1 && (p = 1)
    p < 0 && (p = 0)

    // 计算当前所在位置的进度
    const s = +(p * props.progress).toFixed(2)

    // 修改双向绑定
    emits('update:modelValue', s)
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
  isMove.value = true
  // 生命周期：拖拽开始
  emits('moveStart')
  window.addEventListener('mousemove', move)
  window.addEventListener('mouseup', moveEnd)
}

// 鼠标滚动
function onWheel(event: WheelEvent) {
  event.preventDefault() // 阻止默认的滚动行为
  // 滚轮方向的正负值
  const delta = Math.sign(event.deltaY)
  // 精度到1
  const curProgress = +props.modelValue.toFixed(2)
  // 每次走百分之1
  const step = props.progress * 0.01

  if (delta === 1 && curProgress <= props.progress - step) {
    emits('update:modelValue', curProgress + step)
  } else if (delta === -1 && curProgress >= step) {
    emits('update:modelValue', curProgress - step)
  }
}
</script>

<template>
  <div class="h-full w-20px box-border flex justify-center items-center" @wheel="onWheel">
    <div ref="fakeBar" class="w-3px h-full bg-[rgba(222,222,222,.8)] border-rounded relative">
      <div ref="realBar" class="absolute w-3px bottom-0 left-0 bg-#2ed573 border-rounded">
        <div
          ref="move"
          class="move-pointer"
          :class="[isMove ? 'cursor-grabbing' : 'cursor-grab']"
          @mousedown="moveStart"
        ></div>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.move-pointer {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #2ed573;
  position: absolute;
  top: -4px;
  left: 50%;
  transform: translateX(-50%);
}
</style>
