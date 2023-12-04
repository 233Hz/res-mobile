export interface Notify {
  oid: number
  title?: string
  content?: string
  state?: number
  createUserId?: number
  createUserName?: string
  attachment?: string
  attachmentName?: string
  viewNum?: number
  createTime: Date
  updateTime: Date
}

export interface NotifyPageParams extends BasePage {
  name?: string
}
