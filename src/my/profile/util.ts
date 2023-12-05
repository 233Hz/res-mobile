export interface FormItem {
  oid: number
  loginName: string
  userName: string
  sex: number
  mobile: string
  email: string
  idCard: string
  address: string
}

export type FormData = Partial<FormItem>
