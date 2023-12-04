<script setup lang="ts">
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
    <GlEmpty v-if="!list.length" text="暂无推荐资源" />
    <view v-else class="list">
      <view v-for="item in list" :key="item.oid" class="list__item">
        <navigator
          :url="`/resources/preview/preview?id=${item.oid}`"
          hover-class="none"
        >
          <image
            :src="item.resCover"
            mode="scaleToFill"
            class="list__item__image"
          />
          <view class="list__item__content">
            <view class="list__item__content__title">
              <text class="list__item__content__title__tag">
                {{ item.sortName }}
              </text>
              {{ item.resName }}
            </view>
            <view class="list__item__content-user-count">
              <view><text class="icon-user" />{{ item.createUserName }}</view>
              <view><text class="icon-view" />{{ item.viewNum }}</view>
            </view>
          </view>
        </navigator>
      </view>
    </view>
  </view>
</template>

<style scoped lang="scss">
.list {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 10rpx;

  &__item {
    background-color: #fff;
    overflow: hidden;
    border-radius: 10px;

    &__image {
      width: 100%;
      height: 200rpx;
    }

    &__content {
      padding: 10rpx;

      &__title {
        font-size: 30rpx;
        font-weight: bold;
        color: #212121;
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

      &-user-count {
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
