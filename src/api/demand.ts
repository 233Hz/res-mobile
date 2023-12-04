import { request } from '@/utils/request'
import type {
  Demand,
  DemandData,
  DemandPageParam,
  DemandReply,
  DemandReplyData
} from 'types/demand'

/**
 * 分页查询
 */
export const pageDemandeForUserApi = (params?: DemandPageParam) =>
  request<PageResult<Demand>>({
    url: '/resourceReq/listByUserPage',
    method: 'GET',
    data: params
  })

/**
 * 通过id查询
 */
export const getDemandByIdApi = (id: number) =>
  request<Demand>({
    url: '/resourceReq/info/' + id,
    method: 'GET'
  })

/**
 * 添加/修改
 */
export const saveDemandApi = (data: DemandData) =>
  request({
    url: '/resourceReq/save',
    method: 'POST',
    data
  })

/**
 * 删除
 */
export const delDemandApi = (idList: number[]) =>
  request({
    url: '/resourceReq/del',
    method: 'POST',
    data: idList
  })

/**
 * 需求回复前100条
 */
export const demandReplyListApi = (id: number) =>
  request<DemandReply[]>({
    url: '/reqReply/listByResoureId/' + id,
    method: 'GET'
  })

/**
 * 回复需求
 */
export const saveDemandReplyApi = (data: DemandReplyData) =>
  request({
    url: '/reqReply/save',
    method: 'POST',
    data
  })

/**
 * 删除回复
 */
export const delDemandReplyApi = (id: number) =>
  request({
    url: '/reqReply/del/' + id,
    method: 'POST'
  })
