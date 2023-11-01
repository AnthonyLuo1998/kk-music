<script setup lang="ts">
import type { MusicProps } from '@renderer/store/modules/player/types'

import { musicApi } from '@renderer/api/music'
import JTable from '@renderer/components/JTable/JTable.vue'
import { computed, ref } from 'vue'
import { usePlayerStore } from '@renderer/store/modules/player'
import { useUserStore } from '@renderer/store/modules/user'

const userStore = useUserStore()

const data = ref<MusicProps[]>([])

const playerStore = usePlayerStore()

const data2 = computed<MusicProps[]>(() => {
  return data.value.map((el) => {
    el.isLike = !!userStore.userInfo?.likes.includes(el.id)
    return el
  })
})

musicApi.MUSIC().then((res: any) => {
  data.value = res.data
})
</script>

<template>
  <div class="w-full h-full">
    <j-table
      :data="data2"
      @play="playerStore.dibbleSeeding"
      @add="playerStore.addPlayList"
    ></j-table>
  </div>
</template>
