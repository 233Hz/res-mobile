<script setup lang="ts">
import type { Notify } from 'types/notify'

interface Props {
  list: Notify[]
}

withDefaults(defineProps<Props>(), {
  list: () => []
})
</script>

<template>
  <view>
    <GlEmpty v-if="!list.length" text="暂无通知公告" />
    <view v-else class="list">
      <navigator
        v-for="item in list"
        :key="item.oid"
        :url="`/pages/notify/details?id=${item.oid}`"
        hover-class="none"
        class="notify-item"
      >
        <view class="notify-item__title truncate">
          {{ item.title }}
        </view>
        <view class="notify-item__time">{{ item.createTime }}</view>
      </navigator>
    </view>
  </view>
</template>

<style scoped lang="scss">
.list {
  padding: 20rpx;
  background-color: #fff;
  border-radius: 10rpx;

  .notify-item {
    height: 100rpx;
    line-height: 100rpx;
    margin-bottom: 20rpx;
    border-bottom: #f6f6f6 solid 1px;
    display: flex;
    gap: 20rpx;

    &:last-child {
      border-bottom: none;
      margin-bottom: 0;
    }

    &__title {
      font-size: 30rpx;
      font-weight: bold;
      flex: 1;
      overflow: hidden;
    }

    &__time {
      margin-top: 10rpx;
      font-size: 28rpx;
      color: #999;
    }
  }
}
</style>
