<script setup lang="ts">
import { useResourceUpload } from './hooks'
import { formatFileSize } from '@/utils/util'
import { findLabelForValue, AUTH_OPTION, DOWNLOAD_OPTION } from './utils'

const {
  form,
  categoryList,
  columnList,
  fileList,
  columnIndexs,
  handleResAuthChange,
  handleStuDownChange,
  handleSortIdChange,
  handleNavIdChange,
  handleCoverUpload,
  handleFileUpload,
  onSubmit
} = useResourceUpload()
</script>

<template>
  <view class="form">
    <view class="form-content">
      <view class="form-item">
        <text class="label">资源名称</text>
        <view class="content">
          <input
            class="input"
            type="text"
            placeholder="请输入资源名称"
            v-model="form.resName"
          />
        </view>
      </view>
      <view class="form-item">
        <text class="label">资源权限</text>
        <view class="content">
          <picker
            range-key="label"
            :value="
              AUTH_OPTION.findIndex((item) => item.value === form.resAuth)
            "
            :range="AUTH_OPTION"
            @change="handleResAuthChange"
          >
            <text v-show="form.resAuth">
              {{ findLabelForValue(AUTH_OPTION, form.resAuth) }}
            </text>
            <text v-show="!form.resAuth" class="placeholder">
              请选择资源权限
            </text>
          </picker>
        </view>
      </view>
      <view class="form-item">
        <text class="label">允许学生下载</text>
        <view class="content">
          <picker
            range-key="label"
            :value="
              DOWNLOAD_OPTION.findIndex((item) => item.value === form.stuDown)
            "
            :range="DOWNLOAD_OPTION"
            @change="handleStuDownChange"
          >
            <text v-show="form.stuDown">
              {{ findLabelForValue(DOWNLOAD_OPTION, form.stuDown) }}
            </text>
            <text v-show="!form.stuDown" class="placeholder">
              请选择是否允许学生下载
            </text>
          </picker>
        </view>
      </view>
      <view class="form-item">
        <text class="label">资源分类</text>
        <view class="content">
          <picker
            class="picker"
            range-key="label"
            :value="
              categoryList.findIndex((item) => item.value === form.sortId)
            "
            :range="categoryList"
            @change="handleSortIdChange"
          >
            <text v-show="form.sortId">
              {{ findLabelForValue(categoryList, form.sortId) }}
            </text>
            <text v-show="!form.sortId" class="placeholder">
              请选择资源分类
            </text>
          </picker>
        </view>
      </view>
      <view class="form-item">
        <text class="label">所属栏目</text>
        <view class="content">
          <picker
            v-for="(item, index) in columnList"
            :key="index"
            range-key="label"
            :value="columnIndexs[index]?.index"
            :range="columnList[index]"
            @change="(event: any) => handleNavIdChange(event, index)"
          >
            <view class="picker-item">
              <text v-show="columnIndexs[index] !== void 0" class="text">
                {{
                  columnIndexs[index] &&
                  columnIndexs[index]?.value &&
                  findLabelForValue(
                    columnList[index],
                    columnIndexs[index]!.value!
                  )
                }}
              </text>
              <text
                v-show="columnIndexs[index] === void 0"
                class="placeholder text"
              >
                请选择{{ ['一', '二', '三'][index] }}级栏目
              </text>
            </view>
          </picker>
        </view>
      </view>
      <view class="form-item">
        <text class="label">封面上传</text>
        <view class="content">
          <view class="cover" @tap="handleCoverUpload">
            <image
              mode="aspectFill"
              class="image"
              :src="form.resCover"
              :class="{
                default: !form.resCover
              }"
            />
            <text class="text">点击上传封面</text>
          </view>
        </view>
      </view>
      <view class="form-item" v-show="form.linkRes">
        <text class="label">资源上传</text>
        <view class="content">
          <input
            v-show="form.linkRes === 1"
            class="input"
            type="text"
            placeholder="请输入资源链接地址"
            v-model="form.resPath"
          />
          <view class="file" v-show="form.linkRes === 2">
            <view class="upload-btn" @tap="handleFileUpload">
              <text class="text">上传文件</text>
            </view>
            <view
              v-for="item in fileList"
              :key="item.filePath"
              class="file-item"
            >
              <text class="name">{{ item.fileName }}</text>
              <text class="size">{{ formatFileSize(item.fileSize || 0) }}</text>
            </view>
          </view>
        </view>
      </view>
      <view class="form-item">
        <GlEditor v-model="form.content" :height="300" />
      </view>
    </view>
    <button class="form-button" @click="onSubmit">确认保存</button>
  </view>
</template>

<style scoped lang="scss">
.form {
  padding: 20rpx;

  .form-content {
    background-color: #fff;
    padding: 20rpx;
    border-radius: 12px;

    .form-item {
      display: flex;
      gap: 20rpx;
      border-bottom: #f7f7f7 solid 1px;
      overflow: hidden;
      padding: 30rpx 20rpx;

      &:last-child {
        border: none;
      }

      .label {
        width: 180rpx;
        color: #303133;
        font-size: 28rpx;
        flex-shrink: 0;
      }

      .content {
        flex: 1;
        overflow: hidden;

        .radio {
          margin-right: 20rpx;

          &:last-child {
            margin-right: 0;
          }
        }

        .picker-item {
          border-bottom: 1px solid #f7f7f7;
          height: 80rpx;
          line-height: 80rpx;
          overflow: hidden;
          text-overflow: ellipsis;

          .text {
            width: 100%;
            white-space: nowrap;
          }
        }
      }
    }

    .placeholder {
      color: #808080;
    }
  }

  .form-button {
    margin-top: 20rpx;
    border-radius: 80rpx;
    border: none;
    background-color: #007aff;
    color: #fff;
  }

  .cover {
    width: 160rpx;
    display: flex;
    flex-direction: column;

    .image {
      position: relative;
      width: 160rpx;
      height: 160rpx;
    }

    .default {
      border: 1px dashed #ccc;
      box-sizing: border-box;

      &::after {
        content: '';
        position: absolute;
        top: 50%;
        left: 50%;
        margin-top: -2rpx;
        margin-left: -30rpx;
        width: 60rpx;
        height: 4rpx;
        background-color: #ccc;
      }
      &::before {
        content: '';
        position: absolute;
        top: 50%;
        left: 50%;
        margin-top: -30rpx;
        margin-left: -2rpx;
        width: 4rpx;
        height: 60rpx;
        background-color: #ccc;
      }
    }

    .text {
      padding-top: 20rpx;
      line-height: 1;
      font-size: 26rpx;
    }
  }

  .file {
    .upload-btn {
      display: inline-flex;
      border-radius: 6px;
      background-color: #007aff;

      .text {
        padding: 16rpx 36rpx;
        color: #fff;
      }
    }

    .file-item {
      display: flex;
      justify-content: space-between;
      background-color: #f7f7f7;
      padding: 10rpx 20rpx;
      margin-top: 20rpx;

      .name {
        flex: 1;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      .size {
        flex-shrink: 0;
        color: #808080;
      }
    }
  }
}
</style>
./utils./utils
