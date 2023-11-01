import type { InternalAxiosRequestConfig, AxiosResponse } from 'axios'
import axios from 'axios'
import { getStore } from '@renderer/utils/localStore'
export function setupApiGuard() {
  // 请求拦截
  axios.interceptors.request.use(
    (value: InternalAxiosRequestConfig<any>) => {
      const token = getStore('token')
      if (value.data) {
        value.data = { ...value.data, token }
      } else {
        value.data = { token }
      }
      return value
    },
    (err) => {
      return err
    }
  )

  // 响应拦截
  axios.interceptors.response.use(
    (value: AxiosResponse<any, any>) => {
      return value
    },
    (err) => {
      return err
    }
  )
}
