<script setup lang="ts">
import { useResourceStoreHook } from '@/store/modules/resource'
import type { Category } from 'types/category'
import { useRouter } from 'uni-mini-router'

interface Props {
  list: Category[]
}

withDefaults(defineProps<Props>(), {
  list: () => []
})

const router = useRouter()
const handleTap = (id: number) => {
  useResourceStoreHook().SET_QUERY({ tid: id })
  router.pushTab({ name: 'recCenter' })
}
</script>

<template>
  <view class="tab">
    <view class="tab__title">资源分类</view>

    <scroll-view v-if="list.length" scroll-x class="tab__scroll hidden-scroll">
      <view class="tab__scroll__content">
        <view
          v-for="item in list"
          :key="item.oid"
          class="tab-item"
          @tap="handleTap(item.oid)"
        >
          <image
            :src="item.sortPic"
            mode="scaleToFill"
            class="tab-item__image"
          />
          <text class="tab-item__text">{{ item.sortName }}</text>
        </view>
      </view>
    </scroll-view>
    <view v-else class="tab__empty">暂无分类</view>
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

    &__content {
      display: flex;
      gap: 40rpx;

      .tab-item {
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

  .tab__empty {
    height: 100rpx;
    line-height: 100rpx;
    text-align: center;
    color: #999;
  }
}
</style>
