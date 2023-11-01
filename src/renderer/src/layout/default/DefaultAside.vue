<template>
  <div class="w-full h-full">
    <!-- logo -->
    <div class="w-full h-80px flex items-end ml-36px drag">
      <j-avatar :gap="6" size="28">
        <template #icon>
          <img src="../../assets/image/logo.jpeg" alt="" srcset="" />
        </template>
      </j-avatar>
      <span class="text-16px font-medium">KK音乐</span>
    </div>
    <!-- menu -->
    <div class="w-full h-[calc(100%-80px)] overflow-x-hidden overflow-auto box-border px-20px">
      <j-menu v-for="item in menu" :key="item.path" :data="item" @click="onMenuClick" />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { RouteRecordRawPlus } from '@renderer/router/types'

import { ref } from 'vue'
import JAvatar from '@renderer/components/JAvatar/JAvatar.vue'
import JMenu from '../components/JMenu/JMenu.vue'
import { generateMenu } from '@renderer/router/menu'
import { useUserStore } from '@renderer/store/modules/user'
import { useAppStore } from '@renderer/store/modules/app'
import { useRouter } from 'vue-router'
import { hasPermission } from '@renderer/router/utils'

const menu = ref<RouteRecordRawPlus[]>(generateMenu())

const router = useRouter()

const userStore = useUserStore()

const appStore = useAppStore()

const onMenuClick = (item: RouteRecordRawPlus) => {
  const userRoles = userStore.userInfo?.roles || []
  const routerRoles = item.meta.roles || []

  if (hasPermission(userRoles, routerRoles)) {
    router.push(item.path)
  } else if (userRoles.length === 0) {
    appStore.openLoginPage()
  }
}
</script>
