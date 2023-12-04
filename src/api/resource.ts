import { request } from '@/utils/request'
import type {
  AuditParam,
  CollectResourceParam,
  Resource,
  ResourceAuthPageParams,
  ResourceData,
  ResourceNewOrderData,
  ResourcePageParams
} from 'types/resource'

/**
 * 最新资源 分页
 */
export const resourceNewOrderApi = (data?: ResourceNewOrderData) =>
  request<Resource[]>({
    url: '/resourceData/listForIndexNew',
    method: 'POST',
    data: data || {}
  })

/**
 * 最热资源 分类
 */
export const resourceHotOrderApi = () =>
  request<Resource[]>({
    url: '/resourceData/listForIndexHot',
    method: 'GET'
  })

/**
 * 资源中心 分页
 */
export const pageResourceApi = (params?: ResourcePageParams) =>
  request<PageResult<Resource>>({
    url: '/resourceData/listResByPage',
    method: 'GET',
    data: params
  })

/**
 * 上传资源
 */
export const uploadResourceApi = (data: ResourceData) =>
  request<boolean>({
    url: '/resourceData/submit',
    method: 'POST',
    data
  })

/**
 * 根据权限分页查询
 */
export const pageResourceAuthApi = (params?: ResourceAuthPageParams) =>
  request<PageResult<Resource>>({
    url: '/resourceData/listByUserPage',
    method: 'GET',
    data: params
  })

/**根据id获取资源信息 */
export const getResourceByIdApi = (id: number) =>
  request<Resource>({
    url: '/resourceData/view/' + id,
    method: 'GET'
  })

/**
 * 下架资源
 */
export const revokeResourceApi = (idList: number[]) =>
  request<boolean>({
    url: '/resourceData/draft',
    method: 'POST',
    data: idList
  })

/**
 * 删除资源
 */
export const delResourceApi = (idList: number[]) =>
  request<boolean>({
    url: '/resourceData/del',
    method: 'POST',
    data: idList
  })

/**
 * 待我审核（分页）
 */
export const pageAuditForMeApi = (params: ResourceAuthPageParams) =>
  request<PageResult<Resource>>({
    url: '/auditRecord/listMyAuditRecordByPage',
    method: 'GET',
    data: params
  })

/**
 * 审核历史（分页）
 */
export const pageAuditHistoryApi = (params: ResourceAuthPageParams) =>
  request<PageResult<Resource>>({
    url: '/auditRecord/listAuditRecordByPage',
    method: 'GET',
    data: params
  })

/**
 *  审核通过/不通过
 */
export const auditPassRefuseApi = (data: AuditParam) =>
  request<boolean>({
    url: '/auditRecord/audit',
    method: 'POST',
    data
  })

/**
 * 下载记录 分页
 */
export const pageResourceForDownApi = (params?: BasePage) =>
  request<PageResult<Resource>>({
    url: '/download/listByPage',
    method: 'GET',
    data: params
  })

/**
 * 收藏资源
 */
export const collectResourceApi = (data: CollectResourceParam) =>
  request<number>({
    url: '/userCollect/collect',
    method: 'POST',
    data
  })
