<script setup lang="ts">
interface Props {
  text?: string
  height?: number
}

withDefaults(defineProps<Props>(), {
  text: '暂无数据',
  height: 300
})
</script>

<template>
  <view class="wrap" :style="{ height: height + 'rpx' }">
    <slot name="text">
      <text>{{ text }}</text>
    </slot>
  </view>
</template>

<style scoped lang="scss">
.wrap {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #999;
}
</style>
