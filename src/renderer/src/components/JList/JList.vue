<script setup lang="ts">
import { PropType } from 'vue'
import JAvatar from '../JAvatar/JAvatar.vue'
import JIcon from '../JIcon/JIcon.vue'
import type { MusicProps } from '@renderer/store/modules/player/types'
defineProps({
  modelValue: {
    type: Object as PropType<MusicProps | null>,
    default: null
  },
  data: {
    type: Array<MusicProps>,
    default: []
  },
  nodeId: {
    type: String,
    default: 'id'
  }
})

const emits = defineEmits(['update:modelValue', 'play', 'like', 'download', 'options'])
</script>

<template>
  <div class="list w-full h-full overflow-x-hidden overflow-overlay">
    <!-- list item -->
    <template v-if="data.length > 0 && modelValue">
      <div
        v-for="item in data"
        :key="item[nodeId]"
        class="list-item w-full h-60px hover:bg-[rgba(245,245,245,.8)] flex flex-row justify-between items-center pl-15px relative"
        :class="{ 'list-item-active': modelValue[nodeId] === item[nodeId] }"
      >
        <!-- cover & works & author -->
        <div class="w-60% flex items-center justify-start gap-10px">
          <j-avatar shape="square" size="36">
            <template #icon>
              <img src="../../assets/image/logo.jpeg" alt="" srcset="" />
            </template>
          </j-avatar>

          <div class="w-70% flex flex-col items-start justify-start">
            <span class="text-12px text-truncate w-full">{{ item.name }}</span>
            <span class="text-13px">{{ item.author }}</span>
          </div>
        </div>

        <!-- duration -->
        <div class="w-40% duration text-11px pr-20px relative top-6px box-border text-right">
          <span>{{ item.duration }}</span>
        </div>

        <!-- op -->
        <div class="op w-40% hidden justify-end items-center gap-10px pr-20px box-border">
          <j-icon :size="15" @click="emits('play', item)">
            <i class="i-solar:play-linear"></i>
          </j-icon>

          <j-icon :size="16" hover-color="#ff4757" @click="emits('like', item)">
            <i class="i-solar:heart-angle-linear"></i>
          </j-icon>

          <j-icon :size="16" @click="emits('download', item)">
            <i class="i-solar:download-square-linear" />
          </j-icon>

          <j-icon :size="16" @click="emits('options', item)">
            <i class="i-solar:menu-dots-square-linear" />
          </j-icon>
        </div>
      </div>
    </template>
  </div>
</template>

<style lang="less" scoped>
.list > div {
  border-bottom: 1px solid rgb(245, 245, 245);
}
.list > div:last-child {
  border-bottom: none;
}
.list-item-active {
  color: #2ed573;
}
.list-item-active::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  display: block;
  height: 100%;
  width: 2px;
  background: #2ed573;
}
.op {
  i {
    cursor: pointer;
  }
}

.list-item:hover {
  .duration {
    display: none;
  }
  .op {
    display: flex;
  }
}
</style>
