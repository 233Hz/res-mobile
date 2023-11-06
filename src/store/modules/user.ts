import type { UserInfo } from '@/types/user'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUserStore = defineStore(
  'user',
  () => {
    const token = ref<string | undefined>('asdas')
    const setToken = (value: string) => (token.value = value)
    const clearToken = () => (token.value = void 0)
    const hasToken = () => !!token.value

    const info = ref<UserInfo>({
      username: '',
      roles: [],
      permissions: []
    })
    return {
      token,
      info,
      setToken,
      clearToken,
      hasToken
    }
  },
  {
    // 配置持久化
    persist: {
      // 调整为兼容多端的API
      storage: {
        setItem(key, value) {
          uni.setStorageSync(key, value)
        },
        getItem(key) {
          return uni.getStorageSync(key)
        }
      }
    }
  }
)
