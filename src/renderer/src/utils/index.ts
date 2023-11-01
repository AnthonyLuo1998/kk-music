export function formatTime(time) {
  const minutes = Math.floor(time / 60)
  const seconds = Math.floor(time % 60)
  return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`
}

export function throttle(func: (...args) => any, delay: number) {
  let lastTime = 0
  return function (...args: []) {
    const now = Date.now()
    if (now - lastTime >= delay) {
      // eslint-disable-next-line prefer-spread
      func.apply(null, args)
      lastTime = now
    }
  }
}
