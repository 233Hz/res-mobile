import { defineStore } from 'pinia'
import { ref } from 'vue'
import store from '@/store'
import { getPermissionApi, loginApi } from '@/api/login'
import { useAuthStoreHook } from './auth'

interface UserInfo {
  username: string
  roles: string[]
  permissions: string[]
}

export const useUserStore = defineStore(
  'user',
  () => {
    const user = ref<UserInfo>({
      username: '',
      roles: [],
      permissions: []
    })

    const loginByUsername = async (username: string, password: string) => {
      const { tokenInfo } = await loginApi({
        loginName: username,
        pwd: password
      })
      const { tokenName, tokenValue } = tokenInfo as TokenInfo
      useAuthStoreHook().setToken(tokenName, tokenValue)
      const {
        data: { userInfo, roleList }
      } = await getPermissionApi()
      user.value = {
        username: userInfo.userName,
        roles: roleList || [],
        permissions: []
      }
    }

    const logout = () => {
      useAuthStoreHook().clearToken()
      user.value = {
        username: '',
        roles: [],
        permissions: []
      }
    }

    return {
      user,
      loginByUsername,
      logout
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

export const useUserStoreHook = () => useUserStore(store)
