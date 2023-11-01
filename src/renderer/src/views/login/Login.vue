<script setup lang="ts">
import JAvatar from '@renderer/components/JAvatar/JAvatar.vue'
import JIcon from '@renderer/components/JIcon/JIcon.vue'

import { useUserStore } from '@renderer/store/modules/user'
import { useAppStore } from '@renderer/store/modules/app'
import { reactive } from 'vue'

const appStore = useAppStore()

const userStore = useUserStore()

const loginForm = reactive({
  username: '',
  password: ''
})

const login = async () => {
  try {
    const userInfo = await userStore.login(loginForm)
    if (userInfo) {
      // message
      appStore.isShowLoginPage = false
    }
  } catch (error) {
    // 错误处理&错误上报
  }
}
</script>

<template>
  <Transition>
    <div
      v-if="appStore.isShowLoginPage"
      class="w-100vw h-100vh flex justify-center items-center bg-transparent fixed z-2000"
    >
      <div
        class="form w-470px h-350px shadow-md bg-white rounded-md border border-#e4e7ed border-solid flex flex-col items-center"
      >
        <div class="w-full h-32px flex items-center justify-end pr-10px box-border">
          <j-icon :size="18" @click="appStore.closeLoginPage">
            <i class="i-solar:close-circle-linear"></i>
          </j-icon>
        </div>

        <div class="w-300px flex flex-col justify-center items-center gap-10px">
          <p class="text-18px">密码登录</p>

          <!-- logo -->
          <div class="w-300px flex justify-center items-center gap-10px">
            <j-avatar>
              <template #icon><img src="../../assets/image/logo.jpeg" alt="" srcset="" /></template>
            </j-avatar>
            <span>KK 音乐</span>
          </div>

          <input
            v-model="loginForm.username"
            type="text"
            class="h-32px w-full border-#e4e7ed border border-solid outline-none rounded-sm pl-20px box-border"
            placeholder="用户名"
          />
          <input
            v-model="loginForm.password"
            type="password"
            class="h-32px w-full border-#e4e7ed border border-solid outline-none rounded-sm pl-20px box-border"
            placeholder="密码"
          />

          <div
            class="w-full h-32px line-height-32px text-center rounded-md bg-#1e90ff text-white cursor-pointer"
            @click="login"
          >
            登录
          </div>
        </div>
        <div></div>
      </div>
    </div>
  </Transition>
</template>

<style lang="less" scoped>
.form input::placeholder {
  color: #a4b0be;
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
