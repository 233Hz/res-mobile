import type { Resource } from 'types/resource'

export interface LabelValue {
  label: string
  value: string | number
  [key: string]: any
}

export const formRules: FormRules<Resource> = {
  resName: [
    {
      required: true,
      message: '请输入资源名称'
    }
  ],
  resAuth: [
    {
      required: true,
      message: '请选择资源权限'
    }
  ],
  stuDown: [
    {
      required: true,
      message: '请选择是否允许学生下载'
    }
  ],
  sortId: [
    {
      required: true,
      message: '请选择资源分类'
    }
  ],
  navId: [
    {
      required: true,
      message: '请选择资源栏目'
    }
  ],
  resPath: [
    {
      required: true,
      message: '请选择上传资源'
    }
  ]
}

export const findLabelForValue = (list: LabelValue[], value: string | number) =>
  list.find((item) => item.value === value)?.label

export const AUTH_OPTION: LabelValue[] = [
  {
    label: '公有资源',
    value: 1
  },
  {
    label: '私有资源',
    value: 2
  }
]

export const DOWNLOAD_OPTION: LabelValue[] = [
  {
    label: '是',
    value: 1
  },
  {
    label: '否',
    value: 2
  }
]
