import type { UserInfoProps } from './types'

import { defineStore } from 'pinia'
import { ref } from 'vue'
import { userApi } from '@renderer/api/user'
import { setStore } from '@renderer/utils/localStore'

export const useUserStore = defineStore('user', () => {
  const userInfo = ref<UserInfoProps>()
  const token = ref<string | undefined>(undefined)

  function setToken(_token: string) {
    token.value = _token
    setStore('token', _token)
  }

  // api
  async function login(userinfo: any) {
    try {
      const { data } = await userApi.LOGIN(userinfo)
      const { token: t } = data.data
      token.value = t
      setToken(t)
      return beforeLogin()
    } catch (error) {
      return Promise.reject(error)
    }
  }

  async function getUserInfo(): Promise<UserInfoProps> {
    const { data } = await userApi.USERINFO()
    return data.data as UserInfoProps
  }

  async function beforeLogin() {
    if (!token.value) return
    const res = await getUserInfo()
    userInfo.value = res
    return res
  }

  return {
    userInfo,
    token,
    login
  }
})
