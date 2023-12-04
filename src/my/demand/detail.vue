<script setup lang="ts">
import { formatDate } from '@/utils/util'
import { useDemandDetail } from './hooks'
import defaultAvatar from '@/static/images/default-avatar.png'

const { form, data, commentList, handleCommentReply, handleCommentDelete } =
  useDemandDetail()
</script>

<template>
  <view class="container">
    <scroll-view scroll-y class="container-body">
      <view class="article">
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
          <text class="info-item">
            <text class="icon-view" />
            <text>{{
              data?.state === 1
                ? '未解决'
                : data?.state === 2
                ? '已解决'
                : '未知状态'
            }}</text>
          </text>
        </view>
        <view class="article__content" v-html="data?.content || '未填写内容'" />
      </view>
      <view class="comment">
        <view class="comment__title">回复内容</view>
        <GlEmpty v-if="!commentList.length" text="暂无回复内容" />
        <view v-else class="comment__list">
          <view
            v-for="item in commentList"
            :key="item.oid"
            class="comment-item"
          >
            <view class="comment-item__header">
              <view class="avatar">
                <image :src="defaultAvatar" class="image" mode="aspectFit" />
              </view>
              <view class="username">
                <text>{{ item.createUserName }}</text>
              </view>
            </view>
            <view class="comment-item__content">
              <text>
                {{ item.content }}
              </text>
            </view>
            <view class="comment-item__footer">
              <view class="time">
                {{ formatDate(item.createTime.toString(), 'YYYY-MM-DD') }}
              </view>
              <view class="operate">
                <text class="delete" @tap="handleCommentDelete(item.oid)">
                  删除
                </text>
              </view>
            </view>
          </view>
        </view>
      </view>
    </scroll-view>
    <view class="container-footer">
      <view class="container-footer__reply">
        <input
          type="text"
          placeholder="请输入回复内容"
          class="reply-input"
          v-model="form.content"
        />
        <view class="reply-button">
          <text class="text" @tap="handleCommentReply">回复</text>
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

  &-body {
    flex: 1;
    overflow: hidden;

    .article,
    .comment {
      background-color: #fff;
      padding: 20rpx;
    }

    .article {
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
      }
    }

    .comment {
      margin-top: 20rpx;

      &__title {
        height: 48rpx;
        line-height: 48rpx;
      }

      &__list {
        margin-top: 20rpx;
        .comment-item {
          padding: 20rpx 0;
          border-bottom: #f7f7f7 1px solid;

          &:last-child {
            border: none;
          }

          &__header {
            display: flex;
            align-items: center;
            gap: 20rpx;

            .avatar {
              width: 80rpx;
              height: 80rpx;

              .image {
                width: 100%;
                height: 100%;
                border-radius: 50%;
              }
            }

            .username {
              font-size: 32rpx;
              font-weight: 500;
              color: #303133;
            }
          }

          &__content {
            margin-top: 20rpx;
            font-size: 32rpx;
            font-weight: 500;
          }

          &__footer {
            margin-top: 40rpx;
            display: flex;
            justify-content: space-between;
            font-size: 28rpx;
            font-weight: 100;
            color: #909399;
          }
        }
      }
    }
  }

  &-footer {
    flex-shrink: 0;
    background-color: #fff;
    border-top: #f7f7f7 1px solid;
    padding: 20rpx;

    &__reply {
      display: flex;
      align-items: center;
      gap: 20rpx;

      .reply-input {
        flex: 1;
        border: #f5f5f5 1px solid;
        border-radius: 20px;
        height: 40rpx;
        line-height: 40rpx;
        padding: 20rpx;
      }

      .reply-button {
        flex-shrink: 0;

        .text {
          color: #909399;
        }
      }
    }
  }
}
</style>
