<script setup lang="ts"></script>

<template>
  <scroll-view scroll-y class="scroll-view">
    <view class="list">
      <view class="item" v-for="item in 20" :key="item">
        <text class="name truncate">大姚核桃，幸福希冀.mp4</text>
        <text class="time">2023/03/09 20:28</text>
      </view>
    </view>
  </scroll-view>
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
      height: 96rpx;
      line-height: 96rpx;
      border-bottom: #f7f7f7 solid 1px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 20rpx;

      &:last-child {
        border-bottom: none;
      }

      .name {
        flex: 1;
        font-size: 30rpx;
        color: #212121;
        font-weight: bold;
      }

      .time {
        font-size: 28rpx;
        color: #c0c4cc;
        font-weight: 400;
      }
    }
  }
}
</style>
