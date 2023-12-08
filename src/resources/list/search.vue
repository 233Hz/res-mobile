<script setup lang="ts">
import { ref } from 'vue'
import type { Search } from './hooks'

interface EmitEvent {
  (e: 'on-search', search: Search): void
  (e: 'tag-change', tag: number | undefined): void
}

const states = [
  {
    label: '全部',
    value: void 0
  },
  {
    label: '待审核',
    value: 2
  },
  {
    label: '审核中',
    value: 3
  },
  {
    label: '已下架',
    value: 4
  },
  {
    label: '未通过',
    value: 5
  },
  {
    label: '已发布',
    value: 8
  }
]

const emit = defineEmits<EmitEvent>()

const search = ref<Search>({
  name: void 0,
  state: void 0
})

const onSearch = () => emit('on-search', search.value)
const handleTagChange = (tag: number | undefined) => {
  search.value.state = tag
  emit('tag-change', tag)
}
</script>

<template>
  <view class="container">
    <view class="search-input">
      <navigator url="/resources/upload/upload" hover-class="none">
        <text class="icon-upload" />
      </navigator>
      <view class="search-input__left">
        <label class="icon-search" />
        <input
          v-model="search.name"
          prefixIcon="search"
          placeholder="搜索资源名称"
          class="input"
        />
      </view>
      <text class="search-text" @tap="onSearch">搜索</text>
    </view>
    <scroll-view scroll-x class="scroll-view hidden-scroll">
      <text
        class="tag-item"
        v-for="item in states"
        :key="item.value"
        :class="{ active: search.state === item.value }"
        @tap="handleTagChange(item.value)"
      >
        {{ item.label }}
      </text>
    </scroll-view>
  </view>
</template>

<style scoped lang="scss">
.container {
  padding: 20rpx;

  .search-input {
    display: flex;
    align-items: center;
    gap: 20rpx;

    .icon-upload {
      font-size: 60rpx;
      flex-shrink: 0;
    }

    .search-input__left {
      flex: 1;
      padding: 20rpx;
      display: flex;
      align-items: center;
      gap: 20rpx;
      border-radius: 20px;
      border: #ddd solid 1px;

      .icon-search {
        font-size: 28rpx;
      }

      .input {
        flex: 1;
      }
    }
    .search-text {
      font-size: 28rpx;
      margin-right: 20rpx;
      flex-shrink: 0;
    }
  }

  .scroll-view {
    margin-top: 20rpx;
    white-space: nowrap;

    .tag-item {
      display: inline-block;
      padding: 12rpx 24rpx;
      background-color: #fff;
      color: #212121;
      margin: 0 10rpx;
      font-size: 28rpx;
      font-weight: 500;
      border-radius: 20px;

      &:first-child {
        margin-left: 0;
      }

      &:last-child {
        margin-right: 0;
      }
    }

    .active {
      color: #4fb869;
      background-color: #d8f7e1;
    }
  }
}
</style>
