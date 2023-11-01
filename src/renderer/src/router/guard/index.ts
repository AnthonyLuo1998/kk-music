import { router } from '../'
export function setupGuard() {
  router.beforeEach((_to, _from, next) => {
    next()
  })
}
