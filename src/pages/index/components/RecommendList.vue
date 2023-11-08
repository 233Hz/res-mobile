<script setup lang="ts">
import { useRouter } from 'uni-mini-router'

const router = useRouter()
</script>

<template>
  <view class="list">
    <view
      class="list__item"
      v-for="item in 20"
      :key="item"
      @tap="router.push({ path: '/resources/preview/preview' })"
    >
      <image
        src="https://picsum.photos/200"
        mode="scaleToFill"
        class="list__item__image"
      />
      <view class="list__item__content">
        <view class="list__item__content__title">
          <text class="list__item__content__title__tag">pdf</text>
          这是一段很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长的标题
        </view>
        <view class="list__item__content-user-count">
          <view><text class="icon-user" />张三</view>
          <view><text class="icon-view" />200</view>
        </view>
      </view>
    </view>
  </view>
</template>

<style scoped lang="scss">
.list {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 10rpx;

  &__item {
    background-color: #fff;
    overflow: hidden;
    border-radius: 10px;
    display: flex;
    flex-direction: column;

    &__image {
      width: 100%;
      height: 200rpx;
    }

    &__content {
      padding: 10rpx;

      &__title {
        font-size: 30rpx;
        font-weight: bold;
        color: #212121;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
        text-overflow: ellipsis;
        line-height: 40rpx;

        &__tag {
          padding: 4rpx 8rpx;
          font-size: 24rpx;
          color: #4fb869;
          border: #4fb869 1px solid;
          border-radius: 4px;
          margin-right: 10rpx;
          text-transform: uppercase;
        }
      }

      &-user-count {
        margin-top: 14rpx;
        font-size: 24rpx;
        color: #999;
        font-weight: 100;
        display: flex;
        gap: 20rpx;

        .icon-user,
        .icon-view {
          margin-right: 10rpx;
        }
      }
    }
  }
}
</style>
