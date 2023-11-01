import axios from 'axios'

export const userApi = {
  LOGIN: ({ username, password }) => {
    return axios.post('/api/login', { username, password })
  },
  USERINFO: () => {
    return axios.post('/api/userinfo')
  }
}
