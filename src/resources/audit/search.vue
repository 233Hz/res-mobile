<script setup lang="ts">
import { ref } from 'vue'
import type { Search } from './hooks'

interface EmitEvent {
  (e: 'on-search', search: Search): void
}

const emit = defineEmits<EmitEvent>()

const search = ref({
  name: void 0
})

const onSearch = () => emit('on-search', search.value)
</script>

<template>
  <view class="search">
    <view class="search-input">
      <label class="icon-search" />
      <input
        prefixIcon="search"
        :model="search.name"
        placeholder="搜索资源名称"
        class="input"
      />
    </view>
    <text class="search-text" @tap="onSearch">搜索</text>
  </view>
</template>

<style scoped lang="scss">
.search {
  width: 100%;
  display: flex;
  align-items: center;

  .search-input {
    flex: 1;
    padding: 20rpx;
    display: flex;
    align-items: center;
    gap: 20rpx;
    margin: 20rpx;
    border-radius: 20px;
    border: #ddd solid 1px;

    .icon-search {
      font-size: 28rpx;
    }

    .input {
      flex: 1;
    }
  }

  .search-text {
    font-size: 28rpx;
    margin-right: 20rpx;
    flex-shrink: 0;
  }
}
</style>
