<script setup lang="ts">
import { useRouter } from 'uni-mini-router'
import { useUserStoreHook } from '@/store'
import createPopup from '@/utils/popup'

const userStore = useUserStoreHook()
const router = useRouter()
const { safeAreaInsets } = uni.getSystemInfoSync()

const handleLogout = () => {
  createPopup({
    type: 'info',
    content: '是否确认退出',
    onConfirm: () => {
      userStore.logout()
      router.push({ name: 'login' })
    }
  })
}
</script>

<template>
  <view :style="{ paddingTop: safeAreaInsets?.top + 'px' }">
    <view class="list">
      <view class="list__group">
        <view
          class="list__group__item"
          @tap="() => router.push({ name: 'profile' })"
        >
          <navigator url="/my/profile/profile" hover-class="none">
            我的资料
          </navigator>
        </view>
        <view
          class="list__group__item"
          @tap="() => router.push({ name: 'setPassword' })"
        >
          <navigator url="/my/set-password/set-password" hover-class="none">
            修改密码
          </navigator>
        </view>
        <view
          class="list__group__item"
          @tap="() => router.push({ name: 'downloadRecord' })"
        >
          <navigator url="/my/download/download" hover-class="none">
            下载记录
          </navigator>
        </view>
        <view
          class="list__group__item"
          @tap="() => router.push({ name: 'collectRecord' })"
        >
          <navigator url="/my/collect/collect" hover-class="none">
            我的收藏
          </navigator>
        </view>
        <view
          class="list__group__item"
          @tap="() => router.push({ name: 'demand' })"
        >
          <navigator url="/my/demand/demand" hover-class="none">
            资源需求
          </navigator>
        </view>
      </view>
      <view class="list__group">
        <view class="list__group__item" @tap="handleLogout">退出登入</view>
      </view>
    </view>
  </view>
</template>

<style scoped lang="scss">
.list {
  padding: 30rpx 0;
  display: flex;
  flex-direction: column;
  gap: 30rpx;

  &__group {
    background-color: #fff;

    &__item {
      padding: 0 20rpx;
      height: 100rpx;
      line-height: 100rpx;
      font-size: 32rpx;
      font-weight: 400;
      color: #212121;
      position: relative;
      border-bottom: 1px solid #f7f7f7;

      &:last-child {
        border-bottom: none;
      }

      &:after {
        content: '\e668';
        font-family: 'iconfont' !important;
        position: absolute;
        right: 40rpx;
        top: 50%;
        transform: translateY(-50%);
      }
    }
  }
}
</style>
@/utils/popup
