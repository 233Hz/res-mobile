<script setup lang="ts">
import { ref } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
import { collectResourceApi, getResourceByIdApi } from '@/api/resource'
import { formatDate } from '@/utils/util'
import type { Resource } from 'types/resource'
import createPopup from '@/utils/popup'
import { Base64 } from 'js-base64'
import { resUrl } from '@/api/file'

const data = ref<Resource>()

const handleCollect = () => {
  createPopup({
    type: 'info',
    content: '是否确认收藏该资源',
    onConfirm: async () => {
      if (data.value?.oid) {
        const { data: collectId, msg } = await collectResourceApi({
          resId: data.value.oid,
          collectId: data.value?.collectId
        })
        data.value.collectId = collectId
        uni.showToast({ title: msg, icon: 'success' })
      }
    }
  })
}

const previewUrl = (url: string) =>
  `${import.meta.env.VITE_PREVIEW_URL}?url=${encodeURIComponent(
    Base64.encode(resUrl(`/${url}`))
  )}`

let isDownload = false
const handleDownload = () => {
  if (data.value?.oid) {
    if (!isDownload) {
      isDownload = true
      uni.downloadFile({
        url: '/download/download/' + data.value.oid,
        success: (res) => {
          if (res.statusCode === 200) {
            console.log('res', res)
            uni.saveFile({
              tempFilePath: res.tempFilePath,
              success: (data) => {
                uni.showToast({
                  icon: 'none',
                  mask: true,
                  title: '文件已保存' + data.savedFilePath,
                  duration: 3000
                })
                console.log('data', data)

                setTimeout(() => {
                  isDownload = false
                  uni.openDocument({
                    filePath: data.savedFilePath,
                    success: () => {}
                  })
                }, 3000)
              }
            })
          }
        },
        fail: () => {
          isDownload = false
          uni.showToast({
            icon: 'none',
            mask: true,
            title: '下载失败'
          })
        }
      })
    }
  }
}

onLoad(async (option) => {
  if (option?.id) {
    const { data: res } = await getResourceByIdApi(Number(option.id))
    data.value = res
    console.log(data.value)
  }
})
</script>

<template>
  <view class="viewport">
    <view class="preview">
      <iframe
        class="preview-content"
        :src="data?.resPath && previewUrl(data.resPath)"
      />
    </view>
    <view class="resources-info">
      <view class="info-name_view">
        <text class="name">{{ data?.resName }}</text>
        <text class="icon-view">{{ data?.viewNum || 0 }}</text>
      </view>
      <view class="info-category_unit">
        <text v-if="data?.sortName" class="category-tag">
          {{ data?.sortName }}
        </text>
        <text v-if="data?.navName" class="unit">
          {{ data?.navName }}
        </text>
      </view>
      <view class="info-publish_btn">
        <view class="publish">
          <text class="issuer">{{ data?.createUserName }}</text>
          <text class="time">
            发布于:
            {{
              data?.createTime &&
              formatDate(data.createTime.toString(), 'YYYY-MM-DD')
            }}
          </text>
        </view>
        <view class="btn">
          <text class="icon-heart" @tap="handleCollect">
            {{ data?.collectId ? '已收藏' : '收藏' }}
          </text>
          <text class="icon-download" @tap="handleDownload"> 下载</text>
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

        .icon-heart,
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
