<script setup lang="ts">
import { resUrl } from '@/api/file'
import { useRouter } from 'uni-mini-router'
import { useResourceStoreHook } from '@/store/modules/resource'
import type { BannerItem } from 'types/home'

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
const resourceStore = useResourceStoreHook()
const handleTap = (link: string) => {
  if (link && link.length) {
    const index = link.indexOf('?')
    if (index !== -1) {
      const queryStr = link.substring(index + 1)
      const params = new URLSearchParams(queryStr)
      const nid = params.get('nid')
      const snid = params.get('snid')
      const tnid = params.get('tnid')
      console.log(nid, snid, tnid)
      resourceStore.setSearch({
        navId: nid ? +nid : void 0,
        secondNavId: snid ? +snid : void 0,
        threeNavId: tnid ? +tnid : void 0
      })
    }
  }
  router.pushTab({ name: 'resCenter' })
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
      <image
        mode="scaleToFill"
        :src="resUrl(`/${item.imgUrl}`)"
        class="image"
      />
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
