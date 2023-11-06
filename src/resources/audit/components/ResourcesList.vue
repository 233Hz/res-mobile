<script setup lang="ts"></script>

<template>
  <view class="list">
    <view class="item" v-for="item in 10" :key="item">
      <view>
        <text class="name">泼猴信息企业介绍.pptx</text>
      </view>
      <view class="row-tag">
        <text class="is-public">公有</text>
        <text class="is-download">禁止下载</text>
        <text class="size">29.92M</text>
      </view>
      <view class="icon-column">&nbsp;&nbsp;泼猴信息技术（上海）有限公司</view>
      <view class="icon-category">&nbsp;&nbsp;产教融合企业</view>
      <view class="row-issuer_time">
        <text class="issuer">张三</text>
        <text class="time">发布于 2023-01-01</text>
      </view>
      <view class="btn">
        <text class="pass">通过</text>
        <text class="refuse">拒绝</text>
        <text class="preview">预览</text>
      </view>
    </view>
  </view>
</template>

<style scoped lang="scss">
.list {
  padding: 20rpx;

  .item {
    padding: 20rpx;
    margin: 10rpx 0;
    background-color: #fff;
    border-radius: 12px;

    .name {
      font-size: 32rpx;
      font-weight: bold;
    }

    .row-tag {
      display: flex;
      flex-wrap: wrap;
      gap: 20rpx;
      margin-top: 20rpx;

      .is-public,
      .is-download,
      .size {
        font-size: 24rpx;
        padding: 6rpx 12rpx;
        border-radius: 8px;
        border: solid 1px;
      }

      .is-public {
        border-color: #00967d;
        color: #00967d;
      }

      .is-download {
        border-color: #ffaa22;
        color: #ffaa22;
      }

      .size {
        border-color: #4ae6f1;
        color: #4ae6f1;
      }
    }
    .icon-column {
      margin-top: 30rpx;
    }
    .icon-category {
      margin-top: 10rpx;
    }
    .row-issuer_time {
      margin-top: 20rpx;
      font-size: 24rpx;
      font-weight: 400;
      color: #999;

      .time {
        margin-left: 20rpx;
      }
    }
    .btn {
      margin-top: 20rpx;
      text-align: end;

      .pass,
      .refuse,
      .preview {
        font-size: 28rpx;
        border-radius: 16px;
        padding: 10rpx 30rpx;
        margin: 0 10rpx;
      }

      .pass {
        background-color: #409eff;
        color: #fff;
      }
      .refuse {
        background-color: #f56c6c;
        color: #fff;
      }
      .preview {
        border: #ccc solid 1px;
      }
    }
  }
}
</style>
