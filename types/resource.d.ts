export interface Resource {
  oid: number
  resName: string
  resPath: string
  resType: number
  resCover: string
  resSize: number
  resAuth: number
  content: string
  navId: number
  sortId: number
  stuDown: number
  viewNum: number
  downNum: number
  state: number
  createUserId: number
  createUserName: string
  createTime: Date
  updateTime: Date
  navName: string
  sortName: string
  auditRecordId: number
  collectId: number
  sortPic: string
  linkRes: string
  canDownFlag: boolean
  downloadTime: Date
  collectTime: Date
}

export interface ResourceNewOrderData {
  order?: 'd' | null
  limitNum?: number
}

export interface ResourcePageParams extends BasePage {
  key?: string
  navId?: number
  secondNavId?: number
  threeNavId?: number
  sortId?: number
  order?: string
}

export type ResourceData = Partial<Resource, 'oid' | 'resCover' | 'content'> &
  Required<
    Pick<
      Resource,
      'resName' | 'resAuth' | 'stuDown' | 'sortId' | 'navId' | 'resPath'
    >
  >

export interface ResourceAuthPageParams extends BasePage {
  name?: string
  state?: number
}

export type AuditState = 1 | 2

export interface AuditParam {
  idList: number[]
  auditResult: AuditState
  auditNote?: string
}

export interface CollectResourceParam {
  collectId?: number
  resId: number
}
