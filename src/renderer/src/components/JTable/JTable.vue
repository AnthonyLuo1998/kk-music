<script setup lang="ts">
import type { MusicProps } from '@renderer/store/modules/player/types'
import JContextMenu from '@renderer/components/JContextMenu/JContextMenu.vue'
import JIcon from '@renderer/components/JIcon/JIcon.vue'
import { useContextMenu } from '@renderer/components/JContextMenu/hook'
const props = defineProps({
  data: {
    type: Array<MusicProps>,
    required: true,
    default: []
  }
})

const emits = defineEmits(['play', 'add', 'download', 'options', 'like'])

const { contextMenuX, contextMenuY, showContextMenu } = useContextMenu()
</script>

<template>
  <div class="w-full h-full">
    <!-- header -->
    <div class="w-full text-12px flex justify-start items-center text-gray-400">
      <p class="w-40%">歌曲</p>
      <p class="w-20%">歌手</p>
      <p class="w-20%">专辑</p>
      <p class="w-20%">时长</p>
    </div>

    <!-- row -->
    <div v-if="data.length > 0" class="w-full text-13px">
      <div
        v-for="item in props.data"
        :key="item.id"
        class="w-full h-50px flex justify-start items-center music-row"
      >
        <!-- 歌曲 -->
        <div class="h-full flex justify-between items-center w-40%">
          <div
            class="w-60% whitespace-nowrap overflow-hidden text-ellipsis flex justify-start items-center gap-10px"
          >
            <j-icon v-if="item.isLike" :size="18" color="#ff4757" hover-color="#ff4757">
              <i class="i-solar:heart-angle-bold" @click="emits('like', item, false)"></i>
            </j-icon>

            <j-icon v-else :size="18" hover-color="#ff4757">
              <i class="i-solar:heart-angle-linear" @click="emits('like', item, true)"></i>
            </j-icon>

            <span class="text-12px">{{ item.name }}</span>
          </div>

          <div
            class="w-40% hidden justify-end items-center gap-10px mr-10px text-18px music-name-right"
          >
            <j-icon :size="18">
              <i class="i-solar:play-linear" @click="emits('play', item)"></i>
            </j-icon>

            <j-icon :size="18">
              <i
                class="i-solar:add-square-linear"
                @click="($event) => emits('add', $event, item)"
              ></i>
            </j-icon>

            <j-icon :size="18">
              <i class="i-solar:download-square-linear" @click="emits('download', item)"></i>
            </j-icon>

            <j-icon :size="18">
              <i class="i-solar:menu-dots-square-linear" @click="emits('options', item)"></i>
            </j-icon>
          </div>
        </div>

        <!-- 歌手 -->
        <div class="w-20% h-full flex justify-between items-center">
          <span>{{ item.author }}</span>
        </div>

        <!-- 专辑 -->
        <div class="w-20% h-full flex justify-between items-center">
          <span>{{ item.album }}</span>
        </div>

        <!-- 时长 -->
        <div class="w-20% h-full flex justify-between items-center">
          <span>{{ item.duration }}</span>
        </div>
      </div>
    </div>

    <!-- context menu -->
    <JContextMenu :visibility="showContextMenu" :x="contextMenuX" :y="contextMenuY"></JContextMenu>
  </div>
</template>

<style lang="less" scoped>
.music-name-right {
  i {
    cursor: pointer;
  }
  i:hover {
    color: #2ed573;
  }
}

.music-row:hover {
  background: rgba(245, 245, 245, 0.8);
  .music-name-right {
    display: flex;
  }
}
</style>
