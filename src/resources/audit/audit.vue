<script setup lang="ts">
import Search from './search.vue'
import ResourcesList from '@/components/resource/ResourcesList.vue'
import { useResourceAudit } from './hooks'

const {
  loading,
  dataList,
  handleSearch,
  handlePass,
  handleRefuse,
  handleScrollToLower
} = useResourceAudit()
</script>

<template>
  <view class="viewport">
    <Search @on-search="handleSearch" />
    <scroll-view
      scroll-y
      class="scroll-view"
      @scrolltolower="handleScrollToLower"
    >
      <GlEmpty v-show="!dataList.length" text="暂无您的审核" />
      <ResourcesList
        :list="dataList"
        @on-pass="handlePass"
        @on-refuse="handleRefuse"
      />
      <view class="loading" v-show="loading">加载中...</view>
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
  }
}
</style>
