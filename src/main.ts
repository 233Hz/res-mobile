import { createSSRApp } from 'vue'
import App from './App.vue'
import pinia from './store'
import router from './router'
import globalDirective from './directives'
import './permission'
import './style/index.scss'
import './style/font.scss'

export function createApp() {
  const app = createSSRApp(App)
  app.use(pinia)
  app.use(router)
  app.use(globalDirective)
  return {
    app
  }
}
