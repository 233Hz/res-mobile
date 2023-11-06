import GlSwiper from '@/components/GlSwiper.vue'
import GlCard from '@/components/GlCard.vue'
import GlDrawer from '@/components/GlDrawer.vue'

declare module 'vue' {
  export interface GlobalComponents {
    GlSwiper: typeof GlSwiper
    GlCard: typeof GlCard
    GlDrawer: typeof GlDrawer
  }
}

export type GlSwiperInstance = InstanceType<typeof GlSwiper>
export type GlCardInstance = InstanceType<typeof GlCard>
export type GlDrawerInstance = InstanceType<typeof GlDrawer>
