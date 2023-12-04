import { ref } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
import { allLinkApi } from '@/api/links'
import { resourceHotOrderApi, resourceNewOrderApi } from '@/api/resource'
import { allCategoryApi } from '@/api/category'
import { columnTreeApi } from '@/api/column'
import type { Resource } from 'types/resource'
import type { BannerItem, ColumnItem } from 'types/home'
import type { Category } from 'types/category'
import type { Notify } from 'types/notify'
import { notifyForHomeApi } from '@/api/notify'

export const useHome = () => {
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
    notifyList
  }
}
