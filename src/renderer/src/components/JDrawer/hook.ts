import { ref } from 'vue'

export function useDrawer() {
  const showDrawer = ref<boolean>(false)

  const onShowDrawerClick = () => {
    showDrawer.value = true
  }

  return {
    showDrawer,
    onShowDrawerClick
  }
}
