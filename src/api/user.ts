import { request } from '@/utils/request'
import type { UpdatePasswordData, UpdateUserInfoData, User } from 'types/user'

/**
 * 查询当前用户信息
 */
export const getUserInfoApi = () =>
  request<User>({
    url: '/user/info',
    method: 'GET'
  })

/**
 * 修改个人信息
 */
export const updateSelfInfoApi = (data: UpdateUserInfoData) =>
  request({
    url: '/user/update',
    method: 'POST',
    data
  })

/**
 * 修改密码
 */
export const updatePasswordApi = (data: UpdatePasswordData) =>
  request({
    url: '/user/updatePwd',
    method: 'POST',
    data
  })
