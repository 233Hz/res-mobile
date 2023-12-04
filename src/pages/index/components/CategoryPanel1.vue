<script setup lang="ts">
import { useRouter } from 'uni-mini-router'
import type { ColumnItem } from 'types/home'
import { useResourceStoreHook } from '@/store/modules/resource'

interface Props {
  list: ColumnItem[]
}

withDefaults(defineProps<Props>(), {
  list: () => []
})

const router = useRouter()
const handleTap = (id: number) => {
  useResourceStoreHook().SET_QUERY({ cid1: id })
  router.pushTab({ name: 'recCenter' })
}
</script>

<template>
  <view class="tab">
    <view class="tab__title">资源栏目</view>
    <scroll-view v-if="list.length" scroll-x class="tab__scroll hidden-scroll">
      <text
        class="tab-item"
        v-for="item in list"
        :key="item.id"
        @tap="handleTap(item.id)"
      >
        {{ item.title }}
      </text>
    </scroll-view>
    <view v-else class="tap__empty">暂无栏目</view>
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

    .tab-item {
      display: inline-block;
      text-align: center;
      color: #121212;
      font-size: 28rpx;
      font-weight: bold;
      border-right: #f7f7f7 solid 2px;
      padding: 0 20rpx;
      font-weight: 400;

      &:first-child {
        padding-left: 0;
      }

      &:last-child {
        border: none;
        padding-right: 0;
      }
    }
  }

  &__empty {
    height: 60rpx;
    line-height: 60rpx;
    text-align: center;
    color: #999;
  }
}
</style>
