<script setup lang="ts"></script>

<template>
  <view class="container">
    <view class="hot__item" v-for="item in 10" :key="item">
      <image
        :src="`https://picsum.photos/200/150/?${item}`"
        mode="scaleToFill"
        class="hot__item__image"
      />
      <view class="hot__item__right">
        <view class="hot__item__right__title">
          <text class="hot__item__right__title__tag">pdf</text>
          这是一段很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长的标题
        </view>
        <view class="hot__item__right__user-count">
          <text class="user"><text class="icon-user" /> 张三</text>
          <text class="count"><text class="icon-view" /> 10000+</text>
        </view>
      </view>
    </view>
  </view>
</template>

<style scoped lang="scss">
.container {
  padding: 20rpx;
  background-color: #fff;
  border-radius: 10rpx;

  .hot__item {
    padding: 20rpx 0;
    border-bottom: #f7f7f7 solid 1px;
    display: flex;
    gap: 20rpx;

    &:last-child {
      border: none;
    }

    &__image {
      width: 200rpx;
      height: 150rpx;
      border-radius: 8px;
    }

    &__right {
      flex: 1;
      overflow: hidden;
      display: flex;
      flex-direction: column;
      justify-content: space-between;

      &__title {
        font-size: 30rpx;
        font-weight: bold;
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

      &__user-count {
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
