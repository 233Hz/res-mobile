import { request } from '@/utils/request'
import type { AllLinkParams, Link } from 'types/links'

/**
 * 查询所有
 */
export const allLinkApi = (params?: AllLinkParams) =>
  request<Link[]>({
    url: '/links/all',
    method: 'POST',
    data: {
      linkType: 2,
      limitNum: 10,
      ...params
    }
  })
