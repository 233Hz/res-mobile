import { defineStore } from 'pinia'
import { ref } from 'vue'
import store from '@/store'

export const useAuthStore = defineStore(
  'Auth',
  () => {
    const tokenKey = ref<string>()
    const tokenValue = ref<string>()

    const setToken = (key: string, value: string) => {
      tokenKey.value = key
      tokenValue.value = value
    }

    const clearToken = () => {
      tokenKey.value = void 0
      tokenValue.value = void 0
    }

    const hasToken = () => !!tokenValue.value

    return {
      tokenKey,
      tokenValue,
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

export const useAuthStoreHook = () => useAuthStore(store)
