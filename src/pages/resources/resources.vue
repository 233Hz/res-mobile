<script setup lang="ts">
import IndexPanel from './components/IndexPanel.vue'
</script>

<template>
  <view class="viewport">
    <scroll-view scroll-y class="scroll-view">
      <IndexPanel />
      <view class="content">
        <view class="item" v-for="item in 30" :key="item">
          <navigator url="/resources/preview/preview" hover-class="none">
            <view class="cover">
              <image
                :src="`https://picsum.photos/400/400/?${item}`"
                mode="scaleToFill"
                class="image"
              />
              <text class="icon-view">200</text>
            </view>
            <view class="title truncate">纸片式矮凳—计划书.pdf</view>
            <view class="info">
              <view class="time truncate"> 2023-01-01</view>
              <view class="icon-collect" />
            </view>
          </navigator>
        </view>
      </view>
    </scroll-view>
  </view>
</template>

<style>
page {
  height: 100%;
  overflow: hidden;
}
</style>

<style scoped lang="scss">
.viewport {
  height: 100%;
  display: flex;
  flex-direction: column;

  .scroll-view {
    flex: 1;
    overflow: hidden;

    .content {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 20rpx;
      padding: 20rpx;
      overflow: hidden;

      .item {
        overflow: hidden;

        .cover {
          position: relative;
          width: 100%;
          height: 280rpx;
          border-radius: 12px;
          overflow: hidden;

          &::before {
            content: '';
            position: absolute;
            width: 100%;
            height: 100%;
            background: linear-gradient(
              180deg,
              transparent 70%,
              rgba(0, 0, 0, 0.5) 100%
            );
            z-index: 20;
          }

          .image {
            width: 100%;
            height: 100%;
            z-index: 10;
          }

          .icon-view {
            position: absolute;
            right: 10rpx;
            bottom: 10rpx;
            font-size: 28rpx;
            color: #fff;
            font-weight: 300;
            z-index: 30;
          }
        }

        .title {
          font-size: 32rpx;
          color: #303133;
          font-weight: bold;
          margin-top: 10rpx;
        }

        .info {
          margin-top: 20rpx;
          display: flex;
          align-items: flex-end;
          gap: 20rpx;

          .time {
            flex: 1;
            font-size: 24rpx;
            color: #909399;
          }

          .icon-collect {
            font-size: 32rpx;
          }
        }
      }
    }
  }
}
</style>
