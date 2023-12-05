import { defineStore } from 'pinia'
import { ref } from 'vue'
import store from '@/store'

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
type SearchForm = Partial<Search>

export const useResourceStore = defineStore('resource', () => {
  const search = ref<SearchForm>({
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

  const setSearch = (searchForm: SearchForm) => {
    if (searchForm.navId) {
      columnOptions2.value =
        columnOptions1.value.find((item) => item.value === searchForm.navId)
          ?.children || []
      columnOptions3.value = []
    }
    if (searchForm.secondNavId) {
      columnOptions3.value =
        columnOptions2.value.find(
          (item) => item.value === searchForm.secondNavId
        )?.children || []
    }
    search.value = Object.assign(search.value, searchForm)
  }

  return {
    search,
    orderOptions,
    columnOptions1,
    columnOptions2,
    columnOptions3,
    categoryOptions,
    setSearch
  }
})

export const useResourceStoreHook = () => useResourceStore(store)
