<script setup lang="ts">
import { ref } from 'vue'

const content = ref("<h1 style='color: red'>这是一段内容<span>")
</script>

<template>
  <view class="container">
    <view class="title">
      通知标题通知标题通知标题通知标题通知标题通知标题通知标题通知标题通知标题
    </view>
    <view class="info">
      <text><text class="icon-user" />POHO运营</text>
      <text><text class="icon-time" />2023-10-11</text>
      <text><text class="icon-view" />999+</text>
    </view>
    <view class="content" v-html="content" />
  </view>
</template>

<style scoped lang="scss">
.container {
  padding: 20rpx;

  .title {
    font-size: 36rpx;
    font-weight: bold;
    color: #212121;
  }

  .info {
    margin-top: 20rpx;
    font-size: 24rpx;
    font-weight: 100;
    color: #999;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 20rpx;

    .icon-user,
    .icon-time,
    .icon-view {
      margin-right: 10rpx;
    }
  }
  .content {
    margin-top: 20rpx;
  }
}
</style>
