import { computed, ref } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
import { pageResourceForDownApi } from '@/api/resource'
import type { Resource } from 'types/resource'

export const useResDown = () => {
  const loading = ref(false)
  const pagination = ref({
    total: 0,
    current: 1,
    size: 10
  })
  const resourceList = ref<Resource[]>([])
  const hasNext = computed(
    () =>
      pagination.value.current * pagination.value.size < pagination.value.total
  )
  const onFeatch = async () => {
    loading.value = true
    try {
      const {
        data: { total, records }
      } = await pageResourceForDownApi({
        current: pagination.value.current,
        size: pagination.value.size
      })
      pagination.value.total = total
      resourceList.value = records
    } catch (error) {
      /* empty */
    } finally {
      loading.value = false
    }
  }
  const handleScrollToLower = async () => {
    if (hasNext.value) {
      pagination.value.current++
      loading.value = true
      try {
        const {
          data: { records }
        } = await pageResourceForDownApi({
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
  onLoad(async () => {
    await onFeatch()
  })

  return {
    loading,
    hasNext,
    resourceList,
    handleScrollToLower
  }
}
