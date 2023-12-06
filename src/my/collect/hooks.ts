import { computed, ref } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
import { collectResourceApi, pageResourceForCollectApi } from '@/api/resource'
import type { Resource } from 'types/resource'

export const useResCollect = () => {
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
  const onFetch = async () => {
    loading.value = true
    try {
      const {
        data: { total, records }
      } = await pageResourceForCollectApi({
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

  const handleCollect = async (id: number, cid: number) => {
    const { msg } = await collectResourceApi({
      resId: id,
      collectId: cid
    })
    uni.showToast({ title: msg, icon: 'success' })
    await onFetch()
  }

  const handleScrollToLower = async () => {
    if (hasNext.value) {
      pagination.value.current++
      loading.value = true
      try {
        const {
          data: { records }
        } = await pageResourceForCollectApi({
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
    await onFetch()
  })

  return {
    loading,
    hasNext,
    resourceList,
    handleCollect,
    handleScrollToLower
  }
}
