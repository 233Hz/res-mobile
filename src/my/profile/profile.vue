<script setup lang="ts">
import { useProfile } from './hooks'

const { form, handleGenderChange, onSubmit } = useProfile()
</script>

<template>
  <view class="form">
    <view class="form-content">
      <view class="form-item">
        <text class="label">登录账号</text>
        <view class="content">
          <input
            disabled
            class="input"
            type="text"
            placeholder="请输入登入账号"
            :value="form.loginName"
          />
        </view>
      </view>
      <view class="form-item">
        <text class="label">姓名</text>
        <view class="content">
          <input
            class="input"
            type="text"
            placeholder="请输入姓名"
            v-model="form.userName"
          />
        </view>
      </view>
      <view class="form-item">
        <text class="label">性别</text>
        <view class="content">
          <radio-group @change="handleGenderChange">
            <label class="radio">
              <radio value="1" :checked="form.sex === 1" color="#007aff" />
              男
            </label>
            <label class="radio">
              <radio value="2" :checked="form.sex === 2" color="#007aff" />
              女
            </label>
          </radio-group>
        </view>
      </view>
      <view class="form-item">
        <text class="label">手机号码</text>
        <view class="content">
          <input
            class="input"
            type="text"
            placeholder="请输入手机号码"
            v-model="form.mobile"
          />
        </view>
      </view>
      <view class="form-item">
        <text class="label">电子邮箱</text>
        <view class="content">
          <input
            class="input"
            type="text"
            placeholder="请输入电子邮箱"
            v-model="form.email"
          />
        </view>
      </view>
      <view class="form-item">
        <text class="label">身份证号</text>
        <view class="content">
          <input
            class="input"
            type="text"
            placeholder="请输入身份证号"
            v-model="form.idCard"
          />
        </view>
      </view>
      <view class="form-item">
        <text class="label">联系地址</text>
        <view class="content">
          <input
            class="input"
            type="text"
            placeholder="请输入联系地址"
            v-model="form.address"
          />
        </view>
      </view>
    </view>
    <button class="form-button" @tap="onSubmit">确认修改</button>
  </view>
</template>

<style scoped lang="scss">
.form {
  padding: 20rpx;
  position: relative;

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
