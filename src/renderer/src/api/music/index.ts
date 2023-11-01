import axios from 'axios'

export const musicApi = {
  MUSIC: () => {
    return new Promise((resolve) => {
      axios.get('/api/music').then((res) => {
        resolve(res.data)
      })
    })
  },
  LIKE: () => {
    return new Promise((resolve) => {
      axios.get('/api/like').then((res) => {
        resolve(res.data)
      })
    })
  }
}
