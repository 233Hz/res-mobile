import { request } from '@/utils/request'
import type { Category } from 'types/category'

/**
 * 查询所有分类
 */
export const allCategoryApi = () =>
  request<Category[]>({
    url: '/resourceSort/all',
    method: 'GET'
  })
