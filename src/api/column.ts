import { request } from '@/utils/request'
import type { ColumnTree } from 'types/column'

/** 获取栏目树 */
export const columnTreeApi = () =>
  request<ColumnTree[]>({
    url: '/nav/all',
    method: 'GET'
  })
