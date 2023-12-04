export interface Link {
  oid: number
  linkName?: string
  linkType: number
  linkUrl?: string
  linkPic?: string
  createUser?: number
  createTime: Date
}

export interface AllLinkParams {
  linkType?: number
  limitNum?: number
}
