<script setup lang="ts">
import { useLogin } from './hooks'
const { safeAreaInsets } = uni.getSystemInfoSync()

const { loading, form, handleLogin, handleRegister, handleNotLogin } =
  useLogin()
</script>

<template>
  <view class="container" :style="{ paddingTop: safeAreaInsets?.top + 'px' }">
    <view class="logo">产教融和双创数字服务平台</view>
    <view class="form">
      <view class="form__item">
        <input
          v-model="form.username"
          class="form__item_input"
          type="text"
          placeholder="用户名"
          placeholder-style="color: #ccc"
        />
      </view>
      <view class="form__item">
        <input
          v-model="form.password"
          class="form__item_input"
          type="safe-password"
          password
          placeholder="密码"
          placeholder-style="color: #ccc"
        />
      </view>
      <view class="form__button">
        <button
          class="login"
          :loading="loading"
          :disabled="loading"
          @tap="handleLogin"
        >
          登录
        </button>
        <button
          class="register"
          :loading="loading"
          :disabled="loading"
          @tap="handleRegister"
        >
          申请注册
        </button>
        <view class="not-login">
          <text class="text" @tap="handleNotLogin">暂不登入</text>
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
      .login {
        color: #fff;
        background-color: #4fb869;
      }

      .register {
        margin-top: 20rpx;
        color: #393a3e;
        background-color: #fff;
      }

      .not-login {
        margin-top: 20rpx;
        text-align: center;

        .text {
          font-size: 28rpx;
          color: #909399;
        }
      }
    }
  }
}
</style>
