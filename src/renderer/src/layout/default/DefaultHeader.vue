<template>
  <div class="header w-full h-full flex justify-between items-center px-36px">
    <!-- left -->
    <div class="h-full flex flex-row items-center gap-44px">
      <!-- go & back -->
      <div class="text-24px text-gray-500 flex flex-row gap-10px">
        <i class="i-solar:round-alt-arrow-left-linear cursor-pointer no-drag"></i>

        <i class="i-solar:round-alt-arrow-right-linear cursor-pointer no-drag"></i>

        <i class="i-solar:refresh-circle-linear cursor-pointer no-drag"></i>
      </div>
      <!-- search -->
      <div
        class="h-32px w-200px line-height-30px bg-[rgba(222,222,222,.8)] text-center rd-20px flex items-center justify-start text-12px gap-4px box-border pl-20px"
      >
        <i class="i-solar:magnifer-linear cursor-pointer no-drag" @click="onSearch"></i>
        <input
          ref="searchRef"
          type="text"
          class="border-none outline-none no-drag bg-[rgba(255,255,255,0)] text-12px w-140px text-gray-500 mt-2px"
          placeholder="搜索音乐"
          @input="onInput"
        />
        <i
          v-if="isShowClear"
          class="i-solar:close-circle-broken cursor-pointer no-drag"
          @click="onClear"
        ></i>
      </div>
    </div>

    <!-- right -->
    <div class="h-full flex flex-row items-center justify-start gap-18px text-18px text-gray-500">
      <!-- avatar -->
      <div
        class="h-full flex justify-center items-center gap-8px no-drag"
        @click="app.openLoginPage"
      >
        <j-avatar size="28">
          <template #icon>
            <img :src="user.userInfo?.avatar || defaultAvatar" alt="" srcset="" />
          </template>
        </j-avatar>
        <span class="text-12px text-black no-drag">{{ user.userInfo?.username || '未登录' }}</span>
      </div>

      <!-- email -->
      <i class="i-solar:menu-dots-circle-linear no-drag"></i>

      <!-- theme -->
      <i class="i-solar:panorama-linear no-drag"></i>

      <!-- minify -->
      <i class="i-solar:minimize-square-3-linear no-drag"></i>

      <!-- setting -->
      <i class="i-solar:settings-minimalistic-linear no-drag"></i>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import JAvatar from '@renderer/components/JAvatar/JAvatar.vue'
import { useAppStore } from '@renderer/store/modules/app'
import { useUserStore } from '@renderer/store/modules/user'
import defaultAvatar from '@renderer/assets/image/avatar.jpeg'

const app = useAppStore()
const user = useUserStore()

const isShowClear = ref<boolean>(false)
const searchRef = ref<HTMLInputElement>()

function onInput(e: any) {
  isShowClear.value = e.target.value !== ''
}

function onClear() {
  if (searchRef.value) {
    searchRef.value.value = ''
    isShowClear.value = false
  }
}

function onSearch() {
  console.log('search')
}
</script>

<style lang="less" scoped>
.header {
  i {
    cursor: pointer;
  }
}
</style>
