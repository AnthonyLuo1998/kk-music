<script setup lang="ts">
import type { MusicProps } from '@renderer/store/modules/player/types'

import { musicApi } from '@renderer/api/music'
import JTable from '@renderer/components/JTable/JTable.vue'
import { usePlayerStore } from '@renderer/store/modules/player'
import { ref } from 'vue'

const playerStore = usePlayerStore()

const data = ref<MusicProps[]>([])

musicApi.LIKE().then((res: any) => {
  ;(res.data as MusicProps[]).map((el) => (el.isLike = true))
  data.value = res.data
})
</script>

<template>
  <div class="w-full h-full">
    <j-table
      :data="data"
      @play="playerStore.dibbleSeeding"
      @add="playerStore.addPlayList"
    ></j-table>
  </div>
</template>
