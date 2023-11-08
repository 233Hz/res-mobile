import type { App } from 'vue'
import { useUserStore } from '@/store'

export const permission = (app: App) => {
  app.directive('permission', {
    mounted(el, binding) {
      const userStore = useUserStore()
      if (!userStore.info.roles.includes(binding.value))
        el.style.display = 'none'
    }
  })
}
