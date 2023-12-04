import { computed, ref } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
import { getNotifyByIdApi, notifyPageApi } from '@/api/notify'
import type { Notify } from 'types/notify'

export const useNotify = () => {
  const loading = ref(false)
  const pagination = ref({
    total: 0,
    current: 1,
    size: 10
  })
  const hasNext = computed(
    () =>
      pagination.value.current * pagination.value.size < pagination.value.total
  )
  const notifyList = ref<Notify[]>([])
  const onFeatch = async () => {
    loading.value = true
    try {
      const {
        data: { total, records }
      } = await notifyPageApi({
        current: pagination.value.current,
        size: pagination.value.size
      })
      pagination.value.total = total
      notifyList.value = records
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
        } = await notifyPageApi({
          current: pagination.value.current,
          size: pagination.value.size
        })
        records.forEach((item) => notifyList.value.push(item))
      } catch (error) {
        /* empty */
      } finally {
        loading.value = false
      }
    }
  }

  onLoad(() => {
    onFeatch()
  })

  return {
    loading,
    notifyList,
    hasNext,
    pagination,
    handleScrollToLower
  }
}

export const useNotifyDetail = () => {
  const id = ref<number>()
  const data = ref<Notify>()

  const onFetch = async () => {
    const { data: obj } = await getNotifyByIdApi(id.value as number)
    data.value = obj
  }

  onLoad(async (options) => {
    if (options && options.id) {
      id.value = options.id
      await onFetch()
    }
  })

  return {
    data
  }
}
