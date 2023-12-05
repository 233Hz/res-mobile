<script setup lang="ts">
import { ref } from 'vue'
import { useHome } from './hooks'
import CustomNavbar from './components/CustomNavbar.vue'
import TabPanel from './components/TabPanel.vue'
import CategoryPanel1 from './components/CategoryPanel1.vue'
import CategoryPanel2 from './components/CategoryPanel2.vue'
import RecommendList from './components/RecommendList.vue'
import HotList from './components/HotList.vue'
import NotifyList from './components/NotifyList.vue'
import FilterDrawer from './components/FilterDrawer.vue'

const navbarRef = ref<InstanceType<typeof CustomNavbar>>()

const {
  bannerList,
  columnList,
  categoryList,
  newsList,
  hotList,
  notifyList,
  handleSearch,
  handleRegister
} = useHome(navbarRef)

const activeTabIndex = ref(0)
const tabChangeHandler = (index: number) => {
  activeTabIndex.value = index
}

const tabFilterClickHandler = (index: number) => {
  console.log(index)

  filterRef.value?.open()
}

const filterRef = ref<InstanceType<typeof FilterDrawer>>()
</script>

<template>
  <view class="viewport">
    <!-- 导航栏 -->
    <CustomNavbar
      ref="navbarRef"
      @on-search="handleSearch"
      @on-register="handleRegister"
    />
    <!-- 滚动区域 -->
    <scroll-view scroll-y class="scroll-view">
      <view class="wrap">
        <!-- 轮播图 -->
        <GlSwiper :list="bannerList" />
        <!-- 一级栏目分类 -->
        <CategoryPanel1 :list="columnList" />
        <!-- 资源格式分类 -->
        <CategoryPanel2 :list="categoryList" />
        <!-- 选项卡 -->
        <TabPanel
          :active-index="activeTabIndex"
          @change="tabChangeHandler"
          @filter-click="tabFilterClickHandler"
        />
        <!-- 列表 -->
        <RecommendList v-if="activeTabIndex === 0" :list="newsList" />
        <HotList v-else-if="activeTabIndex === 1" :list="hotList" />
        <NotifyList v-else-if="activeTabIndex === 2" :list="notifyList" />
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
types/home
