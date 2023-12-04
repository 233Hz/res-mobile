<script setup lang="ts">
import { useResourceStoreHook } from '@/store/modules/resource'
import type { BannerItem } from 'types/home'
import { useRouter } from 'uni-mini-router'

interface Props {
  indicatorDots?: boolean
  autoplay?: boolean
  interval?: number
  duration?: number
  list?: BannerItem[]
}

withDefaults(defineProps<Props>(), {
  indicatorDots: true,
  autoplay: true,
  interval: 2000,
  duration: 500,
  list: () => []
})

const router = useRouter()
const handleTap = (link: string) => {
  let params: Record<string, string> = {}
  link.split(',').forEach((item, index) => {
    Number(item) && (params[`cid${index + 1}`] = item)
  })
  useResourceStoreHook().SET_QUERY(params)
  router.pushTab({ name: 'recCenter' })
}
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
    <GlEmpty v-if="!list.length" text="暂无链接" :height="320" />
    <swiper-item
      v-for="item in list"
      :key="item.id"
      @tap="handleTap(item.hrefUrl)"
    >
      <image mode="widthFix" :src="item.imgUrl" class="image" />
    </swiper-item>
  </swiper>
</template>

<style scoped lang="scss">
.swiper {
  width: 100%;
  height: 320rpx;
  border-radius: 20px;
  overflow: hidden;

  .image {
    width: 100%;
    height: 100%;
  }
}
</style>
types/home
