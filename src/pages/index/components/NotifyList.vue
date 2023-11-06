<script setup lang="ts">
import { useRouter } from 'uni-mini-router'

const router = useRouter()
</script>

<template>
  <view class="container">
    <view
      class="notify-item"
      v-for="item in 10"
      :key="item"
      @tap="router.push({ name: 'notifyDetails', params: { id: item + '' } })"
    >
      <view class="notify-item__title truncate">
        （转发）关于开展2023年上海市女大学生创新创业大赛的通知
      </view>
      <view class="notify-item__time">2023-11-10</view>
    </view>
  </view>
</template>

<style scoped lang="scss">
.container {
  padding: 20rpx;
  background-color: #fff;
  border-radius: 10rpx;
  display: flex;
  flex-direction: column;
  gap: 40rpx;

  .notify-item {
    display: flex;
    gap: 20rpx;

    &__title {
      font-size: 30rpx;
      font-weight: bold;
      flex: 1;
      overflow: hidden;
    }

    &__time {
      margin-top: 10rpx;
      font-size: 28rpx;
      color: #999;
    }
  }
}
</style>
