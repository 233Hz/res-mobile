<script setup lang="ts">
import { resUrl } from '@/api/file'
import type { Resource } from 'types/resource'

interface Props {
  list?: Resource[]
}

withDefaults(defineProps<Props>(), {
  list: () => []
})
</script>

<template>
  <view>
    <GlEmpty v-if="!list.length" text="暂无最热资源" />
    <view class="list" v-else>
      <view v-for="item in list" :key="item.oid" class="hot__item">
        <navigator
          :url="`/resources/preview/preview?id=${item.oid}`"
          hover-class="none"
          style="display: flex; gap: 20rpx"
        >
          <image
            :src="resUrl(`/${item.resCover}`)"
            mode="scaleToFill"
            class="hot__item__image"
          />
          <view class="hot__item__right">
            <view class="hot__item__right__title">
              <text class="hot__item__right__title__tag">
                {{ item.sortName }}
              </text>
              {{ item.resName }}
            </view>
            <view class="hot__item__right__user-count">
              <text class="user">
                <text class="icon-user" />
                {{ item.createUserName }}
              </text>
              <text class="count">
                <text class="icon-view" />
                {{ item.viewNum }}
              </text>
            </view>
          </view>
        </navigator>
      </view>
    </view>
  </view>
</template>

<style scoped lang="scss">
.list {
  padding: 20rpx;
  background-color: #fff;
  border-radius: 10rpx;

  .hot__item {
    padding: 20rpx 0;
    border-bottom: #f7f7f7 solid 1px;

    &:last-child {
      border: none;
    }

    &__image {
      width: 200rpx;
      height: 150rpx;
      border-radius: 8px;
    }

    &__right {
      flex: 1;
      overflow: hidden;
      display: flex;
      flex-direction: column;
      justify-content: space-between;

      &__title {
        font-size: 30rpx;
        font-weight: bold;
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
      }

      &__user-count {
        margin-top: 14rpx;
        font-size: 24rpx;
        color: #999;
        font-weight: 100;
        display: flex;
        gap: 20rpx;

        .icon-user,
        .icon-view {
          margin-right: 10rpx;
        }
      }
    }
  }
}
</style>
