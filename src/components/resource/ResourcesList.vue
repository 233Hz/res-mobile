<script setup lang="ts">
import { formatFileSize, formatDate } from '@/utils/util'
import type { Resource } from 'types/resource'

interface Props {
  type: 'list' | 'audit'
  list?: Resource[]
}
interface EmitEvent {
  (e: 'on-update', id: number): void
  (e: 'on-delete', id: number): void
  (e: 'on-revoke', id: number): void
  (e: 'on-pass', id: number): void
  (e: 'on-refuse', id: number): void
}

withDefaults(defineProps<Props>(), {
  list: () => []
})

const emit = defineEmits<EmitEvent>()

const handleEdit = (id: number) => emit('on-update', id)
const handleDelete = (id: number) => emit('on-delete', id)
const handleRevoke = (id: number) => emit('on-revoke', id)
const handlePass = (id: number) => emit('on-pass', id)
const handleRefuse = (id: number) => emit('on-refuse', id)
</script>

<template>
  <view class="list">
    <view class="item" v-for="item in list" :key="item.oid">
      <navigator
        :url="`/resources/preview/preview-auth?id=${item.oid}`"
        hover-class="none"
      >
        <view class="name">
          <text class="text">
            {{ item.resName }}
          </text>
        </view>
        <view class="row-tag">
          <text v-if="[1, 2].includes(item.resAuth)" class="is-public">
            {{ item.resAuth === 1 ? '公有' : item.resAuth === 2 ? '私有' : '' }}
          </text>
          <text v-if="[1, 2].includes(item.stuDown)" class="is-download">
            {{
              item.resAuth === 1
                ? '允许下载'
                : item.resAuth === 2
                ? '禁止下载'
                : ''
            }}
          </text>
          <text class="size">{{ formatFileSize(item.resSize || 0) }}</text>
        </view>
        <view v-if="item.navName" class="icon-column">{{ item.navName }}</view>
        <view v-if="item.sortName" class="icon-category">{{
          item.sortName
        }}</view>
        <view class="row-issuer_time">
          <text class="issuer">{{ item.createUserName || '无' }}</text>
          <text class="time">
            发布于 {{ formatDate(item.createTime + '', 'YYYY-MM-DD') }}
          </text>
        </view>
      </navigator>
      <view class="btn">
        <text
          v-show="type === 'list' && item.state === 4"
          class="edit"
          @tap.stop="handleEdit(item.oid)"
        >
          编辑
        </text>
        <text
          v-show="type === 'list' && item.state === 4"
          class="delete"
          @tap.stop="handleDelete(item.oid)"
        >
          删除
        </text>
        <text
          v-show="type === 'list' && item.state === 8"
          class="revoke"
          @tap.stop="handleRevoke(item.oid)"
        >
          下架
        </text>
        <text
          v-show="type === 'audit' && [2, 3].includes(item.state)"
          class="pass"
          @tap.stop="handlePass(item.oid)"
        >
          通过
        </text>
        <text
          v-show="type === 'audit' && [2, 3].includes(item.state)"
          class="refuse"
          @tap.stop="handleRefuse(item.oid)"
        >
          拒绝
        </text>
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
      overflow: hidden;

      .text {
        font-size: 32rpx;
        font-weight: bold;
      }
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
      margin-top: 40rpx;
      text-align: end;

      .edit,
      .delete,
      .revoke,
      .pass,
      .refuse {
        font-size: 28rpx;
        border-radius: 16px;
        padding: 10rpx 30rpx;
        margin: 0 10rpx;
        color: #fff;
      }

      .edit {
        background-color: #409eff;
      }
      .delete {
        background-color: #f56c6c;
      }
      .revoke {
        background-color: #ffaa22;
      }
      .pass {
        background-color: #00967d;
      }
      .refuse {
        background-color: #f56c6c;
      }
    }
  }
}
</style>
