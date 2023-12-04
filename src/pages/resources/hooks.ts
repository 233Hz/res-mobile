import { computed, ref, watch } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
import { pageResourceApi } from '@/api/resource'
import type { Resource } from 'types/resource'

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

  onLoad(async (options) => {
    console.log(options)

    await onFeatch()
  })

  watch(searchForm.value, async () => await onFeatch())
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
