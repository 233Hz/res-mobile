<script setup lang="ts">
import { useRouter } from 'uni-mini-router'

const router = useRouter()
const { safeAreaInsets } = uni.getSystemInfoSync()
</script>

<template>
  <view :style="{ paddingTop: safeAreaInsets?.top + 'px' }">
    <view class="list">
      <view class="list__group">
        <view class="list__group__item" @tap="() => router.push({ name: 'resList' })">
          资源列表
        </view>
        <view class="list__group__item" @tap="() => router.push({ name: 'resAudit' })">
          资源审核
        </view>
        <view class="list__group__item" @tap="() => router.push({ name: 'resUpload' })">
          上传资源
        </view>
      </view>
    </view>
  </view>
</template>

<style scoped lang="scss">
.list {
  padding: 30rpx 0;
  display: flex;
  flex-direction: column;
  gap: 30rpx;

  &__group {
    background-color: #fff;

    &__item {
      padding: 20rpx;
      height: 60rpx;
      line-height: 60rpx;
      font-size: 32rpx;
      font-weight: 400;
      color: #212121;
      position: relative;
      border-bottom: 1px solid #f7f7f7;

      &:last-child {
        border-bottom: none;
      }

      &:after {
        content: '\e668';
        font-family: 'iconfont' !important;
        position: absolute;
        right: 40rpx;
        top: 50%;
        transform: translateY(-50%);
      }
    }
  }
}
</style>
