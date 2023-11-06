<script setup lang="ts">
import { useRouter } from 'uni-mini-router'
import { routes } from '@/router'
import { useTabBarStore } from '@/store/modules/tabBar'

const _router = useRouter()
const tabBars = routes.filter((route) => route?.meta?.isTabBar)

const tabBarStore = useTabBarStore()
const activeChangeHandler = (name: string) => {
  tabBarStore.setActiveName(name)
  _router.pushTab({ name })
}
</script>

<template>
  <view class="tabBar">
    <view
      class="tabBar-item"
      :class="{ active: tabBarStore.activeName === item.name }"
      v-for="item in tabBars"
      :key="item.name"
      @tap="activeChangeHandler(item.name)"
    >
      <image class="image" src="@/static/tabs/home.png" mode="scaleToFill" />
      <text class="item-name">{{ item.meta?.text }}</text>
    </view>
  </view>
</template>

<style scoped lang="scss">
.tabBar {
  padding: 20rpx 0;
  display: flex;
  align-items: center;
  justify-content: space-around;
  border-top: 1px solid #ccc;

  &-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10rpx;
    color: #636466;

    .image {
      width: 40rpx;
      height: 40rpx;
    }

    .item-name {
      font-size: 28rpx;
      font-weight: 400;
    }
  }
  .active {
    color: #009688;
  }
}
</style>
