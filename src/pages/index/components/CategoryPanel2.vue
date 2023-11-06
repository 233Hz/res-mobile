<script setup lang="ts">
const formats = [
  {
    id: 1,
    format: 'word',
    iconUrl: 'https://img.icons8.com/color/100/word'
  },
  {
    id: 2,
    format: 'pdf',
    iconUrl: 'https://img.icons8.com/color/100/pdf'
  },
  {
    id: 3,
    format: 'ppt',
    iconUrl: 'https://img.icons8.com/color/100/ppt'
  },
  {
    id: 4,
    format: 'doc',
    iconUrl: 'https://img.icons8.com/color/100/doc'
  },
  {
    id: 5,
    format: 'mp4',
    iconUrl: 'https://img.icons8.com/color/100/video'
  },
  {
    id: 5,
    format: 'excel',
    iconUrl: 'https://img.icons8.com/color/100/xls'
  },
  {
    id: 5,
    format: 'image',
    iconUrl: 'https://img.icons8.com/color/100/image'
  }
]
</script>

<template>
  <view class="tab">
    <view class="tab__title">资源分类</view>
    <scroll-view scroll-x class="tab__scroll hidden-scroll">
      <view class="tab__scroll__wrap">
        <view class="tab__scroll__wrap__item" v-for="item in formats" :key="item.id">
          <image :src="item.iconUrl" mode="scaleToFill" class="tab__scroll__wrap__item__image" />
          <text class="tab__scroll__wrap__item__text">{{ item.format }}</text>
        </view>
      </view>
    </scroll-view>
  </view>
</template>

<style scoped lang="scss">
.tab {
  background-color: #fff;
  border-radius: 8px;
  padding: 20rpx;

  &__title {
    color: #121212;
    font-size: 30rpx;
    font-weight: 800;
    position: relative;
    padding-left: 20rpx;

    &::after {
      content: '';
      position: absolute;
      left: 0;
      top: 50%;
      transform: translateY(-50%);
      width: 8rpx;
      height: 60%;
      background-color: #4fb869;
      border-radius: 12px;
    }
  }

  &__scroll {
    margin-top: 20rpx;
    white-space: nowrap;

    &__wrap {
      display: flex;
      gap: 40rpx;

      &__item {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 10rpx;

        &__image {
          width: 100rpx;
          height: 100rpx;
          border-radius: 10px;
        }

        &__text {
          color: #121212;
          font-size: 28rpx;
          font-weight: bold;
          font-weight: 400;
        }
      }
    }
  }
}
</style>
