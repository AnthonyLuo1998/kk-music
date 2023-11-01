export function getStore(item: string) {
  const data = window.localStorage.getItem(item)
  if (data) {
    return JSON.parse(data)
  } else {
    return null
  }
}

export function setStore(item: string, data: any) {
  window.localStorage.setItem(item, JSON.stringify(data))
}
