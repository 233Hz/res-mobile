import { request } from '@/utils/request'
import type { Notify, NotifyPageParams } from 'types/notify'

/**
 * 首页通知
 */
export const notifyForHomeApi = (limit = 10) =>
  request<Notify[]>({
    url: '/notice/top/' + limit,
    method: 'GET'
  })

/**
 * 分页
 */
export const notifyPageApi = (params: NotifyPageParams) =>
  request<PageResult<Notify>>({
    url: '/notice/listByPage',
    method: 'GET',
    data: params
  })

/**
 * 根据id查询
 */
export const getNotifyByIdApi = (id: number) =>
  request<Notify>({
    url: '/notice/info/' + id,
    method: 'GET'
  })
