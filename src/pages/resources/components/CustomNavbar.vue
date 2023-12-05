<script setup lang="ts">
import { useResourceStore } from '@/store/modules/resource'

interface EmitEvent {
  (e: 'search'): void
}
const emit = defineEmits<EmitEvent>()
const { safeAreaInsets } = uni.getSystemInfoSync()
const resourceStore = useResourceStore()
const handleSearch = () => emit('search')
</script>

<template>
  <view
    :style="{ paddingTop: safeAreaInsets?.top + 'px' }"
    style="background-color: #fff"
  >
    <view class="navbar">
      <view class="navbar__search">
        <text class="icon-search" />
        <input
          v-model="resourceStore.search.key"
          class="search-input"
          placeholder="关键词搜索"
        />
      </view>
      <view class="navbar__button" @tap="handleSearch">
        <text class="text">搜索</text>
      </view>
    </view>
  </view>
</template>

<style scoped lang="scss">
.navbar {
  padding: 20rpx;
  display: flex;
  align-items: center;
  gap: 20rpx;

  &__search {
    flex: 1;
    position: relative;

    .icon-search {
      position: absolute;
      top: 0;
      left: 30rpx;
      height: 100%;
      font-size: 32rpx;
      display: flex;
      align-items: center;
    }

    .search-input {
      padding: 10rpx 20rpx 10rpx 80rpx;
      border: 1px solid #ccc;
      border-radius: 20px;
    }
  }

  &__button {
    flex-shrink: 0;
    padding-right: 20rpx;

    .text {
      font-size: 32rpx;
      font-weight: 400;
      color: #909399;
    }
  }
}
</style>
