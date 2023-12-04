import { defineStore } from 'pinia'
import { ref } from 'vue'
import store from '@/store'

type ResourceQuery = Partial<{
  name: string
  cid1: number
  cid2: number
  cid3: number
  tid: number
}>

export const useResourceStore = defineStore('resource', () => {
  const query = ref<ResourceQuery>({})

  const SET_QUERY = (params: ResourceQuery) => {
    query.value = params
  }

  return {
    query,
    SET_QUERY
  }
})

export const useResourceStoreHook = () => useResourceStore(store)
