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

export interface Register {
  oid: number
  userName: string
  phone: string
  sex: number
  idCard: string
  email: string
  workOrg: string
  address: string
}

export type ApplyRegister = Omit<Register, 'oid' | 'address'> &
  _Optional<Register, 'address'>
