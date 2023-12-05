<script setup lang="ts">
import { formatDate } from '@/utils/util'
import { useNotifyDetail } from './hooks'

const { data } = useNotifyDetail()
</script>

<template>
  <view class="container">
    <scroll-view scroll-y class="container-body">
      <GlEmpty v-if="!data" text="未查询到通知" />
      <view v-else class="article">
        <view class="article__title">
          {{ data?.title }}
        </view>
        <view class="article__info">
          <text class="info-item">
            <text class="icon-user" />
            <text>{{ data?.createUserName || '无' }}</text>
          </text>
          <text class="info-item">
            <text class="icon-time" />
            <text>
              {{
                data?.createTime &&
                formatDate(data.createTime.toString(), 'YYYY-MM-DD')
              }}
            </text>
          </text>
          <text class="info-item">
            <text class="icon-view" />
            <text>{{ data?.viewNum || 0 }}</text>
          </text>
        </view>
        <view class="article__content" v-html="data?.content || '暂无内容'" />
      </view>
    </scroll-view>
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
  background-color: #fff;

  &-body {
    flex: 1;
    overflow: hidden;

    .article {
      padding: 20rpx;
      &__title {
        text-align: center;
        font-size: 36rpx;
        font-weight: bold;
        color: #303133;
      }

      &__info {
        margin-top: 20rpx;
        font-size: 28rpx;
        font-weight: 100;
        color: #909399;
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        gap: 20rpx;

        .info-item {
          text:last-child {
            margin-left: 10rpx;
          }
        }
      }

      &__content {
        margin-top: 20rpx;
        border-top: #f7f7f7 1px solid;
        padding-top: 20rpx;
      }
    }
  }
}
</style>
