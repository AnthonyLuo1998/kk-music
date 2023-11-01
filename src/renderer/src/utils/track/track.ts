import './track.less'
export function createTrackAnimation(e: MouseEvent, target: { x: number; y: number }) {
  const originInfo = { x: e.clientX, y: e.clientY }
  const dom = document.createElement('div')
  dom.classList.add('j-track-node')
  dom.style.top = `${e.clientY}px`
  dom.style.left = `${e.clientX}px`
  document.body.appendChild(dom)

  const newspaperSpinning = [
    {
      transform: `translate(${target.x - originInfo.x}px, ${target.y - originInfo.y}px) scale(0.2)`,
      opacity: 0.2
    }
  ]

  const newspaperTiming = {
    duration: 1000,
    iterations: 1
  }

  dom.animate(newspaperSpinning, newspaperTiming)

  setTimeout(() => {
    document.body.removeChild(dom)
  }, 1000)
}
