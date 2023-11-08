<script setup lang="ts">
import { useRouter } from 'uni-mini-router'

const router = useRouter()
</script>

<template>
  <scroll-view scroll-y class="scroll-view">
    <view class="scroll-content">
      <view
        class="item"
        v-for="item in 20"
        :key="item"
        @tap="router.push({ name: 'notifyDetails', params: { id: item + '' } })"
      >
        <image
          src="https://picsum.photos/200"
          mode="scaleToFill"
          class="image"
          hover-class="none"
        />
        <view class="item-right">
          <view class="title truncate"
            >关于开展2023年上海市女大学生创新创业大赛的通知</view
          >
          <view class="info">
            <view class="info-left">
              <text class="issuer">POHO运营</text>
              <text class="time">2023-01-01</text>
            </view>
            <text class="icon-view">200</text>
          </view>
        </view>
      </view>
    </view>
  </scroll-view>
</template>

<style scoped lang="scss">
page {
  height: 100%;
  overflow: hidden;
}

.scroll-view {
  height: 100%;

  .scroll-content {
    padding: 20rpx;

    .item {
      display: flex;
      gap: 20rpx;
      background-color: #fff;
      padding: 20rpx;
      border-radius: 12px;
      margin-top: 20rpx;

      &:first-child {
        margin-top: 0;
      }

      .image {
        width: 100rpx;
        height: 100rpx;
        border-radius: 12px;
      }

      .item-right {
        flex: 1;
        overflow: hidden;

        .title {
          font-size: 30rpx;
          color: #212121;
          font-weight: bold;
        }

        .info {
          margin-top: 20rpx;
          display: flex;
          justify-content: space-between;
          align-items: center;

          .info-left {
            font-size: 28rpx;
            font-weight: 400;
            color: #909399;
            .time {
              margin-left: 20rpx;
            }
          }

          .icon-view {
            font-size: 24rpx;
          }
        }
      }
    }
  }
}
</style>
