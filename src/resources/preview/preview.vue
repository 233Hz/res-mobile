<script setup lang="ts">
interface Props {
  id: string
}

const query = defineProps<Props>()
console.log(query)
</script>

<template>
  <view class="viewport">
    <view class="preview">
      <iframe
        class="preview-content"
        src="https://view.xdocin.com/view?src=http%3A%2F%2F106.14.156.6%3A8088%2Fwebsite_doc%2Fres_file%2F1678343602223.pptx"
      >
      </iframe>
    </view>
    <view class="resources-info">
      <view class="info-name_view">
        <text class="name">泼猴信息企业介绍.pptx</text>
        <text class="icon-view">99</text>
      </view>
      <view class="info-category_unit">
        <text class="category-tag">产教融合企业</text>
        <text class="unit">泼猴信息技术（上海）有限公司</text>
      </view>
      <view class="info-publish_btn">
        <view class="publish">
          <text class="issuer">张三</text>
          <text class="time">发布于：2023-01-01</text>
        </view>
        <view class="btn">
          <text class="icon-collect"> 收藏</text>
          <text class="icon-download"> 下载</text>
        </view>
      </view>
    </view>
  </view>
</template>

<style>
page {
  height: 100%;
  overflow: hidden;
}
</style>

<style scoped lang="scss">
.viewport {
  height: 100%;
  display: flex;
  flex-direction: column;

  .preview {
    flex: 1;
    height: 100%;
    overflow: hidden;

    &-content {
      width: 100%;
      height: 100%;
    }
  }

  .resources-info {
    padding: 20rpx;
    background-color: #fff;

    .info-name_view {
      display: flex;
      align-items: center;
      justify-content: space-between;

      .name {
        font-size: 36rpx;
        font-weight: bold;
      }

      .icon-view {
        font-size: 30rpx;
        color: #8d8d8d;
      }
    }

    .info-category_unit {
      margin-top: 20rpx;
      display: flex;
      justify-content: space-between;

      .category-tag {
        padding: 5rpx 10rpx;
        font-size: 24rpx;
        color: #5fb878;
        border: 1px solid #5fb878;
        font-weight: 400;
      }

      .unit {
        background-color: #f7f7f7;
        color: #888888;
        padding: 4px 8px;
        font-size: 24rpx;
      }
    }

    .info-publish_btn {
      display: flex;
      justify-content: space-between;
      margin-top: 30rpx;

      .publish {
        .issuer {
          font-size: 28rpx;
          color: #8d8d8d;
        }

        .time {
          margin-left: 20rpx;
          font-size: 24rpx;
          color: #8d8d8d;
        }
      }

      .btn {
        display: flex;
        justify-content: flex-end;
        align-items: center;
        gap: 30rpx;

        .icon-collect,
        .icon-download {
          background-color: #5fb878;
          color: #fff;
          padding: 6rpx 12rpx;
          border-radius: 6px;
        }
      }
    }
  }
}
</style>
