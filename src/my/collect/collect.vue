<script setup lang="ts"></script>

<template>
  <scroll-view scroll-y class="scroll-view">
    <view class="list">
      <view class="item" v-for="item in 20" :key="item">
        <view class="info">
          <view class="name truncate">大姚核桃，幸福希冀.mp4</view>
          <view class="time">2023/03/09 20:28</view>
        </view>
        <text class="icon-collect" />
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
      padding: 20rpx 0;
      border-bottom: #f7f7f7 solid 1px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 20rpx;

      &:last-child {
        border-bottom: none;
      }

      .info {
        flex: 1;

        .name {
          font-size: 30rpx;
          color: #212121;
          font-weight: bold;
        }

        .time {
          margin-top: 10rpx;
          font-size: 28rpx;
          color: #c0c4cc;
          font-weight: 400;
        }
      }

      .icon-collect {
        font-size: 48rpx;
        color: red;
      }
    }
  }
}
</style>
