<script setup lang="ts">
import type { BannerItem } from '@/types/home'

interface Props {
  indicatorDots?: boolean
  autoplay?: boolean
  interval?: number
  duration?: number
  list: BannerItem[]
}

withDefaults(defineProps<Props>(), {
  indicatorDots: true,
  autoplay: true,
  interval: 2000,
  duration: 500
})
</script>

<template>
  <swiper
    class="swiper"
    circular
    :indicator-dots="indicatorDots"
    :autoplay="autoplay"
    :interval="interval"
    :duration="duration"
  >
    <swiper-item v-for="item in list" :key="item.id">
      <navigator :url="item.hrefUrl" hover-class="none" class="navigator">
        <image mode="widthFix" :src="item.imgUrl" class="image" />
      </navigator>
      >
    </swiper-item>
  </swiper>
</template>

<style scoped lang="scss">
.swiper {
  width: 100%;
  height: 320rpx;
  border-radius: 20px;
  overflow: hidden;

  .navigator,
  .image {
    width: 100%;
    height: 100%;
  }
}
</style>
