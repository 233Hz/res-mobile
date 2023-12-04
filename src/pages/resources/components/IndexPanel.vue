<script setup lang="ts">
import { ref } from 'vue'
import { columnTreeApi } from '@/api/column'
import { convertNode } from '@/utils/tree'
import { onLoad, onShow } from '@dcloudio/uni-app'
import { watch } from 'vue'
import { allCategoryApi } from '@/api/category'
import { computed } from 'vue'
import { useResourceStoreHook } from '@/store/modules/resource'
import type { ResourcePageParams } from 'types/resource'

const props = defineProps<{
  modelValue: ResourcePageParams
}>()

const emit = defineEmits<{
  (e: 'change', value: ResourcePageParams): void
}>()

const searchForm = computed({
  get() {
    return props.modelValue
  },
  set(value: ResourcePageParams) {
    emit('change', value)
  }
})

interface IndexItem {
  label: string
  value: string | number | undefined
  children?: IndexItem[]
}

const orderOptions: IndexItem[] = [
  { label: '最新发布', value: 'v' },
  { label: '最多预览', value: 'd' }
]
const columnOptionsForL1 = ref<IndexItem[]>([])
const columnOptionsForL2 = ref<IndexItem[]>([])
const columnOptionsForL3 = ref<IndexItem[]>([])
const categoryOptions = ref<IndexItem[]>([])

const fetchColumnTree = async () => {
  const { data } = await columnTreeApi()
  columnOptionsForL1.value = convertNode(data, (item) => ({
    label: item.title,
    value: item.id
  }))
}

const fetchCategoryList = async () => {
  const { data } = await allCategoryApi()
  categoryOptions.value = data.map((item) => ({
    label: item.sortName as string,
    value: item.oid
  }))
}

watch(
  () => searchForm.value,
  (value) => {
    if (value.navId) {
      columnOptionsForL2.value =
        columnOptionsForL1.value.find((item) => item.value === value.navId)
          ?.children || []
      searchForm.value.secondNavId = void 0
    }
    if (value.secondNavId) {
      columnOptionsForL3.value =
        columnOptionsForL2.value.find(
          (item) => item.value === value.secondNavId
        )?.children || []
      searchForm.value.threeNavId = void 0
    }
  },
  {
    deep: true
  }
)

onLoad(async () => {
  await Promise.all([fetchColumnTree(), fetchCategoryList()])
})

onShow(() => {
  const { name, cid1, cid2, cid3, tid } = useResourceStoreHook().query
  searchForm.value.key = name
  searchForm.value.navId = cid1
  searchForm.value.secondNavId = cid2
  searchForm.value.threeNavId = cid3
  searchForm.value.sortId = tid
})
</script>

<template>
  <view class="index">
    <!-- 排序 -->
    <view class="row">
      <scroll-view scroll-x class="scroll-view">
        <text
          v-for="item in orderOptions"
          :key="item.value"
          class="item"
          :class="{ active: searchForm.order === item.value }"
          @tap="searchForm.order = item.value as string"
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
          :class="{ active: searchForm.navId === void 0 }"
          @tap="searchForm.navId = void 0"
        >
          全部
        </text>
        <text
          v-for="item in columnOptionsForL1"
          :key="item.value"
          class="item"
          :class="{ active: searchForm.navId === item.value }"
          @tap="searchForm.navId = item.value as number"
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
          :class="{ active: searchForm.secondNavId === void 0 }"
          @tap="searchForm.secondNavId = void 0"
        >
          全部
        </text>
        <text
          v-for="item in columnOptionsForL2"
          :key="item.value"
          class="item"
          :class="{ active: searchForm.secondNavId === item.value }"
          @tap="searchForm.secondNavId = item.value as number"
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
          :class="{ active: searchForm.threeNavId === void 0 }"
          @tap="searchForm.threeNavId = void 0"
        >
          全部
        </text>
        <text
          v-for="item in columnOptionsForL3"
          :key="item.value"
          class="item"
          :class="{ active: searchForm.threeNavId === item.value }"
          @tap="searchForm.threeNavId = item.value as number"
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
          :class="{ active: searchForm.sortId === void 0 }"
          @tap="searchForm.sortId = void 0"
        >
          全部
        </text>
        <text
          v-for="item in categoryOptions"
          :key="item.value"
          class="item"
          :class="{ active: searchForm.sortId === item.value }"
          @tap="searchForm.sortId = item.value as number"
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
        color: #e6a23c;
        background-color: #fdf6ec;
      }
    }
  }
}
</style>
