<script setup lang="ts">
import { useResources } from './hooks'
import CustomNavbar from './components/CustomNavbar.vue'
import IndexPanel from './components/IndexPanel.vue'

const {
  loading,
  searchForm,
  resourceList,
  handleInputSearch,
  handleScrollToLower
} = useResources()
</script>

<template>
  <view class="viewport">
    <!-- 导航栏 -->
    <CustomNavbar @search="handleInputSearch" />
    <scroll-view
      scroll-y
      class="scroll-view"
      @scrolltolower="handleScrollToLower"
    >
      <IndexPanel v-model="searchForm" />
      <GlEmpty v-show="!resourceList.length" text="没有符合条件的资源" />
      <view class="content">
        <view class="item" v-for="item in resourceList" :key="item.oid">
          <navigator
            :url="`/resources/preview/preview?id=${item.oid}`"
            hover-class="none"
          >
            <view class="cover">
              <image :src="item.resCover" mode="scaleToFill" class="image" />
              <text class="icon-view">
                <span>{{ item.viewNum }}</span>
              </text>
            </view>
            <view class="title truncate">{{ item.resName }}</view>
            <view class="info">
              <view class="time truncate"> {{ item.createTime }}</view>
              <view class="icon-collect" />
            </view>
          </navigator>
        </view>
      </view>
      <view class="loading" v-show="loading">加载中...</view>
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
  background-color: #fff;

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
    .loading,
    .no-more {
      height: 60rpx;
      line-height: 60rpx;
      width: 100%;
      text-align: center;
    }
  }
}
</style>
