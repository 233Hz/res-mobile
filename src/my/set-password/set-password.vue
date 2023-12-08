<script setup lang="ts">
import { useSetPassword } from './hooks'

const { form, onSubmit } = useSetPassword()
</script>

<template>
  <GlForm>
    <GlFormItem label="当前密码">
      <input
        class="input"
        type="safe-password"
        placeholder="请输入当前密码"
        password
        v-model="form.opwd"
      />
    </GlFormItem>
    <GlFormItem label="新密码">
      <input
        class="input"
        type="safe-password"
        placeholder="请输入新密码"
        password
        v-model="form.npwd"
      />
    </GlFormItem>
    <GlFormItem label="确认密码">
      <input
        class="input"
        type="safe-password"
        placeholder="请输入确认密码"
        password
        v-model="form.rpwd"
      />
    </GlFormItem>
    <template #submit>
      <button class="submit-button" @tap="onSubmit">确认修改</button>
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
