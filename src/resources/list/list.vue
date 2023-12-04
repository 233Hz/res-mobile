<script setup lang="ts">
import { useResourceList } from './hooks'
import Search from './search.vue'
import ResourcesList from '@/components/resource/ResourcesList.vue'

const {
  loading,
  dataList,
  handleSearch,
  handleEdit,
  handleDelete,
  handleRevoke,
  handleScrollToLower
} = useResourceList()
</script>

<template>
  <view class="viewport">
    <Search @on-search="handleSearch" />
    <scroll-view
      scroll-y
      class="scroll-view"
      @scrolltolower="handleScrollToLower"
    >
      <GlEmpty v-show="!dataList.length" text="没有符合条件的资源" />
      <ResourcesList
        :list="dataList"
        @on-update="handleEdit"
        @on-delete="handleDelete"
        @on-revoke="handleRevoke"
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

    .loading,
    .no-more {
      height: 60rpx;
      line-height: 60rpx;
      width: 100%;
      text-align: center;
    }
  }
}
</style>
