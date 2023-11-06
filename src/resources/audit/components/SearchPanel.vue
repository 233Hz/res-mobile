<script setup lang="ts">
import { ref } from 'vue'

const search = ref({
  name: ''
})
</script>

<template>
  <view class="search">
    <view class="search-input">
      <label class="icon-search" />
      <input prefixIcon="search" :model="search.name" placeholder="搜索资源名称" class="input" />
    </view>
  </view>
</template>

<style scoped lang="scss">
.search {
  .search-input {
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
}
</style>
