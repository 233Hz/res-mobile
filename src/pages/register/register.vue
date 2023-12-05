<script setup lang="ts">
import { useRegister } from './hooks'

const { loading, form, handleSexChange, onSubmit } = useRegister()
</script>

<template>
  <GlForm>
    <GlFormItem label="姓名">
      <input
        class="input"
        type="text"
        placeholder="请输入姓名"
        v-model="form.userName"
      />
    </GlFormItem>
    <GlFormItem label="性别">
      <radio-group @change="handleSexChange">
        <label class="radio">
          <radio value="1" :checked="form.sex === 1" color="#009688" />
          男
        </label>
        <label class="radio">
          <radio value="2" :checked="form.sex === 2" color="#009688" />
          女
        </label>
      </radio-group>
    </GlFormItem>
    <GlFormItem label="手机号码">
      <input
        class="input"
        type="text"
        placeholder="请输入手机号码"
        v-model="form.phone"
      />
    </GlFormItem>
    <GlFormItem label="电子邮箱">
      <input
        class="input"
        type="text"
        placeholder="请输入电子邮箱"
        v-model="form.email"
      />
    </GlFormItem>
    <GlFormItem label="身份证号">
      <input
        class="input"
        type="text"
        placeholder="请输入身份证号"
        v-model="form.idCard"
      />
    </GlFormItem>
    <GlFormItem label="联系地址">
      <input
        class="input"
        type="text"
        placeholder="请输入联系地址"
        v-model="form.address"
      />
    </GlFormItem>
    <template #submit>
      <button
        class="submit-button"
        :loading="loading"
        :disabled="loading"
        @tap="onSubmit"
      >
        提交
      </button>
    </template>
  </GlForm>
</template>

<style scoped lang="scss">
.submit-button {
  margin-top: 20rpx;
  border-radius: 80rpx;
  border: none;
  background-color: var(--system-color);
  color: #fff;
}
</style>
