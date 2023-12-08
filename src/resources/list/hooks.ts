import { computed, ref } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
import { useRouter } from 'uni-mini-router'
import {
  delResourceApi,
  pageResourceAuthApi,
  revokeResourceApi
} from '@/api/resource'
import type { Resource } from 'types/resource'
import createPopup from '@/utils/popup'

export type Search = Partial<{
  name: string
  state: number
}>

export const useResourceList = () => {
  const router = useRouter()
  const loading = ref(false)
  const searchForm = ref<Search>({
    name: void 0,
    state: void 0
  })
  const pagination = ref({
    total: 0,
    current: 1,
    size: 10
  })

  const hasNext = computed(
    () =>
      pagination.value.current * pagination.value.size < pagination.value.total
  )

  const dataList = ref<Resource[]>([])
  const onFetch = async () => {
    loading.value = true
    try {
      const {
        data: { total, records }
      } = await pageResourceAuthApi({
        current: pagination.value.current,
        size: pagination.value.size,
        ...searchForm.value
      })
      pagination.value.total = total
      dataList.value = records
    } catch (error) {
      /* empty */
    } finally {
      loading.value = false
    }
  }

  const handleSearch = (value: Search) => {
    searchForm.value = value
    onFetch()
  }

  const handleTagChange = (value: number | undefined) => {
    searchForm.value.state = value
    onFetch()
  }

  const handleEdit = (id: number) => {
    console.log(id)
    router.push({ name: 'resUpload', params: { id: id + '' } })
  }

  const handleDelete = (id: number) => {
    createPopup({
      type: 'error',
      content: '是否要删除该资源',
      onConfirm: async () => {
        await delResourceApi([id])
        uni.showToast({ title: '删除成功', icon: 'success' })
        onFetch()
      }
    })
  }

  const handleRevoke = async (id: number) => {
    createPopup({
      type: 'error',
      content: '是否要下架该资源',
      onConfirm: async () => {
        await revokeResourceApi([id])
        uni.showToast({ title: '下架成功', icon: 'success' })
        onFetch()
      }
    })
  }

  const handleScrollToLower = async () => {
    if (hasNext.value) {
      pagination.value.current++
      loading.value = true
      try {
        const {
          data: { records }
        } = await pageResourceAuthApi({
          current: pagination.value.current,
          size: pagination.value.size,
          ...searchForm.value
        })
        records.forEach((item) => dataList.value?.push(item))
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
    dataList,
    hasNext,
    handleSearch,
    handleTagChange,
    handleEdit,
    handleDelete,
    handleRevoke,
    handleScrollToLower
  }
}
