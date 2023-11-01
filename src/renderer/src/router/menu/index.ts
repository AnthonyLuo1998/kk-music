import { constantRoutes } from '../routes'
import { RouteRecordRawPlus } from '../types'

export function generateMenu() {
  return constantRoutes.filter((r): RouteRecordRawPlus | void => {
    if (r.meta.isMenu) {
      return r
    }
  })
}
