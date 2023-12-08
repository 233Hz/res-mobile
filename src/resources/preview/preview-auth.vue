<script setup lang="ts">
import { ref, computed } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
import { getResourceByIdNoAuthApi } from '@/api/resource'
import { Base64 } from 'js-base64'
import { resUrl } from '@/api/file'
import { findNode } from '@/utils/tree'
import { useResourceStoreHook } from '@/store/modules/resource'
import type { Resource } from 'types/resource'

const resourceStore = useResourceStoreHook()

const data = ref<Resource>()

const navName = computed(
  () =>
    findNode(
      resourceStore.columnOptions1,
      (item) => item.value === data.value?.navId
    )?.label || '无'
)

const sortName = computed(
  () =>
    resourceStore.categoryOptions.find(
      (item) => item.value === data.value?.sortId
    )?.label || '无'
)

const handleIframeLoad = () => {
  console.log('handleIframeLoad')
}

const previewUrl = (url: string) =>
  `${import.meta.env.VITE_PREVIEW_URL}?url=${encodeURIComponent(
    Base64.encode(resUrl(`/${url}`))
  )}`

onLoad(async (option) => {
  if (option?.id) {
    const { data: res } = await getResourceByIdNoAuthApi(Number(option.id))
    data.value = res
  }
})
</script>

<template>
  <view class="container">
    <view class="res-preview-box">
      <iframe
        class="iframe"
        :src="data?.resPath && previewUrl(data.resPath)"
        @load="handleIframeLoad"
      />
    </view>
    <view class="res-info-box">
      <view class="res-info-title">
        <text class="name">{{ data?.resName }}</text>
      </view>
      <view class="res-info-user-view">
        <text class="user">
          <text class="icon-user" />
          <text class="text">{{ data?.createUserName || '无' }}</text>
        </text>
      </view>
      <view class="res-info-tags">
        <text v-if="data?.sortId" class="category">
          {{ sortName }}
        </text>
        <text v-if="data?.navId" class="column">
          {{ navName }}
        </text>
      </view>
      <view class="res-info-footer">
        <text class="time">
          <text class="icon-time" />
          <text class="text">{{ data?.createTime || '无' }}</text>
        </text>
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
.container {
  height: 100%;
  display: flex;
  flex-direction: column;

  .res-preview-box {
    flex: 1;
    height: 100%;
    overflow: hidden;

    .iframe {
      width: 100%;
      height: 100%;
    }
  }

  .res-info-box {
    flex-shrink: 0;
    padding: 20rpx;
    background-color: #fff;
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);

    .res-info-title {
      .name {
        width: 100%;
        font-size: 36rpx;
        font-weight: bold;
      }
    }

    .res-info-user-view {
      display: flex;
      justify-content: space-between;
      align-items: center;

      .user {
        margin-top: 20rpx;
        font-size: 32rpx;
        color: #888888;
        .text {
          margin-left: 10rpx;
        }
      }
    }

    .res-info-tags {
      margin-top: 10rpx;
      display: flex;
      gap: 20rpx;
      flex-wrap: wrap;

      .category {
        padding: 5rpx 10rpx;
        font-size: 24rpx;
        color: #5fb878;
        border: 1px solid #5fb878;
        font-weight: 400;
      }

      .column {
        background-color: #f7f7f7;
        color: #888888;
        padding: 4px 8px;
        font-size: 24rpx;
      }
    }

    .res-info-footer {
      margin-top: 20rpx;

      .time {
        font-size: 28rpx;
        color: #888888;

        .text {
          margin-left: 10rpx;
        }
      }
    }
  }
}
</style>
