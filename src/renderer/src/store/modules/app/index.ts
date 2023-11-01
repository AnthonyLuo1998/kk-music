import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAppStore = defineStore('app', () => {
  const isShowLoginPage = ref<boolean>(false)

  function closeLoginPage() {
    isShowLoginPage.value = false
  }

  function openLoginPage() {
    isShowLoginPage.value = true
  }

  return {
    isShowLoginPage,
    openLoginPage,
    closeLoginPage
  }
})
