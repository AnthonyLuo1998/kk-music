import axios from 'axios'

export function setupAxios() {
  axios.defaults.baseURL = import.meta.env.RENDERER_VITE_BASE_URL || ''
}
