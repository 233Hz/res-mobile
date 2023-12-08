<script setup lang="ts">
import { useResourceStoreHook } from '@/store/modules/resource'

const resourceStore = useResourceStoreHook()
</script>

<template>
  <view class="index">
    <!-- 排序 -->
    <view class="row">
      <scroll-view scroll-x class="scroll-view">
        <text
          v-for="item in resourceStore.orderOptions"
          :key="item.value"
          class="item"
          :class="{ active: resourceStore.search.order == item.value }"
          @tap="resourceStore.search.order = item.value as string"
        >
          {{ item.label }}
        </text>
      </scroll-view>
    </view>
    <!-- 一级栏目 -->
    <view class="row">
      <scroll-view scroll-x class="scroll-view">
        <text
          class="item"
          :class="{ active: resourceStore.search.navId == void 0 }"
          @tap="resourceStore.setSearch({ navId: void 0 }, true)"
        >
          全部
        </text>
        <text
          v-for="item in resourceStore.columnOptions1"
          :key="item.value"
          class="item"
          :class="{ active: resourceStore.search.navId == item.value }"
          @tap="resourceStore.setSearch({ navId: item.value as number }, true)"
        >
          {{ item.label }}
        </text>
      </scroll-view>
    </view>
    <!-- 二级栏目 -->
    <view class="row">
      <scroll-view scroll-x class="scroll-view">
        <text
          class="item"
          :class="{ active: resourceStore.search.secondNavId == void 0 }"
          @tap="resourceStore.setSearch({ secondNavId: void 0 }, true)"
        >
          全部
        </text>
        <text
          v-for="item in resourceStore.columnOptions2"
          :key="item.value"
          class="item"
          :class="{ active: resourceStore.search.secondNavId == item.value }"
          @tap="
            resourceStore.setSearch({ secondNavId: item.value as number }, true)
          "
        >
          {{ item.label }}
        </text>
      </scroll-view>
    </view>
    <!-- 三级栏目 -->
    <view class="row">
      <scroll-view scroll-x class="scroll-view">
        <text
          class="item"
          :class="{ active: resourceStore.search.threeNavId == void 0 }"
          @tap="resourceStore.setSearch({ threeNavId: void 0 }, true)"
        >
          全部
        </text>
        <text
          v-for="item in resourceStore.columnOptions3"
          :key="item.value"
          class="item"
          :class="{ active: resourceStore.search.threeNavId == item.value }"
          @tap="
            resourceStore.setSearch({ threeNavId: item.value as number }, true)
          "
        >
          {{ item.label }}
        </text>
      </scroll-view>
    </view>
    <!-- 分类 -->
    <view class="row">
      <scroll-view scroll-x class="scroll-view">
        <text
          class="item"
          :class="{ active: resourceStore.search.sortId == void 0 }"
          @tap="resourceStore.search.sortId = void 0"
        >
          全部
        </text>
        <text
          v-for="item in resourceStore.categoryOptions"
          :key="item.value"
          class="item"
          :class="{ active: resourceStore.search.sortId == item.value }"
          @tap="resourceStore.search.sortId = item.value as number"
        >
          {{ item.label }}
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
        color: var(--system-color);
        background-color: rgba(79, 184, 105, 0.1);
      }
    }
  }
}
</style>
