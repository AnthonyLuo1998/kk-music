import type { App } from 'vue'
import { createWebHashHistory, createRouter } from 'vue-router'
import { constantRoutes } from './routes'

export const router = createRouter({
  history: createWebHashHistory(),
  routes: constantRoutes as any
})

export function setupRouter(app: App) {
  app.use(router)
}
