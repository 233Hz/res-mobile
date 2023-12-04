export interface Demand {
  oid: number
  title?: string
  content?: string
  state?: number
  viewNum?: number
  createUserId?: number
  createUserName?: string
  createTime: Date
  updateTime: Date
}

export interface DemandPageParam extends BasePage {
  name?: string
  state?: number
}

export interface DemandData {
  oid?: number
  title: string
  content?: string
}

export interface DemandReplyData {
  reqId: number
  content?: string
}

export interface DemandReply {
  oid: number
  reqId?: number
  content?: string
  createUserId?: number
  createUserName?: string
  createIp?: string
  createTime: Date
  updateTime: Date
}
