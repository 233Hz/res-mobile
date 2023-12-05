<script setup lang="ts">
import { useDemandPublish } from './hooks'

const { form, onSubmit } = useDemandPublish()
</script>

<template>
  <GlForm>
    <GlFormItem label="需求标题">
      <input type="text" placeholder="请输入需求标题" v-model="form.title" />
    </GlFormItem>
    <GlFormItem label="需求内容">
      <GlEditor v-model="form.content" :height="300" />
    </GlFormItem>
    <template #submit>
      <button class="submit-button" @tap="onSubmit">提交</button>
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
