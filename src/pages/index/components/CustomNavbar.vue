<script setup lang="ts">
import { useResourceStoreHook } from '@/store/modules/resource'
import { useRouter } from 'uni-mini-router'
import { ref } from 'vue'

const { safeAreaInsets } = uni.getSystemInfoSync()
const searchValue = ref('')

const router = useRouter()
const handleSearch = () => {
  useResourceStoreHook().SET_QUERY({ name: searchValue.value })
  router.pushTab({ name: 'recCenter' })
  searchValue.value = ''
}
</script>

<template>
  <view
    :style="{ paddingTop: safeAreaInsets?.top + 'px' }"
    style="background-color: #fff"
  >
    <view class="navbar">
      <view class="navbar__backed">
        <navigator
          url="/resources/management/management"
          hover-class="none"
          class="navigator"
        >
          <image
            class="image"
            v-permission="'admin'"
            src="@/static/images/backstage.png"
            mode="scaleToFill"
          />
        </navigator>
      </view>
      <view class="navbar__input">
        <text class="input-icon icon-search" />
        <input
          class="search-input"
          v-model="searchValue"
          placeholder="关键词搜索"
        />
      </view>
      <view class="navbar__button" @tap="handleSearch">
        <text class="text">搜索</text>
      </view>
    </view>
  </view>
</template>

<style scoped lang="scss">
.navbar {
  padding: 20rpx;
  display: flex;
  align-items: center;
  gap: 20rpx;

  &__backed {
    width: 64rpx;
    height: 64rpx;

    .navigator {
      width: 100%;
      height: 100%;

      .image {
        width: 100%;
        height: 100%;
      }
    }
  }

  &__input {
    flex: 1;
    position: relative;

    .input-icon {
      position: absolute;
      top: 0;
      left: 30rpx;
      height: 100%;
      font-size: 32rpx;
      display: flex;
      align-items: center;
    }

    .search-input {
      padding: 10rpx 20rpx 10rpx 80rpx;
      border: 1px solid #ccc;
      border-radius: 20px;
    }
  }

  &__button {
    padding-right: 20rpx;

    .text {
      font-size: 32rpx;
      font-weight: 400;
      color: #909399;
    }
  }
}
</style>
