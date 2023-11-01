<template>
  <div class="w-full h-full">
    <JProgress
      v-model="player.currentTime"
      :progress="player.duration"
      :disabled="!player.music"
      :load="player.progress"
      @move-end="player.changePlayerProgressByMove"
      @move-start="player.setIsMove"
    ></JProgress>
    <div class="w-full h-[calc(100%-20px)] flex justify-center px-20px box-border">
      <!-- music desc -->
      <div class="desc h-50px w-30% flex items-center gap-10px">
        <j-avatar size="large" shape="square">
          <template #icon>
            <img src="../../assets/image/logo.jpeg" alt="" srcset="" />
          </template>
        </j-avatar>

        <div class="flex flex-col gap-6px">
          <span class="text-12px"
            >{{ player.music?.name || 'KK 音乐' }} -
            <span class="text-gray-500">{{ player.music?.author || '听觉盛宴' }}</span></span
          >
          <div class="flex justify-start items-center gap-10px">
            <i
              class="i-solar:download-square-linear"
              :class="[player.isPlayListEmptied ? 'op-btn-d-16px' : 'op-btn-16px']"
            />
            <i
              class="i-solar:notification-unread-lines-linear"
              :class="[player.isPlayListEmptied ? 'op-btn-d-16px' : 'op-btn-16px']"
            />
            <i
              class="i-solar:menu-dots-square-linear"
              :class="[player.isPlayListEmptied ? 'op-btn-d-16px' : 'op-btn-16px']"
            />
          </div>
        </div>
      </div>

      <!-- music operator -->
      <div class="operator h-50px flex justify-center items-center gap-16px flex-1">
        <!-- like -->
        <j-icon :size="20" :disabled="player.isPlayListEmptied" hover-color="#ff4757">
          <i class="i-solar:heart-angle-linear" />
        </j-icon>

        <!-- previous -->
        <j-icon
          :size="20"
          :disabled="player.isPlayListEmptied"
          color="#1e272e"
          @click="player.playPrevious"
        >
          <i class="i-solar:skip-previous-bold" />
        </j-icon>

        <!-- play -->

        <j-icon
          :size="44"
          color="#2ed573"
          :disabled="player.isPlayListEmptied"
          @click="player.toggleAudio"
        >
          <i :class="[status]" />
        </j-icon>

        <!-- next -->
        <j-icon
          :size="20"
          color="#1e272e"
          :disabled="player.isPlayListEmptied"
          @click="player.playNext"
        >
          <i class="i-solar:skip-next-bold" />
        </j-icon>

        <!-- play mode -->
        <j-icon :size="20" @click="player.setPlayMode(((player.playMode + 1) % 3) as any)">
          <i :class="[modeIcon]" />
        </j-icon>
      </div>

      <!-- music relation -->
      <div class="relation h-50px w-30% flex justify-center items-center text-gray-500 gap-18px">
        <!-- time -->
        <span class="text-12px text-right w-50%">
          {{ formatTime(player.currentTime || 0) }} / {{ formatTime(player.duration || 0) }}
        </span>

        <!-- volumn -->
        <j-popover>
          <div class="w-36px h-170px flex flex-col items-center justify-center gap-10px box-border">
            <div class="h-100px">
              <j-volume-progress v-model="player.volume" :progress="1"></j-volume-progress>
            </div>
            <span class="w-full text-10px text-center border-b-1 border-b-gray-200 border-b-solid">
              {{ Math.round(player.volume * 100) }}%
            </span>
            <j-icon :size="18">
              <i :class="[volumeIcon]" @click="player.muteVolume" />
            </j-icon>
          </div>
          <template #reference>
            <j-icon :size="18">
              <i :class="[volumeIcon]" />
            </j-icon>
          </template>
        </j-popover>

        <!-- music words -->
        <j-icon :size="14">
          <template #title>词</template>
        </j-icon>

        <!-- music list -->
        <div class="flex justify-center items-center">
          <j-icon :size="21" @click="onShowDrawerClick">
            <i class="i-solar:playlist-minimalistic-2-linear" />
          </j-icon>
          <span class="text-10px">{{ player.playListNumber }}</span>
        </div>
      </div>

      <!-- drawer -->
      <j-drawer v-model="showDrawer">
        <template #content>
          <div class="w-full h-full box-border">
            <!-- header -->
            <div
              class="w-full h-70px pl-15px pr-20px box-border flex flex-col items-start justify-center"
            >
              <span class="text-20px">播放列表</span>
              <div class="w-full text-12px flex justify-between items-center text-gray-500">
                <span>共{{ player.playListNumber || 0 }}首歌曲</span>
                <div class="flex justify-start items-center gap-20px">
                  <j-icon :gap="2">
                    <i class="i-solar:checklist-linear" />
                    <template #title>批量操作</template>
                  </j-icon>
                  <j-icon @click="player.clearPlayList">
                    <i class="i-solar:trash-bin-minimalistic-linear" />
                    <template #title>清空</template>
                  </j-icon>
                </div>
              </div>
            </div>
            <!-- list -->
            <div class="w-full h-[calc(100%-70px)]">
              <j-list
                v-model="player.music"
                :data="player.playList"
                node-id="id"
                @play="player.dibbleSeeding"
              />
            </div>
          </div>
        </template>
      </j-drawer>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import JAvatar from '@renderer/components/JAvatar/JAvatar.vue'
import JDrawer from '@renderer/components/JDrawer/JDrawer.vue'
import JList from '@renderer/components/JList/JList.vue'
import JProgress from '@renderer/components/JProgress/JProgress.vue'
import JPopover from '@renderer/components/JPopover/JPopover.vue'
import JVolumeProgress from '@renderer/components/JVolumeProgress/JVolumeProgress.vue'
import JIcon from '@renderer/components/JIcon/JIcon.vue'

import { formatTime } from '@renderer/utils'
import { usePlayerStore } from '@renderer/store/modules/player'
import { useDrawer } from '@renderer/components/JDrawer/hook'

const player = usePlayerStore()

const { showDrawer, onShowDrawerClick } = useDrawer()

// 播放暂停图标
const status = computed(() => {
  if (player.playStatus) {
    return 'i-solar:pause-circle-bold'
  } else {
    return 'i-solar:play-circle-bold'
  }
})

// 模式图标
const modeIcon = computed(() => {
  switch (player.playMode) {
    case 0:
      return 'i-solar:repeat-linear'
    case 1:
      return 'i-solar:repeat-one-linear'
    case 2:
      return 'i-solar:shuffle-linear'
    default:
      return 'i-solar:repeat-linear'
  }
})

//音量图标
const volumeIcon = computed(() => {
  if (player.volume !== 0) {
    return 'i-solar:volume-loud-linear'
  } else {
    return 'i-solar:volume-cross-linear'
  }
})
</script>

<style lang="less" scoped></style>
