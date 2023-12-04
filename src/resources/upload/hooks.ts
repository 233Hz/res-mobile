import { ref } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
import { allCategoryApi } from '@/api/category'
import { columnTreeApi } from '@/api/column'
import { uploadFilePlusUrl, uploadPictureUrl } from '@/api/file'
import {
  AUTH_OPTION,
  DOWNLOAD_OPTION,
  formRules,
  type LabelValue
} from './utils'
import { convertNode } from '@/utils/tree'
import { getResourceByIdApi, uploadResourceApi } from '@/api/resource'
import { validata } from '@/utils/util'
import { useRouter } from 'uni-mini-router'
import createPopup from '@/utils/popup'

interface LableValueTree extends LabelValue {
  children?: LableValueTree[]
}

interface FileItem {
  fileName: string
  fileSize: number
  filePath: string
}

type ColumnIndexItem = {
  index: number | undefined
  value: number | undefined
}
type ColumnIndexTupleItem = ColumnIndexItem | undefined
type ColumnIndexTuple = [
  ColumnIndexTupleItem,
  ColumnIndexTupleItem,
  ColumnIndexTupleItem
]

export const useResourceUpload = () => {
  const router = useRouter()
  const form = ref<any>({
    oid: void 0,
    resName: void 0,
    resAuth: void 0,
    stuDown: void 0,
    sortId: void 0,
    navId: void 0,
    linkRes: void 0,
    resCover: void 0,
    resPath: void 0,
    resSize: void 0,
    content: void 0
  })

  const categoryList = ref<LabelValue[]>([])
  const fetchCategoryList = async () => {
    const { data } = await allCategoryApi()
    categoryList.value = data.map((item) => ({
      label: item.sortName!,
      value: item.oid,
      linkRes: item.linkRes
    }))
  }

  const columnList = ref<
    [LableValueTree[], LableValueTree[], LableValueTree[]]
  >([[], [], []])
  const fetchColumnTreeList = async () => {
    const { data } = await columnTreeApi()
    columnList.value[0] = convertNode(data, (item) => ({
      label: item.title,
      value: item.id
    }))
  }

  const handleResAuthChange: UniHelper.PickerViewOnChange = (event) => {
    form.value.resAuth =
      AUTH_OPTION[event.detail.value as unknown as number].value
  }

  const handleStuDownChange: UniHelper.PickerViewOnChange = (event) => {
    console.log(event.detail.value)

    form.value.stuDown =
      DOWNLOAD_OPTION[event.detail.value as unknown as number].value
    console.log(form.value.stuDown)
  }

  const handleSortIdChange: UniHelper.PickerViewOnChange = (event) => {
    const categoryItem =
      categoryList.value[event.detail.value as unknown as number]
    form.value.sortId = categoryItem?.value
    form.value.linkRes = categoryItem?.linkRes
    console.log(form.value.linkRes)
  }

  const columnValues = ref<ColumnIndexTuple>([void 0, void 0, void 0])
  const handleNavIdChange = (event: any, index: number) => {
    if (columnList.value[index].length) {
      const valueIndex = event.detail.value
      const columnItem = columnList.value[index][valueIndex]
      if (valueIndex !== columnValues.value[index]?.index) {
        let nextIndex = index + 1
        while (nextIndex < columnList.value.length) {
          columnValues.value[nextIndex] = void 0
          columnList.value[nextIndex] = []
          nextIndex++
        }
        if (index + 1 < columnList.value.length) {
          columnList.value[index + 1] = columnItem?.children || []
        }
      }
      console.log(valueIndex)

      columnValues.value[index] = {
        index: valueIndex,
        value: columnItem?.value as number
      }
      columnItem?.value && (form.value.navId = columnItem?.value)
      console.log(form.value.navId)
    }
  }

  const handleCoverUpload = () => {
    // #ifdef H5 || APP-PLUS
    uni.chooseImage({
      count: 1,
      success: (res) => {
        const filePath = res.tempFilePaths[0]
        uploadPicture(filePath, { mark: 'resCover' })
      }
    })
    // #endif

    // #ifdef MP-WEIXIN
    uni.chooseMedia({
      count: 1,
      mediaType: ['image'],
      success: (res) => {
        const { tempFilePath } = res.tempFiles[0]
        uploadPicture(tempFilePath, { mark: 'resCover' })
      }
    })
    // #endif
  }

  const handleFileUpload = () => {
    // #ifdef H5 || APP-PLUS
    uni.chooseFile({
      count: 1,
      success: (res) => {
        const filePath = res.tempFilePaths[0]
        uploadFile(filePath)
      }
    })
    // #endif

    // #ifdef MP-WEIXIN
    uni.chooseMedia({
      count: 1,
      success: (res) => {
        const { tempFilePath } = res.tempFiles[0]
        uploadFile(tempFilePath)
      }
    })
    // #endif
  }

  const onSubmit = async () => {
    const { valid, message } = validata(formRules, form.value)
    if (valid) {
      await uploadResourceApi(form.value)
      createPopup({
        type: 'info',
        cancelText: '继续上传',
        confirmText: '资源列表',
        content: '上传成功',
        onClose: () => resetForm(),
        onConfirm: () => router.push({ name: 'resList' })
      })
    } else {
      uni.showToast({ title: message, icon: 'error' })
    }
  }

  const uploadPicture = (path: string, params?: Record<string, any>) => {
    uni.uploadFile({
      url: uploadPictureUrl,
      name: 'file',
      filePath: path,
      formData: {
        ...params
      },
      success: (res) => {
        if (res.statusCode === 200) {
          const data = JSON.parse(res.data)
          if (data.code === 0) {
            form.value.resCover = data.data.title
            uni.showToast({ title: '上传成功', icon: 'success' })
            return
          }
        }
        uni.showToast({ title: '上传失败', icon: 'success' })
      }
    })
  }

  const fileList = ref<FileItem[]>([])
  const uploadFile = (path: string, params?: Record<string, any>) => {
    uni.uploadFile({
      url: uploadFilePlusUrl,
      name: 'file',
      filePath: path,
      formData: {
        ...params
      },
      success: (res) => {
        if (res.statusCode === 200) {
          const data = JSON.parse(res.data)
          if (data.code === 0) {
            form.value.resPath = data.data.title
            form.value.resSize = data.data.size
            fileList.value = [
              {
                fileName: data.data.url,
                fileSize: data.data.size,
                filePath: data.data.title
              }
            ]
            uni.showToast({ title: '上传成功', icon: 'success' })
            return
          }
        }
        uni.showToast({ title: '上传失败', icon: 'success' })
      }
    })
  }

  const fetchResInfo = async (id: number) => {
    const { data } = await getResourceByIdApi(id)
    form.value = {
      oid: data.oid,
      resName: data.resName,
      resAuth: data.resAuth,
      stuDown: data.stuDown,
      sortId: data.sortId,
      navId: data.navId,
      linkRes: data.linkRes,
      resCover: data.resCover,
      resPath: data.resPath,
      resSize: data.resSize,
      content: data.content
    }
  }

  const resetForm = () => {
    form.value = {
      oid: void 0,
      resName: void 0,
      resAuth: void 0,
      stuDown: void 0,
      sortId: void 0,
      navId: void 0,
      linkRes: void 0,
      resCover: void 0,
      resPath: void 0,
      resSize: void 0,
      content: void 0
    }
  }

  onLoad(async (option) => {
    if (option?.id) {
      form.value.oid = Number(option.id)
      await fetchResInfo(Number(option.id))
    }

    await Promise.all([fetchCategoryList(), fetchColumnTreeList()])
  })

  return {
    form,
    categoryList,
    columnList,
    fileList,
    columnIndexs: columnValues,
    handleResAuthChange,
    handleStuDownChange,
    handleSortIdChange,
    handleNavIdChange,
    handleCoverUpload,
    handleFileUpload,
    onSubmit
  }
}
