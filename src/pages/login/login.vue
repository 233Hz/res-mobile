<script setup lang="ts">
import { useUserStore } from '@/store'
import { useRouter } from 'uni-mini-router'
const { safeAreaInsets } = uni.getSystemInfoSync()

const userStore = useUserStore()
const router = useRouter()

const loginHandler = () => {
  userStore.setToken(new Date().getTime().toString())
  router.pushTab({ name: 'home' })
}
</script>

<template>
  <view class="container" :style="{ paddingTop: safeAreaInsets?.top + 'px' }">
    <view class="logo">产教融和双创数字服务平台</view>
    <view class="form">
      <view class="form__item">
        <input
          class="form__item_input"
          type="text"
          placeholder="用户名"
          placeholder-style="color: #ccc"
        />
      </view>
      <view class="form__item">
        <input
          class="form__item_input"
          type="safe-password"
          placeholder="密码"
          placeholder-style="color: #ccc"
        />
      </view>
      <button class="form__button" @tap="loginHandler">登录</button>
    </view>
    <!-- <view class="divider">
      <div class="left-line"></div>
      <div class="divider-text">其他登录方式</div>
      <div class="right-line"></div>
    </view> -->
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
  position: relative;
  padding: 40rpx;

  .logo {
    text-align: center;
    color: #4fb869;
    font-weight: bold;
    font-size: 48rpx;
    margin-top: 200rpx;
  }

  .form {
    margin-top: 200rpx;
    display: flex;
    flex-direction: column;
    gap: 40rpx;

    &__item {
      &_input {
        height: 100rpx;
        line-height: 100rpx;
        border-bottom: #ccc 1px solid;
      }
    }

    &__button {
      width: 100%;
      background-color: #4fb869;
      color: #fff;
    }
  }

  .divider {
    display: flex;
    align-items: center;

    .left-line,
    .right-line {
      flex: 1;
      height: 1px;
      background-color: #ccc;
    }

    .divider-text {
      padding: 0 20rpx;
      color: #212121;
    }
  }
}
</style>
