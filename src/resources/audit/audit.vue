<script setup lang="ts">
import SearchPanel from './components/SearchPanel.vue'
import ResourcesList from './components/ResourcesList.vue'
</script>

<template>
  <view class="viewport">
    <SearchPanel />
    <scroll-view scroll-y class="scroll-view">
      <ResourcesList />
    </scroll-view>
  </view>
</template>

<style>
page {
  height: 100%;
  overflow: hidden;
}
</style>

<style scoped lang="scss">
.viewport {
  height: 100%;
  display: flex;
  flex-direction: column;

  .scroll-view {
    flex: 1;
    overflow: hidden;
  }
}
</style>
