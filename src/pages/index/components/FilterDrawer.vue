<script setup lang="ts">
import { ref } from 'vue'

const form = ref({
  filter1: 0
})

const drawer = ref(false)
const open = () => {
  drawer.value = true
}
const closeHandler = () => {
  drawer.value = false
}

const emit = defineEmits<{
  (event: 'close'): void
}>()

const filter1 = ['发布时间', '下载量']

defineExpose<{
  open: () => void
}>({ open })
</script>

<template>
  <GlDrawer :active="drawer" direction="top" @close="closeHandler">
    <view class="container">
      <view class="form">
        <view class="form__item">
          <view class="form__item__label">排序</view>
          <view class="form__item__content">
            <view
              class="form__item__content__item"
              v-for="(item, index) in filter1"
              :key="index"
              :class="{ active: form.filter1 === index }"
              @tap="() => (form.filter1 = index)"
            >
              {{ item }}
            </view>
          </view>
        </view>
        <view class="form__button">
          <view class="form__button__reset">
            <button class="button">重置</button>
          </view>
          <view class="form__button__confirm">
            <button class="button">确认</button>
          </view>
        </view>
      </view>
    </view>
  </GlDrawer>
</template>

<style scoped lang="scss">
.container {
  padding: 20rpx;

  .form {
    display: flex;
    flex-direction: column;
    gap: 40rpx;
    &__item {
      &__label {
        font-size: 32rpx;
        font-weight: 600;
        margin-bottom: 20rpx;
      }
      &__content {
        display: flex;
        flex-wrap: wrap;
        gap: 10rpx;

        &__item {
          padding: 16rpx 32rpx;
          background-color: #f6f6f6;
          color: #5a5a5a;
          font-size: 28rpx;
          font-weight: 500;
          border-radius: 4px;
        }

        .active {
          background-color: rgba(79, 184, 105, 0.2);
          color: #4fb869;
        }
      }
    }

    &__button {
      display: flex;
      gap: 20rpx;

      .form__button__reset,
      .form__button__confirm {
        flex: 1;
      }

      .form__button__reset {
        .button {
          background-color: #f6f6f6;
          color: #5a5a5a;
        }
      }

      .form__button__confirm {
        .button {
          background-color: rgba(79, 184, 105, 0.2);
          color: #4fb869;
        }
      }
    }
  }
}
</style>
