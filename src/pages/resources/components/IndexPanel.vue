<script setup lang="ts">
import { ref } from 'vue'
import { columnTreeApi } from '@/api/column'
import { convertNode } from '@/utils/tree'
import { onLoad, onShow } from '@dcloudio/uni-app'
import { allCategoryApi } from '@/api/category'
import { computed } from 'vue'
import type { ResourcePageParams } from 'types/resource'
import { useResourceStoreHook } from '@/store/modules/resource'

interface IndexItem {
  label: string
  value: string | number | undefined
  children?: IndexItem[]
}

interface EmitEvent {
  (e: 'change', value: ResourcePageParams): void
  (e: 'searchChange', value: IndexItem): void
}

const props = defineProps<{
  modelValue: ResourcePageParams
}>()

const emit = defineEmits<EmitEvent>()

const searchForm = computed({
  get() {
    return props.modelValue
  },
  set(value: ResourcePageParams) {
    emit('change', value)
  }
})

const orderOptions: IndexItem[] = [
  { label: '最新发布', value: 'v' },
  { label: '最多预览', value: 'd' }
]
const columnOptions1 = ref<IndexItem[]>([])
const columnOptions2 = ref<IndexItem[]>([])
const columnOptions3 = ref<IndexItem[]>([])
const categoryOptions = ref<IndexItem[]>([])

const fetchColumnTree = async () => {
  const { data } = await columnTreeApi()
  columnOptions1.value = convertNode(data, (item) => ({
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

const handleNavIdChange = (item: IndexItem | undefined) => {
  searchForm.value.navId = item?.value as number
  if (item) {
    columnOptions2.value = item.children || []
    columnOptions3.value = []
    searchForm.value.secondNavId = void 0
    searchForm.value.threeNavId = void 0
  }
}

const handleSecondNavIdChange = (item: IndexItem | undefined) => {
  searchForm.value.secondNavId = item?.value as number
  if (item) {
    columnOptions3.value = item.children || []
    searchForm.value.threeNavId = void 0
  }
}

onLoad(async () => {
  await Promise.all([fetchColumnTree(), fetchCategoryList()])
  console.log(columnOptions1.value)
})

onShow(() => {
  const { name, cid1, cid2, cid3, tid } = useResourceStoreHook().query
  const navId = Number(cid1)
  const secondNavId = Number(cid2)
  const threeNavId = Number(cid3)
  const sortId = Number(tid)

  if (navId) {
    columnOptions2.value =
      columnOptions1.value.find((item) => item.value == navId)?.children || []
    console.log(columnOptions2.value)
    columnOptions3.value = []
  }
  if (secondNavId) {
    columnOptions3.value =
      columnOptions2.value.find((item) => item.value == secondNavId)
        ?.children || []
    console.log(columnOptions3.value)
  }

  searchForm.value = {
    ...searchForm.value,
    key: name,
    navId: navId ? navId : void 0,
    secondNavId: secondNavId ? secondNavId : void 0,
    threeNavId: threeNavId ? threeNavId : void 0,
    sortId: sortId ? sortId : void 0
  }
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
          :class="{ active: searchForm.order == item.value }"
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
          :class="{ active: searchForm.navId == void 0 }"
          @tap="handleNavIdChange(void 0)"
        >
          全部
        </text>
        <text
          v-for="item in columnOptions1"
          :key="item.value"
          class="item"
          :class="{ active: searchForm.navId == item.value }"
          @tap="handleNavIdChange(item)"
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
          :class="{ active: searchForm.secondNavId == void 0 }"
          @tap="handleSecondNavIdChange(void 0)"
        >
          全部
        </text>
        <text
          v-for="item in columnOptions2"
          :key="item.value"
          class="item"
          :class="{ active: searchForm.secondNavId == item.value }"
          @tap="handleSecondNavIdChange(item)"
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
          :class="{ active: searchForm.threeNavId == void 0 }"
          @tap="searchForm.threeNavId = void 0"
        >
          全部
        </text>
        <text
          v-for="item in columnOptions3"
          :key="item.value"
          class="item"
          :class="{ active: searchForm.threeNavId == item.value }"
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
          :class="{ active: searchForm.sortId == void 0 }"
          @tap="searchForm.sortId = void 0"
        >
          全部
        </text>
        <text
          v-for="item in categoryOptions"
          :key="item.value"
          class="item"
          :class="{ active: searchForm.sortId == item.value }"
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
