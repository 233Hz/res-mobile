<script setup lang="ts">
import { ref } from 'vue'

const { activeIndex } = defineProps<{
  activeIndex: number
}>()

const tabs = ref(['资源推荐', '最热资源', '通知公告'])
const changeHandler = (index: number) => {
  emit('change', index)
}

const filterClickHandler = (index: number) => {
  emit('filterClick', index)
}

const emit = defineEmits<{
  (event: 'change', index: number): void
  (event: 'filterClick', index: number): void
}>()
</script>

<template>
  <view class="container">
    <view class="container__left"></view>
    <view class="container__center">
      <text
        v-for="(item, index) in tabs"
        :key="item"
        class="tab-item"
        :class="{ 'tab-item_active': index === activeIndex }"
        @tap="changeHandler(index)"
      >
        {{ item }}
      </text>
    </view>
    <view class="container__right">
      <text v-show="activeIndex === 0" class="icon-navbar" @tap="filterClickHandler(activeIndex)" />
    </view>
  </view>
</template>

<style scoped lang="scss">
.container {
  background-color: #fff;
  border-radius: 8px;
  padding: 10rpx 0;
  display: flex;
  align-items: center;

  &__left,
  &__right {
    width: 80rpx;
  }

  &__right {
    padding-bottom: 14rpx;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  &__center {
    flex: 1;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: space-around;

    .tab-item {
      font-size: 28rpx;
      color: #999;
      font-weight: 500;
      position: relative;
      padding-bottom: 16rpx;

      .icon-filter {
        position: absolute;
        right: -40rpx;
        top: 40%;
        margin-left: 4rpx;
      }
    }

    .tab-item_active {
      font-size: 30rpx;
      font-weight: bold;
      color: #212121;

      &:before {
        content: '';
        position: absolute;
        width: 60%;
        height: 8rpx;
        bottom: 0;
        left: 50%;
        transform: translateX(-50%);
        background-color: #4fb869;
        border-radius: 20px;
      }
    }
  }
}
</style>
