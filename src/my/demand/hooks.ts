import { computed, ref } from 'vue'
import { onLoad, onShow } from '@dcloudio/uni-app'
import { useRouter } from 'uni-mini-router'
import {
  delDemandApi,
  delDemandReplyApi,
  demandReplyListApi,
  getDemandByIdApi,
  pageDemandeForUserApi,
  saveDemandApi,
  saveDemandReplyApi
} from '@/api/demand'
import type { Demand } from 'types/demand'
import { validata } from '@/utils/util'
import { formRules, type FormItem, type CommentFormItem } from './utils'
import createPopup from '@/utils/popup'

export const useDemand = () => {
  const router = useRouter()
  const loading = ref(false)
  const pagination = ref({
    total: 0,
    current: 1,
    size: 10
  })
  const dataList = ref<Demand[]>([])
  const hasNext = computed(
    () =>
      pagination.value.current * pagination.value.size < pagination.value.total
  )
  const onFeatch = async () => {
    loading.value = true
    try {
      const {
        data: { total, records }
      } = await pageDemandeForUserApi({
        current: pagination.value.current,
        size: pagination.value.size
      })
      pagination.value.total = total
      dataList.value = records
    } catch (error) {
      /* empty */
    } finally {
      loading.value = false
    }
  }
  const handleScrollToLower = async () => {
    if (hasNext.value) {
      pagination.value.current++
      loading.value = true
      try {
        const {
          data: { records }
        } = await pageDemandeForUserApi({
          current: pagination.value.current,
          size: pagination.value.size
        })
        records.forEach((item) => dataList.value.push(item))
      } catch (error) {
        /* empty */
      } finally {
        loading.value = false
      }
    }
  }

  const handlePreview = (id: number) =>
    router.push({ name: 'demandDetail', params: { id: id + '' } })

  const handlePublish = () => router.push({ name: 'demandPublish' })

  const handleEdit = (id: number) =>
    router.push({ name: 'demandPublish', params: { id: id + '' } })

  const handleDelete = (id: number) => {
    createPopup({
      type: 'error',
      content: '是否要删除该需求',
      onConfirm: async () => {
        await delDemandApi([id])
        uni.showToast({ title: '删除成功', icon: 'success' })
        onFeatch()
      }
    })
  }

  onShow(async () => {
    await onFeatch()
  })

  return {
    loading,
    hasNext,
    dataList,
    handlePreview,
    handlePublish,
    handleEdit,
    handleDelete,
    handleScrollToLower
  }
}

export const useDemandPublish = () => {
  const router = useRouter()
  const form = ref<Partial<FormItem>>({
    oid: void 0,
    title: void 0,
    content: void 0
  })

  const onSubmit = async () => {
    const { valid, message } = validata(formRules, form.value)
    if (valid) {
      await saveDemandApi(form.value as FormItem)
      uni.showToast({ title: '发布成功', icon: 'success' })
      router.back()
    } else {
      uni.showToast({ title: message, icon: 'error' })
    }
  }

  onLoad(async (options) => {
    console.log(options)
    if (options && options.id) {
      const { data } = await getDemandByIdApi(Number(options.id))
      form.value.oid = data.oid
      form.value.title = data.title
      form.value.content = data.content
    }
  })

  return {
    form,
    onSubmit
  }
}

export const useDemandDetail = () => {
  const form = ref<Partial<CommentFormItem>>({
    reqId: void 0,
    content: void 0
  })
  const data = ref<Demand>()
  const commentList = ref<Demand[]>([])
  const onFetch = async () => {
    const id = form.value.reqId as number
    const { data: obj } = await getDemandByIdApi(id)
    data.value = obj
    const { data: list } = await demandReplyListApi(id)
    commentList.value = list
  }

  const handleCommentReply = async () => {
    if (form.value.content) {
      await saveDemandReplyApi(form.value as CommentFormItem)
      uni.showToast({ title: '回复成功', icon: 'success' })
      onFetch()
      form.value.content = void 0
    } else {
      uni.showToast({ title: '请输入回复内容', icon: 'error' })
    }
  }

  const handleCommentDelete = async (id: number) => {
    createPopup({
      type: 'error',
      content: '是否要删除该评论',
      onConfirm: async () => {
        await delDemandReplyApi(id)
        uni.showToast({ title: '删除成功', icon: 'success' })
        onFetch()
      }
    })
  }

  onLoad(async (options) => {
    if (options && options.id) {
      form.value.reqId = Number(options.id)
      await onFetch()
    }
  })

  return {
    form,
    data,
    commentList,
    handleCommentReply,
    handleCommentDelete
  }
}
