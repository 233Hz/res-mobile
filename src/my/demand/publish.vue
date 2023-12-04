<script setup lang="ts">
import { useDemandPublish } from './hooks'

const { form, onSubmit } = useDemandPublish()
</script>

<template>
  <view>
    <GlForm>
      <GlFormItem label="需求标题">
        <input type="text" placeholder="请输入需求标题" v-model="form.title" />
      </GlFormItem>
      <GlFormItem label="需求内容">
        <GlEditor v-model="form.content" :height="300" />
      </GlFormItem>
    </GlForm>
    <button class="submit" @tap="onSubmit">提交</button>
  </view>
</template>

<style scoped lang="scss">
.submit {
  margin: 20rpx;
  border-radius: 80rpx;
  border: none;
  background-color: #007aff;
  color: #fff;
}
</style>
