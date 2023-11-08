<script setup lang="ts">
import { useUserStore } from '@/store'
import { useRouter } from 'uni-mini-router'

const userStore = useUserStore()
const router = useRouter()
const { safeAreaInsets } = uni.getSystemInfoSync()

const addAdminRole = () => {
  if (userStore.info.roles.indexOf('admin') == -1) {
    userStore.info.roles.push('admin')
    uni.showToast({ title: '添加成功' })
  } else {
    uni.showToast({ title: '请勿重复添加' })
  }
}

const removeAdminRole = () => {
  if (userStore.info.roles.indexOf('admin') != -1) {
    userStore.info.roles.splice(userStore.info.roles.indexOf('admin'), 1)
    uni.showToast({ title: '移除成功' })
  } else {
    uni.showToast({ title: '已移除' })
  }
}

const logout = () => {
  userStore.reset()
  router.push({ name: 'login' })
}
</script>

<template>
  <view :style="{ paddingTop: safeAreaInsets?.top + 'px' }">
    <view class="list">
      <view class="list__group">
        <view
          class="list__group__item"
          @tap="() => router.push({ name: 'profile' })"
          >我的资料</view
        >
        <view
          class="list__group__item"
          @tap="() => router.push({ name: 'setPassword' })"
          >修改密码</view
        >
        <view
          class="list__group__item"
          @tap="() => router.push({ name: 'downloadRecord' })"
          >下载记录</view
        >
        <view
          class="list__group__item"
          @tap="() => router.push({ name: 'collectRecord' })"
          >我的收藏</view
        >
        <view
          class="list__group__item"
          @tap="() => router.push({ name: 'demand' })"
          >资源需求</view
        >
      </view>
      <view class="list__group">
        <view class="list__group__item" @tap="addAdminRole"
          >添加管理员权限</view
        >
        <view class="list__group__item" @tap="removeAdminRole"
          >移除管理员权限</view
        >
      </view>
      <view class="list__group">
        <view class="list__group__item" @tap="logout">退出登入</view>
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
