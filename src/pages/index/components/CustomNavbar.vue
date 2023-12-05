<script setup lang="ts">
import { ref } from 'vue'
import { useAuthStoreHook } from '@/store/modules/auth'

interface EmitEvent {
  (e: 'on-register'): void
  (e: 'on-search', value: string | undefined): void
}

const emit = defineEmits<EmitEvent>()

const { safeAreaInsets } = uni.getSystemInfoSync()
const searchValue = ref<string>()
const clearSearch = () => (searchValue.value = void 0)
const handleSearch = () => emit('on-search', searchValue.value)
const handleRegister = () => emit('on-register')

defineExpose({ clearSearch })
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
        <input
          class="search-input"
          v-model="searchValue"
          placeholder="关键词搜索"
        />
        <text class="input-icon icon-search" @tap="handleSearch" />
      </view>
      <view class="navbar__button" v-if="!useAuthStoreHook().hasToken()">
        <text class="text" @tap="handleRegister">注册</text>
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
    display: flex;
    align-items: center;
    padding: 10rpx 20rpx;
    border: 1px solid #ccc;
    border-radius: 20px;

    .input-icon {
      flex-shrink: 0;
      height: 100%;
      display: flex;
      align-items: center;
    }

    .search-input {
      flex: 1;
      overflow: hidden;
    }
  }

  &__button {
    padding-right: 20rpx;

    .text {
      font-size: 28rpx;
      font-weight: 400;
      color: #909399;
    }
  }
}
</style>
