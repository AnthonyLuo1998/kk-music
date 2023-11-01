import 'virtual:uno.css'
import '@unocss/reset/sanitize/sanitize.css'
import '@unocss/reset/sanitize/assets.css'
import './styles/index.css'

import { createApp } from 'vue'
import { setupRouter } from './router'
import { setupGuard } from './router/guard'
import { setupStore } from './store'
import { setupMock } from './mocks'
import { setupAxios } from './api/request'
import { setupApiGuard } from './api/request/guard'
import App from './App.vue'

function bootstrap() {
  const app = createApp(App)

  setupMock()

  setupAxios()

  setupApiGuard()

  setupStore(app)

  setupGuard()

  setupRouter(app)

  app.mount('#app')
}

bootstrap()
