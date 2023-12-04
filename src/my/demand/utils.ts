export interface FormItem {
  oid: number
  title: string
  content: string
}

export const formRules: FormRules<FormItem> = {
  title: [
    {
      required: true,
      message: '请输入标题'
    }
  ]
}

export interface CommentFormItem {
  reqId: number
  content: string
}
