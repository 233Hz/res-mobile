<script setup lang="ts">
import { ref } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
import { collectResourceApi, getResourceByIdApi } from '@/api/resource'
import type { Resource } from 'types/resource'
import createPopup from '@/utils/popup'
import { Base64 } from 'js-base64'
import { downloadRes, resUrl } from '@/api/file'

const data = ref<Resource>()

const handleIframeLoad = () => {
  console.log('handleIframeLoad')
}

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

const handleDownload = async () => {
  if (data.value) {
    uni.showLoading({
      title: '下载中',
      mask: true
    })
    try {
      await downloadRes(data.value.oid)
      uni.showToast({
        icon: 'success',
        title: '下载成功'
      })
    } catch (error) {
      /* empty */
    } finally {
      uni.hideLoading()
    }
  }
  // 移动端下载
  // if (data.value?.oid) {
  //   if (!isDownload) {
  //     isDownload = true
  //     uni.downloadFile({
  //       url: downloadUrl(`/download/download/${data.value.oid}`),
  //       success: (res) => {
  //         if (res.statusCode === 200) {
  //           console.log('res', res)
  //           uni.hideLoading()
  //           uni.saveFile({
  //             tempFilePath: res.tempFilePath,
  //             success: (data) => {
  //               uni.showToast({
  //                 icon: 'none',
  //                 mask: true,
  //                 title: '文件已保存' + data.savedFilePath,
  //                 duration: 3000
  //               })
  //               console.log('data', data)

  //               setTimeout(() => {
  //                 isDownload = false
  //                 uni.openDocument({
  //                   filePath: data.savedFilePath,
  //                   success: () => {}
  //                 })
  //               }, 3000)
  //             }
  //           })
  //         }
  //       },
  //       fail: () => {
  //         isDownload = false
  //         uni.hideLoading()
  //         uni.showToast({
  //           icon: 'none',
  //           mask: true,
  //           title: '下载失败'
  //         })
  //       }
  //     })
  //   }
  // }
}

onLoad(async (option) => {
  if (option?.id) {
    const { data: res } = await getResourceByIdApi(Number(option.id))
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
        <text class="view">
          <text class="icon-view" />
          <text class="text">{{ data?.viewNum || 0 }}</text>
        </text>
      </view>
      <view class="res-info-tags">
        <text v-if="data?.sortName" class="category">
          {{ data?.sortName }}
        </text>
        <text v-if="data?.navName" class="column">
          {{ data?.navName }}
        </text>
      </view>
      <view class="res-info-footer">
        <view class="footer-left">
          <text class="time">
            <text class="icon-time" />
            <text class="text">{{ data?.createTime || '无' }}</text>
          </text>
        </view>
        <view class="footer-right">
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

      .user,
      .view {
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
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 20rpx;

      .footer-left {
        .time {
          font-size: 28rpx;
          color: #888888;

          .text {
            margin-left: 10rpx;
          }
        }
      }

      .footer-right {
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
