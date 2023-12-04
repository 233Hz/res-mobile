export interface LoginData {
  loginName: string
  pwd: string
}

export interface UserInfo {
  userId: number
  userName: string
  userType: number
}

export interface UserPermissionVO {
  userInfo: UserInfo
  menuList: Menu[]
  roleList: string[]
}
