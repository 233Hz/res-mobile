<script setup lang="ts">
interface Props {
  label?: string
  labelWidth?: string
}

withDefaults(defineProps<Props>(), {
  labelWidth: '120rpx'
})
</script>

<template>
  <view class="form-item">
    <text class="label" :style="{ width: labelWidth }">
      <slot name="label">{{ label }}</slot>
    </text>
    <view class="content">
      <slot name="default"></slot>
    </view>
  </view>
</template>

<style scoped lang="scss">
.form-item {
  display: flex;
  gap: 20rpx;
  padding: 30rpx 0;
  border-bottom: #f7f7f7 solid 1px;

  &:last-child {
    border: none;
  }

  .label {
    color: #303133;
    font-size: 28rpx;
    flex-shrink: 0;
  }

  .content {
    flex: 1;
  }
}
</style>
