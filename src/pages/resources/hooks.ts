import { computed, ref, watch } from 'vue'
import { onLoad, onShow } from '@dcloudio/uni-app'
import { pageResourceApi } from '@/api/resource'
import type { Resource } from 'types/resource'
import { useResourceStoreHook } from '@/store/modules/resource'

export const useResources = () => {
  const loading = ref(false)
  const searchForm = ref<any>({
    key: void 0,
    order: 'v',
    navId: void 0,
    secondNavId: void 0,
    threeNavId: void 0,
    sortId: void 0
  })
  const pagination = ref({
    total: 0,
    current: 1,
    size: 9
  })
  const hasNext = computed(
    () =>
      pagination.value.current * pagination.value.size < pagination.value.total
  )
  const resourceList = ref<Resource[]>([])

  const onFeatch = async () => {
    loading.value = true
    try {
      const {
        data: { total, records }
      } = await pageResourceApi({
        current: pagination.value.current,
        size: pagination.value.size,
        ...searchForm.value
      })
      pagination.value.total = total
      resourceList.value = records
    } catch (error) {
      /* empty */
    } finally {
      loading.value = false
    }
  }

  const handleInputSearch = async (value: string) => {
    searchForm.value.key = value
    await onFeatch()
  }

  const handleScrollToLower = async () => {
    if (hasNext.value) {
      pagination.value.current++
      loading.value = true
      try {
        const {
          data: { records }
        } = await pageResourceApi({
          current: pagination.value.current,
          size: pagination.value.size
        })
        records.forEach((item) => resourceList.value.push(item))
      } catch (error) {
        /* empty */
      } finally {
        loading.value = false
      }
    }
  }

  watch(
    () => searchForm.value,
    async () => {
      await onFeatch()
    },
    {
      deep: true
    }
  )

  onLoad(async () => {
    await onFeatch()
  })

  onShow(() => {
    const { name, cid1, cid2, cid3, tid } = useResourceStoreHook().query
    searchForm.value.key = name
    searchForm.value.navId = cid1
    searchForm.value.secondNavId = cid2
    searchForm.value.threeNavId = cid3
    searchForm.value.sortId = tid
  })

  return {
    loading,
    searchForm,
    pagination,
    hasNext,
    resourceList,
    handleInputSearch,
    handleScrollToLower
  }
}
