<script setup lang="ts">
import { ref } from 'vue'

const profile = ref<any>({
  password1: void 0,
  password2: void 0,
  password3: void 0
})
</script>

<template>
  <view class="form">
    <view class="form-content">
      <view class="form-item">
        <text class="label">当前密码</text>
        <view class="content">
          <input
            class="input"
            type="safe-password"
            placeholder="请输入当前密码"
            :value="profile.password1"
          />
        </view>
      </view>
      <view class="form-item">
        <text class="label">新密码</text>
        <view class="content">
          <input
            class="input"
            type="safe-password"
            placeholder="请输入新密码"
            :value="profile.password2"
          />
        </view>
      </view>
      <view class="form-item">
        <text class="label">确认密码</text>
        <view class="content">
          <input
            class="input"
            type="safe-password"
            placeholder="请输入确认密码"
            :value="profile.password3"
          />
        </view>
      </view>
    </view>
    <button class="form-button">确认修改</button>
  </view>
</template>

<style scoped lang="scss">
.form {
  padding: 20rpx;

  .form-content {
    background-color: #fff;
    padding: 20rpx;
    border-radius: 12px;

    .form-item {
      display: flex;
      gap: 20rpx;
      border-bottom: #f7f7f7 solid 1px;
      overflow: hidden;
      padding: 30rpx 20rpx;

      &:last-child {
        border: none;
      }

      .label {
        width: 160rpx;
        color: #303133;
        font-size: 28rpx;
      }

      .content {
        flex: 1;

        .radio {
          margin-right: 20rpx;

          &:last-child {
            margin-right: 0;
          }
        }
      }
    }
  }

  .form-button {
    margin-top: 20rpx;
    border-radius: 80rpx;
    border: none;
    background-color: #007aff;
    color: #fff;
  }
}
</style>
