<script setup lang="ts">
import { formatDate } from '@/utils/util'
import { useResDown } from './hooks'
import ResourceRowItem from '@/components/resource/ResourceRowItem.vue'

const { loading, resourceList, handleScrollToLower } = useResDown()
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
              <view class="download-time">
                下载时间:
                {{
                  (item.downloadTime &&
                    formatDate(item.downloadTime.toString(), 'YYYY-MM-DD')) ||
                  '无'
                }}
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

.download-time {
  text-align: right;
  font-size: 24rpx;
  color: #999;
}
</style>
