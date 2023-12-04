<script setup lang="ts">
import notify from '@/static/images/notify.png'
import { useNotify } from './hooks'

const { loading, notifyList, handleScrollToLower } = useNotify()
</script>

<template>
  <scroll-view
    scroll-y
    class="scroll-view"
    @scrolltolower="handleScrollToLower"
  >
    <GlEmpty v-if="!notifyList.length" text="暂无通知" />
    <view v-else class="scroll-content">
      <view class="item" v-for="item in notifyList" :key="item.oid">
        <navigator
          :url="`/pages/notify/details?id=${item.oid}`"
          hover-class="none"
          class="navigator"
        >
          <image
            :src="notify"
            mode="scaleToFill"
            class="image"
            hover-class="none"
          />
          <view class="item-right">
            <view class="title truncate">
              {{ item.title }}
            </view>
            <view class="info">
              <view class="info-left">
                <text class="issuer">{{ item.createUserName }}</text>
                <text class="time">{{ item.createTime }}</text>
              </view>
              <text class="icon-view">{{ item.viewNum }}</text>
            </view>
          </view>
        </navigator>
      </view>
      <view class="loading" v-show="loading">加载中...</view>
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
      margin-top: 20rpx;
      &:first-child {
        margin-top: 0;
      }

      .navigator {
        display: flex;
        gap: 20rpx;
        background-color: #fff;
        padding: 20rpx;
        border-radius: 12px;

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

    .loading,
    .no-more {
      height: 60rpx;
      line-height: 60rpx;
      width: 100%;
      text-align: center;
      font-size: 28rpx;
      color: #909399;
    }
  }
}
</style>
