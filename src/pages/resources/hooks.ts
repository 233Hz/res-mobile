import { computed, ref, watch } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
import { pageResourceApi } from '@/api/resource'
import { useResourceStoreHook } from '@/store/modules/resource'
import { columnTreeApi } from '@/api/column'
import { convertNode } from '@/utils/tree'
import { allCategoryApi } from '@/api/category'
import type { Resource } from 'types/resource'

export const useResources = () => {
  const resourceStore = useResourceStoreHook()
  const loading = ref(false)
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
        ...resourceStore.search
      })
      pagination.value.total = total
      resourceList.value = records
    } catch (error) {
      /* empty */
    } finally {
      loading.value = false
    }
  }

  const fetchColumnTree = async () => {
    const { data } = await columnTreeApi()
    resourceStore.columnOptions1 = convertNode(data, (item) => ({
      label: item.title,
      value: item.id
    }))
  }

  const fetchCategoryList = async () => {
    const { data } = await allCategoryApi()
    resourceStore.categoryOptions = data.map((item) => ({
      label: item.sortName as string,
      value: item.oid
    }))
  }

  const handleInputSearch = async (value: string | undefined) => {
    resourceStore.setSearch({ key: value }, true)
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
    () => resourceStore.search,
    async () => {
      await onFeatch()
    },
    {
      deep: true
    }
  )

  onLoad(async () => {
    await Promise.all([fetchColumnTree(), fetchCategoryList()])
    await onFeatch()
  })

  return {
    loading,
    pagination,
    hasNext,
    resourceList,
    handleInputSearch,
    handleScrollToLower
  }
}
