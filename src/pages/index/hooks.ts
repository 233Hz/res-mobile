import { ref, type Ref } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
import { useRouter } from 'uni-mini-router'
import { useResourceStoreHook } from '@/store/modules/resource'
import { allLinkApi } from '@/api/links'
import { resourceHotOrderApi, resourceNewOrderApi } from '@/api/resource'
import { allCategoryApi } from '@/api/category'
import { columnTreeApi } from '@/api/column'
import { notifyForHomeApi } from '@/api/notify'
import type { Resource } from 'types/resource'
import type { BannerItem, ColumnItem } from 'types/home'
import type { Category } from 'types/category'
import type { Notify } from 'types/notify'
import type CustomNavbar from './components/CustomNavbar.vue'

export const useHome = (
  navbarRef: Ref<InstanceType<typeof CustomNavbar> | undefined>
) => {
  const router = useRouter()
  const resourceStore = useResourceStoreHook()
  const searchForm = ref({
    order: void 0
  })
  // 轮播图
  const bannerList = ref<BannerItem[]>([])
  const fetchBannerList = async () => {
    const { data } = await allLinkApi()
    bannerList.value = data.map((item) => ({
      id: item.oid,
      imgUrl: item.linkPic || '',
      hrefUrl: item.linkUrl || '#'
    }))
  }
  // 栏目分类
  const columnList = ref<ColumnItem[]>([])
  const fetchColumnList = async () => {
    const { data } = await columnTreeApi()
    columnList.value = data.map((item) => ({
      id: item.id,
      title: item.title
    }))
  }
  // 资源分类
  const categoryList = ref<Category[]>([])
  const fetchCategoryList = async () => {
    const { data } = await allCategoryApi()
    categoryList.value = data
  }
  // 最新资源
  const newsList = ref<Resource[]>([])
  const fetchNewsList = async () => {
    const { data } = await resourceNewOrderApi()
    newsList.value = data
  }
  // 最热资源
  const hotList = ref<Resource[]>([])
  const fetchHotList = async () => {
    const { data } = await resourceHotOrderApi()
    hotList.value = data
  }
  // 通知
  const notifyList = ref<Notify[]>([])
  const fetchNotifyList = async () => {
    const { data } = await notifyForHomeApi()
    notifyList.value = data
  }
  // 搜索
  const handleSearch = (value: string | undefined) => {
    resourceStore.setSearch({ key: value })
    navbarRef.value?.clearSearch()
    router.pushTab({ name: 'resCenter' })
  }
  // 注册
  const handleRegister = () => router.push({ name: 'register' })

  onLoad(async () => {
    await Promise.all([
      fetchBannerList(),
      fetchColumnList(),
      fetchCategoryList(),
      fetchNewsList(),
      fetchHotList(),
      fetchNotifyList()
    ])
  })
  return {
    searchForm,
    bannerList,
    columnList,
    categoryList,
    newsList,
    hotList,
    notifyList,
    handleSearch,
    handleRegister
  }
}
