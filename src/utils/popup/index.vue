<script setup lang="ts">
import { ref } from 'vue'
import type { UniPopupInstance } from '@uni-helper/uni-ui-types'

interface Props {
  type?: UniHelper.UniPopupProps['type']
  options?: UniHelper.UniPopupDialogProps
  onClose: UniHelper.UniPopupDialogOnClose
}

withDefaults(defineProps<Props>(), {
  type: 'dialog',
  options: () => ({
    type: 'info',
    content: '',
    confirmText: '确定',
    cancelText: '取消'
  })
})

const popupRef = ref<UniPopupInstance>()

const open = () => {
  const open = popupRef.value?.open
  open && open()
}

defineExpose({ open })
</script>

<template>
  <uni-popup ref="popupRef" :type="type">
    <uni-popup-dialog v-bind="options" @close="onClose" />
  </uni-popup>
</template>
