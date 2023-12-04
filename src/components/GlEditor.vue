<script lang="ts" setup>
import { computed, onBeforeUnmount, shallowRef } from 'vue'
import '@wangeditor/editor/dist/css/style.css' // 引入 css
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'
import { useAuthStoreHook } from '@/store'
import type { IEditorConfig, IToolbarConfig } from '@wangeditor/editor'

const authStore = useAuthStoreHook()

interface Props {
  modelValue: string | undefined
  height?: number | string // 编辑器的高度
}
type InsertFnType = (url: string, alt: string, href: string) => void

interface EmitEvent {
  (e: 'update:modelValue', params: string): void
}
const props = withDefaults(defineProps<Props>(), {
  modelValue: '',
  height: 400
})
const emit = defineEmits<EmitEvent>()
const valueHtml = computed({
  get() {
    return props.modelValue
  },
  set(value: string) {
    emit('update:modelValue', value)
  }
})
// 编辑器实例，必须用 shallowRef
const editorRef = shallowRef()

const mode = 'simple'
const toolbarConfig: Partial<IToolbarConfig> = {
  toolbarKeys: [
    'blockquote',
    'header1',
    'header2',
    'header3',
    'bold',
    'underline',
    'italic',
    'through',
    'color',
    'bgColor',
    'clearStyle',
    'bulletedList',
    'numberedList',
    'justifyLeft',
    'justifyRight',
    'justifyCenter',
    'insertLink',
    'insertTable',
    'codeBlock',
    'undo',
    'redo'
  ],
  excludeKeys: ['fullScreen']
}
const uploadUrl = import.meta.env.VITE_UPLOAD_API
const editorConfig: Partial<IEditorConfig> = {
  placeholder: '请输入内容...',
  MENU_CONF: {
    uploadImage: {
      base64LimitSize: 5 * 1024, // 5k
      server: uploadUrl,
      fieldName: 'file',
      // 单个文件的最大体积限制，默认为 2M
      maxFileSize: 1024 * 1024, // 1M
      // 最多可上传几个文件，默认为 100
      maxNumberOfFiles: 10,
      // 选择文件时的类型限制，默认为 ['image/*'] 。如不想限制，则设置为 []
      allowedFileTypes: ['image/*'],
      // 自定义上传参数，例如传递验证的 token 等。参数会被添加到 formData 中，一起上传到服务端。
      meta: {
        mark: ''
      },
      headers: {
        [authStore.tokenKey as string]: authStore.tokenValue
      },
      // 将 meta 拼接到 url 参数中，默认 false
      metaWithUrl: false,
      // 跨域是否传递 cookie ，默认为 false
      withCredentials: true,
      // 超时时间，默认为 10 秒
      timeout: 5 * 1000, // 5 秒
      onSuccess(file: File, res: any) {
        console.log('onSuccess', res)
      },
      onError(file: File, err: any, res: any) {
        uni.showToast({
          title: '上传错误，请联系管理员',
          icon: 'error'
        })
        console.error('error', err)
        console.error('res', res)
      },
      customInsert(res: any, insertFn: InsertFnType) {
        insertFn('https://picsum.photos/200/300', res.data.title, '')
      }
    }
  }
}

// 组件销毁时，也及时销毁编辑器
onBeforeUnmount(() => {
  const { value } = editorRef
  if (value === null) return
  value.destroy()
})
const handleCreated = (editor: any) => {
  editorRef.value = editor // 记录 editor 实例，重要！
}
</script>

<template>
  <div style="width: 100%; border: 1px solid #ccc">
    <Toolbar
      style="border-bottom: 1px solid #ccc"
      :editor="editorRef"
      :defaultConfig="toolbarConfig"
      :mode="mode"
    />
    <Editor
      v-model="valueHtml"
      :style="{ height: height + 'px', 'overflow-y': 'hidden' }"
      :defaultConfig="editorConfig"
      :mode="mode"
      @onCreated="handleCreated"
    />
  </div>
</template>
