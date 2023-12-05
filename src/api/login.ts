import { request } from '@/utils/request'
import type { ApplyRegister, LoginData, UserPermissionVO } from 'types/login'

/** 登入 */
export const loginApi = (data: LoginData) =>
  request<void>({
    url: '/login',
    method: 'POST',
    data
  })

/**
 * 获取用户权限
 */
export const getPermissionApi = () =>
  request<UserPermissionVO>({
    url: '/user/getUserPermission',
    method: 'GET'
  })

/**
 * 注册申请
 */
export const registerApi = (data: ApplyRegister) =>
  request({
    url: '/regApply/save',
    method: 'POST',
    data
  })
