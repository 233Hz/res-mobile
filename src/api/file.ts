import { download } from '@/utils/request'

/**
 * 文件上传 需传mark
 */
export const uploadFileUrl = '/upload/uploadFile'

/**
 * 文件上传 无需传mark
 */
export const uploadFilePlusUrl = '/upload/uploadRes'

/**
 * 文件批量上传
 */
export const uploadFileProMaxUrl = '/resourceData/uploadFile'

/**
 * 图片上传
 */
export const uploadPictureUrl = '/upload/uploadPic'

/**
 * 获取完整的资源url
 */
export const resUrl = (url: string) => import.meta.env.VITE_RES_URL + url

/**
 * 获取下载资源路径
 */
export const downloadUrl = (url: string) => import.meta.env.VITE_BASE_API + url

export const downloadRes = (id: number) =>
  download({
    url: '/download/download/' + id,
    method: 'GET'
  })
