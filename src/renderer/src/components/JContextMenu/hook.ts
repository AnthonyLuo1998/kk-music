import { ref } from 'vue'

export function useContextMenu() {
  const showContextMenu = ref<boolean>(false)
  const contextMenuX = ref<number>(0)
  const contextMenuY = ref<number>(0)

  function outClick() {
    showContextMenu.value = false
    window.removeEventListener('click', outClick)
  }

  const onContextMenuClick = (e) => {
    if (showContextMenu.value) {
      showContextMenu.value = false
    } else {
      contextMenuX.value = e.clientX
      contextMenuY.value = e.clientY
      showContextMenu.value = true
      window.addEventListener('click', outClick)
    }
  }

  return {
    showContextMenu,
    contextMenuX,
    contextMenuY,
    onContextMenuClick
  }
}
