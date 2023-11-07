<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'uni-mini-router'

const router = useRouter()

const { safeAreaInsets } = uni.getSystemInfoSync()
const searchValue = ref('')
</script>

<template>
  <view :style="{ paddingTop: safeAreaInsets?.top + 'px' }" style="background-color: #fff">
    <view class="navbar">
      <view class="search">
        <text class="icon-search" />
        <input class="search-input" v-model="searchValue" placeholder="关键词搜索" />
      </view>
      <image
        v-permission="'admin'"
        class="image"
        src="@/static/images/backstage.png"
        mode="scaleToFill"
        @tap="router.push({ name: 'resManagement' })"
      />
    </view>
  </view>
</template>

<style scoped lang="scss">
.navbar {
  padding: 20rpx;
  display: flex;
  align-items: center;
  gap: 20rpx;

  .search {
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

  .image {
    width: 64rpx;
    height: 64rpx;
  }
}
</style>
