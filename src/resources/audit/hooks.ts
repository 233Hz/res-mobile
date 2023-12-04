import { computed, ref } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
import { pageAuditForMeApi, auditPassRefuseApi } from '@/api/resource'
import type { Resource } from 'types/resource'
import createPopup from '@/utils/popup'

export type Search = Partial<{
  name: string
}>

export const useResourceAudit = () => {
  const loading = ref(false)
  const searchForm = ref<Search>({
    name: void 0
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
      } = await pageAuditForMeApi({
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

  const handlePass = (id: number) => {
    createPopup({
      mode: 'input',
      title: '是否要通过该资源',
      placeholder: '请输入通过原因',
      onConfirm: async (value) => {
        await auditPassRefuseApi({
          idList: [id],
          auditResult: 1,
          auditNote: value + ''
        })
        uni.showToast({ title: '通过成功', icon: 'success' })
        onFetch()
      }
    })
  }

  const handleRefuse = async (id: number) => {
    createPopup({
      mode: 'input',
      title: '是否要拒绝该资源',
      placeholder: '请输入拒绝原因',
      onConfirm: async (value) => {
        await auditPassRefuseApi({
          idList: [id],
          auditResult: 2,
          auditNote: value + ''
        })
        uni.showToast({ title: '拒绝成功', icon: 'success' })
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
        } = await pageAuditForMeApi({
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
    handlePass,
    handleRefuse,
    handleScrollToLower
  }
}
