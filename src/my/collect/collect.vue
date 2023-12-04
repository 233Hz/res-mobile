<script setup lang="ts">
import { useResCollect } from './hooks'
import ResourceRowItem from '@/components/resource/ResourceRowItem.vue'

const { loading, resourceList, handleCollect, handleScrollToLower } =
  useResCollect()
</script>

<template>
  <view>
    <GlEmpty v-if="!resourceList.length" text="暂无下载资源" />
    <scroll-view
      v-else
      scroll-y
      class="scroll-view"
      @scrolltolower="handleScrollToLower"
    >
      <view class="list">
        <view class="item" v-for="item in resourceList" :key="item.oid">
          <ResourceRowItem :item="item">
            <template #extra>
              <view class="collect">
                <text
                  class="collect__btn icon-heart"
                  @tap.stop="handleCollect(item.oid, item.collectId)"
                >
                  取消收藏
                </text>
              </view>
            </template>
          </ResourceRowItem>
        </view>
        <view class="loading" v-show="loading">加载中...</view>
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
.scroll-view {
  height: 100%;

  .list {
    background-color: #fff;
    padding: 20rpx;

    .item {
      margin-top: 20rpx;

      &:first-child {
        margin-top: 0;
      }
    }
  }
}

.collect {
  text-align: right;

  &__btn {
    padding: 4rpx 10rpx;
    font-size: 28rpx;
    color: #fff;
    background-color: #f56c6c;
    border-radius: 6rpx;
  }
}
</style>
