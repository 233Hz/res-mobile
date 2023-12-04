<script setup lang="ts">
import { formatDate } from '@/utils/util'
import { useDemand } from './hooks'

const {
  dataList,
  handlePreview,
  handlePublish,
  handleEdit,
  handleDelete,
  handleScrollToLower
} = useDemand()
</script>

<template>
  <view class="container">
    <view class="main">
      <GlEmpty v-if="!dataList.length" text="暂无未发布需求" />
      <scroll-view
        v-else
        scroll-y
        class="scroll-view"
        @scrolltolower="handleScrollToLower"
      >
        <view class="demand">
          <view
            v-for="item in dataList"
            :key="item.oid"
            class="demand-item"
            @tap.stop="handlePreview(item.oid)"
          >
            <view class="demand-item__title">
              {{ item.title }}
            </view>
            <view class="demand-item__bottom">
              <view class="info">
                <text class="info__item">
                  <text class="icon-user" />
                  <text class="text">{{ item.createUserName || '无' }}</text>
                </text>
                <text class="info__item">
                  <text class="icon-time" />
                  <text class="text">
                    {{ formatDate(item.createTime.toString(), 'YYYY-MM-DD') }}
                  </text>
                </text>
                <text class="info__item">
                  <text class="icon-view" />
                  <text class="text">{{ item.viewNum }}</text>
                </text>
              </view>
              <view class="button">
                <text class="button__edit" @tap.stop="handleEdit(item.oid)">
                  修改
                </text>
                <text class="button__delete" @tap.stop="handleDelete(item.oid)">
                  删除
                </text>
              </view>
            </view>
          </view>
        </view>
      </scroll-view>
    </view>
    <view class="footer">
      <button @tap="handlePublish">发布需求</button>
    </view>
  </view>
</template>

<style>
page {
  height: 100%;
  overflow: hidden;
}
</style>

<style lang="scss">
.container {
  height: 100%;
  display: flex;
  flex-direction: column;

  .main {
    flex: 1;
    overflow: hidden;

    .scroll-view {
      height: 100%;

      .demand {
        padding: 20rpx;

        &-item {
          background-color: #fff;
          padding: 20rpx;
          border-radius: 12px;
          margin-top: 10rpx;

          &:first-child {
            margin-top: 0;
          }

          &__title {
            height: 80rpx;
            line-height: 80rpx;
            font-size: 32rpx;
            font-weight: bold;
            color: #303133;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }

          &__bottom {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-top: 20rpx;

            .info {
              font-size: 28rpx;
              color: #909399;

              &__item {
                margin-right: 10rpx;

                &:last-child {
                  margin-right: 0;
                }

                .text {
                  margin-left: 10rpx;
                }
              }
            }

            .button {
              text {
                font-size: 28rpx;
                padding: 10rpx 24rpx;
                border-radius: 20px;
                margin-right: 20rpx;

                &:last-child {
                  margin-right: 0;
                }
              }

              .button__edit {
                border: #007aff solid 1px;
                color: #007aff;
              }
              .button__delete {
                border: #f56c6c solid 1px;
                color: #f56c6c;
              }
            }
          }
        }
      }
    }
  }

  .footer {
    flex-shrink: 0;
  }
}
</style>
