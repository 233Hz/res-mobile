<script setup lang="ts">
interface Props {
  active: boolean
  size?: string
  direction?: 'left' | 'right' | 'top' | 'bottom'
}

const { direction, size } = withDefaults(defineProps<Props>(), {
  size: 'auto',
  direction: 'right'
})

const close = () => {
  emit('close')
}

const emit = defineEmits<{
  (event: 'close'): void
}>()
</script>

<template>
  <view v-if="active" class="drawer" @tap="close">
    <view
      :class="direction"
      class="content"
      :style="{
        width: ['top', 'bottom'].includes(direction) ? '100%' : size,
        height: ['left', 'right'].includes(direction) ? '100%' : size
      }"
      @tap.stop=""
    >
      <slot>aaa</slot>
    </view>
  </view>
</template>

<style scoped lang="scss">
.drawer {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 9999;
  opacity: 1;

  .content {
    position: absolute;
    background-color: #fff;
  }
}

.left {
  left: 0;
}

.right {
  right: 0;
}

.top {
  top: 0;
}

.bottom {
  bottom: 0;
}
</style>
