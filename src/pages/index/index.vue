<script setup lang="ts">
import { ref } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
import type { BannerItem } from '@/types/home'
import CustomNavbar from './components/CustomNavbar.vue'
import TabPanel from './components/TabPanel.vue'
import CategoryPanel1 from './components/CategoryPanel1.vue'
import CategoryPanel2 from './components/CategoryPanel2.vue'
import RecommendList from './components/RecommendList.vue'
import HotList from './components/HotList.vue'
import NotifyList from './components/NotifyList.vue'
import FilterDrawer from './components/FilterDrawer.vue'

const bannerList = ref<BannerItem[]>([])
const mockFetchBannerData = (): Promise<BannerItem[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const random = Math.floor(Math.random() * 20) + 1
      const data = Array.from({ length: 10 }).map((_, index) => {
        return {
          id: random + index,
          imgUrl: `https://picsum.photos/400/200/?${random + index}`,
          hrefUrl: '/pages/my/index'
        }
      })
      resolve(data)
    }, 1000)
  })
}
const getBannerData = async () => {
  const data = await mockFetchBannerData()
  bannerList.value = data
}

const activeTabIndex = ref(0)
const tabChangeHandler = (index: number) => {
  activeTabIndex.value = index
}

const tabFilterClickHandler = (index: number) => {
  filterRef.value?.open()
}

const filterRef = ref<InstanceType<typeof FilterDrawer>>()

onLoad(async () => {
  await getBannerData()
})
</script>

<template>
  <view class="viewport">
    <!-- 导航栏 -->
    <CustomNavbar />
    <!-- 滚动区域 -->
    <scroll-view scroll-y class="scroll-view">
      <view class="wrap">
        <!-- 轮播图 -->
        <GlSwiper :list="bannerList" />
        <!-- 一级栏目分类 -->
        <CategoryPanel1 />
        <!-- 资源格式分类 -->
        <CategoryPanel2 />
        <!-- 选项卡 -->
        <TabPanel
          :active-index="activeTabIndex"
          @change="tabChangeHandler"
          @filter-click="tabFilterClickHandler"
        />
        <!-- 列表 -->
        <RecommendList v-if="activeTabIndex === 0" />
        <HotList v-else-if="activeTabIndex === 1" />
        <NotifyList v-else-if="activeTabIndex === 2" />
        <FilterDrawer ref="filterRef" />
      </view>
    </scroll-view>
  </view>
</template>

<style>
page {
  height: 100%;
  overflow: hidden;
}
</style>

<style scoped lang="scss">
.viewport {
  height: 100%;
  display: flex;
  flex-direction: column;

  .scroll-view {
    flex: 1;
    overflow: hidden;
    height: 100%;

    .wrap {
      position: relative;
      padding: 20rpx;
      display: flex;
      flex-direction: column;
      gap: 20rpx;
    }
  }
}
</style>
