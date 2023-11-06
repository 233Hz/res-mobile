import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useTabBarStore = defineStore('tabBar', () => {
  const activeName = ref('index')
  const setActiveName = (name: string) => {
    activeName.value = name
  }
  return {
    activeName,
    setActiveName
  }
})
