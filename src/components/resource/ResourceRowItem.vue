<script setup lang="ts">
import { resUrl } from '@/api/file'
import type { Resource } from 'types/resource'
import { useRouter } from 'uni-mini-router'

interface Props {
  item: Resource
}

const props = defineProps<Props>()

const router = useRouter()
const handleTap = () => {
  router.push({ name: 'resPreview', params: { id: props.item.oid + '' } })
}
</script>

<template>
  <view class="res-item" @tap="handleTap">
    <image
      :src="resUrl(`/${item.resCover}`)"
      mode="scaleToFill"
      class="res-item__image"
    />
    <view class="res-item__content">
      <view class="title">
        <text v-if="item.sortName" class="title__tag">
          {{ item.sortName }}
        </text>
        <text class="title__text">{{ item.resName }}</text>
      </view>
      <view class="res-info">
        <view class="res-info__left">
          <text class="info-item">
            <text class="icon-user" />
            {{ item.createUserName || '无' }}
          </text>
          <text class="info-item">
            <text class="icon-view" />
            {{ item.viewNum || 0 }}
          </text>
        </view>
        <view class="res-info__right">
          <slot name="extra"></slot>
        </view>
      </view>
    </view>
  </view>
</template>

<style scoped lang="scss">
.res-item {
  display: flex;
  gap: 20rpx;

  &__image {
    width: 200rpx;
    height: 150rpx;
    border-radius: 8px;
  }

  &__content {
    flex: 1;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    .title {
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
      text-overflow: ellipsis;
      line-height: 40rpx;

      &__tag {
        padding: 4rpx 8rpx;
        font-size: 24rpx;
        color: #4fb869;
        border: #4fb869 1px solid;
        border-radius: 4px;
        margin-right: 10rpx;
        text-transform: uppercase;
      }

      &__text {
        font-size: 30rpx;
        font-weight: bold;
      }
    }

    .res-info {
      display: flex;
      align-items: flex-end;
      gap: 20rpx;

      &__left {
        height: 42rpx;
        line-height: 48rpx;
        flex-shrink: 0;

        .info-item {
          margin-left: 28rpx;
          font-size: 24rpx;
          color: #999;
          font-weight: 100;

          &:first-child {
            margin-left: 0;
          }

          .icon-user,
          .icon-view {
            margin-right: 10rpx;
          }
        }
      }

      &__right {
        flex: 1;
        overflow: hidden;
      }
    }
  }
}
</style>
