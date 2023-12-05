<template>
  <view class="form">
    <view class="form__content">
      <slot name="default"></slot>
    </view>
    <slot name="submit"></slot>
  </view>
</template>

<style scoped lang="scss">
.form {
  margin: 20rpx;

  &__content {
    padding: 20rpx;
    background-color: #fff;
    border-radius: 12px;
  }

  &__submit {
    margin-top: 20rpx;
  }
}
</style>
