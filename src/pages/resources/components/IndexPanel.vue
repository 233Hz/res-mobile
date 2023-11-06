<script setup lang="ts">
import { ref } from 'vue'

const activeIndex = ref<number[]>([0, 0, 0, 0, 0])

const indexs = ref([
  {
    id: 1,
    children: ['全部', '最新发布', '最多预览']
  },
  {
    children: [
      '全部',
      '六校联盟创新创业大赛',
      '创新创业在线学习资源',
      '创新创业在线学习资源',
      '创新创业典型案例',
      '创新创业典型案例'
    ]
  },
  {
    id: 3,
    children: [
      '全部',
      '上海市医药学校',
      '上海市医药学校',
      '上海市医药学校',
      '上海市医药学校',
      '上海市第二轻工业学校',
      '上海科技管理学校',
      '联盟运营管理'
    ]
  },
  {
    id: 4,
    children: ['全部']
  },
  {
    id: 5,
    children: [
      '全部',
      '产教融合企业',
      '创新创业大赛商业计划书',
      '创新创业课程',
      '创新创业教学课件',
      '创新创业大赛视频'
    ]
  }
])
</script>

<template>
  <view class="index">
    <view class="row" v-for="(item, index1) in indexs" :key="item.id">
      <scroll-view scroll-x class="scroll-view">
        <text
          v-for="(child, index2) in item.children"
          :key="child"
          class="item"
          :class="{ active: activeIndex[index1] === index2 }"
          @tap="activeIndex[index1] = index2"
        >
          {{ child }}
        </text>
      </scroll-view>
    </view>
  </view>
</template>

<style scoped lang="scss">
.index {
  padding: 20rpx;
  display: flex;
  flex-direction: column;
  gap: 10rpx;

  .row {
    .scroll-view {
      flex: 1;
      overflow: hidden;
      white-space: nowrap;

      ::-webkit-scrollbar {
        display: none;
        width: 0;
        height: 0;
        color: transparent;
      }

      .item {
        display: inline-block;
        font-size: 24rpx;
        font-weight: 400;
        padding: 8rpx 16rpx;
        margin: 0 10rpx;
        border-radius: 4px;
        color: #909399;
      }
      .active {
        font-weight: bold;
        color: #e6a23c;
        background-color: #fdf6ec;
      }
    }
  }
}
</style>
