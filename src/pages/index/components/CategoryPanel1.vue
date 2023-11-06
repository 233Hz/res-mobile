<script setup lang="ts">
const categorys = [
  '产教融合企业',
  '创新创业大赛商业计划书',
  '创新创业课程',
  '创新创业教学课件',
  '创新创业教学课件'
]
</script>

<template>
  <view class="tab">
    <view class="tab__title">资源栏目</view>
    <scroll-view scroll-x class="tab__scroll hidden-scroll">
      <text class="tab__scroll__item" v-for="item in categorys" :key="item"> {{ item }} </text>
    </scroll-view>
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

    &__item {
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
}
</style>
