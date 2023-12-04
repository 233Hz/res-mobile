export interface User {
  oid: number
  loginName?: string
  password?: string
  userName?: string
  mobile?: string
  deptId?: number
  sex?: number
  idCard?: string
  userType?: number
  teacherType?: number
  email?: string
  address?: string
  state?: number
  createUser?: number
  createTime: Date
  updateTime: Date
  roleIdList?: number[]
  roleNames?: string[]
  deptName?: string
}

export type UpdateUserInfoData = Pick<User, 'oid'> &
  Partial<
    Pick<User, 'userName' | 'mobile' | 'email' | 'address' | 'idCard' | 'sex'>
  >

export interface UpdatePasswordData {
  opwd: string
  npwd: string
  rpwd: string
}
