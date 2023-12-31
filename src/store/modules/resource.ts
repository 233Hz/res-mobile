import { defineStore } from 'pinia'
import { ref } from 'vue'
import store from '@/store'
import { columnTreeApi } from '@/api/column'
import { convertNode } from '@/utils/tree'
import { allCategoryApi } from '@/api/category'

export interface Search {
  key: string
  order: string
  navId: number
  secondNavId: number
  threeNavId: number
  sortId: number
}
export interface LabelValue {
  label: string
  value: string | number
}
export interface LabelValueTree extends LabelValue {
  children?: LabelValueTree[]
}
type SearchData = Partial<Search>

export const useResourceStore = defineStore('resource', () => {
  const isInit = ref(false)
  const search = ref<SearchData>({
    key: void 0,
    order: 'v',
    navId: void 0,
    secondNavId: void 0,
    threeNavId: void 0,
    sortId: void 0
  })

  const orderOptions: LabelValue[] = [
    { label: '最新发布', value: 'v' },
    { label: '最多预览', value: 'd' }
  ]

  const columnOptions1 = ref<LabelValueTree[]>([])
  const columnOptions2 = ref<LabelValueTree[]>([])
  const columnOptions3 = ref<LabelValueTree[]>([])
  const categoryOptions = ref<LabelValue[]>([])

  const init = async () => {
    const { data: columnData } = await columnTreeApi()
    columnOptions1.value = convertNode(columnData, (item) => ({
      label: item.title,
      value: item.id
    }))
    const { data: categoryData } = await allCategoryApi()
    categoryOptions.value = categoryData.map((item) => ({
      label: item.sortName as string,
      value: item.oid
    }))
    isInit.value = true
  }

  const setSearch = (searchData: SearchData, merge = false) => {
    if (!merge) {
      if (!searchData.order) searchData.order = 'v'
    }
    const newSearch = merge
      ? Object.assign(search.value, searchData)
      : searchData
    console.log('newSearch', newSearch)

    if (newSearch.navId) {
      columnOptions2.value =
        columnOptions1.value.find((item) => item.value === newSearch.navId)
          ?.children || []
      columnOptions3.value = []
    } else {
      columnOptions2.value = []
      columnOptions3.value = []
      newSearch.secondNavId = void 0
      newSearch.threeNavId = void 0
    }
    if (newSearch.secondNavId) {
      columnOptions3.value =
        columnOptions2.value.find(
          (item) => item.value === newSearch.secondNavId
        )?.children || []
    } else {
      columnOptions3.value = []
      newSearch.threeNavId = void 0
    }
    search.value = newSearch
    console.log(search.value)
  }

  const resetSearch = () => {
    search.value = {
      key: void 0,
      order: 'v',
      navId: void 0,
      secondNavId: void 0,
      threeNavId: void 0,
      sortId: void 0
    }
  }

  return {
    isInit,
    search,
    orderOptions,
    columnOptions1,
    columnOptions2,
    columnOptions3,
    categoryOptions,
    init,
    setSearch,
    resetSearch
  }
})

export const useResourceStoreHook = () => {
  const resourceStore = useResourceStore(store)
  if (!resourceStore.isInit) resourceStore.init()
  return resourceStore
}
