export interface FormItem {
  oid: number
  loginName: string
  userName: string
  sex: number
  phone: string
  email: string
  idCard: string
  address: string
}

export type FormData = Partial<FormItem>
