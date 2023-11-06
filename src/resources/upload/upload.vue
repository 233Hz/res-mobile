<script setup lang="ts">
import { ref } from 'vue'
import * as dictData from './const'

const formRef = ref()
const formData = ref<any>({
  name: void 0,
  category: void 0,
  isPublic: void 0,
  allowDownload: void 0
})

const indexData = ref<any>({
  index1: void 0,
  index2: void 0,
  index3: void 0,
  index4: void 0
})

const categoryChangeHandler: UniHelper.PickerViewOnChange = (e) => {
  const index = e.detail.value as unknown as number
  indexData.value.index1 = index
  formData.value.category = dictData.categoryList[index].id
}

const isPublicChangeHandler: UniHelper.PickerViewOnChange = (e) => {
  const index = e.detail.value as unknown as number
  indexData.value.index2 = index
  formData.value.isPublic = dictData.isPublicList[index].id
}

const allowDownloadListChangeHandler: UniHelper.PickerViewOnChange = (e) => {
  const index = e.detail.value as unknown as number
  indexData.value.index3 = index
  formData.value.allowDownload = dictData.allowDownloadList[index].id
}
</script>

<template>
  <view class="form">
    <view class="form-content">
      <view class="form-item">
        <text class="label">资源名称</text>
        <view class="content">
          <input class="input" type="text" placeholder="请输入资源名称" :value="formData.name" />
        </view>
      </view>
      <view class="form-item">
        <text class="label">资源分类</text>
        <view class="content">
          <picker
            @change="categoryChangeHandler"
            :value="0"
            :range="dictData.categoryList"
            range-key="label"
          >
            <text v-if="indexData.index1 !== void 0">
              {{ dictData.categoryList[indexData.index1].label }}
            </text>
            <text class="placeholder" v-else>请选择资源分类</text>
          </picker>
        </view>
      </view>
      <view class="form-item">
        <text class="label">资源权限</text>
        <view class="content">
          <picker
            @change="isPublicChangeHandler"
            :value="0"
            :range="dictData.isPublicList"
            range-key="label"
          >
            <text v-if="indexData.index2 !== void 0">
              {{ dictData.isPublicList[indexData.index2].label }}
            </text>
            <text class="placeholder" v-else>请选择资源权限</text>
          </picker>
        </view>
      </view>
      <view class="form-item">
        <text class="label">允许学生下载</text>
        <view class="content">
          <picker
            @change="allowDownloadListChangeHandler"
            :value="0"
            :range="dictData.allowDownloadList"
            range-key="label"
          >
            <text v-if="indexData.index3 !== void 0">
              {{ dictData.allowDownloadList[indexData.index3].label }}
            </text>
            <text class="placeholder" v-else>请选择是否允许学生下载</text>
          </picker>
        </view>
      </view>
      <view class="form-item">
        <text class="label">所属栏目</text>
        <view class="content">
          <picker mode="multiSelector" :value="0" :range="dictData.columnList" range-key="label">
            <text class="placeholder">请选择所属栏目</text>
          </picker>
        </view>
      </view>
      <view class="form-item">
        <text class="label">封面上传</text>
        <view class="content">
          <uni-file-picker limit="9" title="最多选择9张图片" />
        </view>
      </view>
      <view class="form-item">
        <text class="label">资源上传</text>
        <view class="content">
          <uni-file-picker limit="1" file-mediatype="all" />
        </view>
      </view>
    </view>
    <button class="form-button">确认修改</button>
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
      }

      .content {
        flex: 1;

        .radio {
          margin-right: 20rpx;

          &:last-child {
            margin-right: 0;
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
}
</style>
