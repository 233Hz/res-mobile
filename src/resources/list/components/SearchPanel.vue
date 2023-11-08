<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'uni-mini-router'

const router = useRouter()

const search = ref({
  name: ''
})

const activeIndex = ref(0)
const tags = ['全部', '待审核', '审核中', '已下架', '未通过', '已发布']
</script>

<template>
  <view class="container">
    <view class="search-input">
      <view class="search-input__left">
        <label class="icon-search" />
        <input
          prefixIcon="search"
          :model="search.name"
          placeholder="搜索资源名称"
          class="input"
        />
      </view>
      <text class="icon-upload" @tap="router.push({ name: 'resUpload' })" />
    </view>
    <scroll-view scroll-x class="scroll-view hidden-scroll">
      <text
        class="tag-item"
        v-for="(item, index) in tags"
        :key="item"
        :class="{ active: activeIndex === index }"
        @tap="() => (activeIndex = index)"
      >
        {{ item }}
      </text>
    </scroll-view>
  </view>
</template>

<style scoped lang="scss">
.container {
  padding: 20rpx;
  .search-input {
    display: flex;
    align-items: center;
    gap: 20rpx;

    .search-input__left {
      flex: 1;
      padding: 20rpx;
      display: flex;
      align-items: center;
      gap: 20rpx;
      border-radius: 20px;
      border: #ddd solid 1px;

      .icon-search {
        font-size: 28rpx;
      }

      .input {
        flex: 1;
      }
    }

    .icon-upload {
      font-size: 60rpx;
    }
  }

  .scroll-view {
    margin-top: 20rpx;
    white-space: nowrap;

    .tag-item {
      display: inline-block;
      padding: 12rpx 24rpx;
      background-color: #fff;
      color: #212121;
      margin: 0 10rpx;
      font-size: 28rpx;
      font-weight: 500;
      border-radius: 20px;

      &:first-child {
        margin-left: 0;
      }

      &:last-child {
        margin-right: 0;
      }
    }

    .active {
      color: #4fb869;
      background-color: #d8f7e1;
    }
  }
}
</style>
