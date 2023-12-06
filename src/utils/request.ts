const baseUrl = import.meta.env.VITE_BASE_API
import { useAuthStoreHook } from '@/store'
import createPopup from './popup'

// 添加拦截器
const httpInterceptor = {
  // 拦截前触发
  invoke(options: UniApp.RequestOptions) {
    // 非 http 开头拼接地址
    if (!options.url?.startsWith('http')) {
      options.url = baseUrl + options.url
    }
    // 请求超时，默认60s
    options.timeout = 1000 * 60
    // 添加小程序端请求表头
    options.header = {
      ...options.header,
      'source-client': 'miniapp'
    }
    const authStore = useAuthStoreHook()
    if (authStore.hasToken()) {
      options.header[authStore.tokenKey as string] = authStore.tokenValue
    }
  }
}
uni.addInterceptor('request', httpInterceptor)
uni.addInterceptor('uploadFile', httpInterceptor)

export const request = <T>(
  options: UniApp.RequestOptions
): Promise<RequestResult<T>> => {
  return new Promise((resolve, reject) => {
    uni.request({
      ...options,
      // 请求成功
      success(res) {
        const { code, msg } = res.data as RequestResult<any>
        if (code === 11012) {
          createPopup({
            type: 'info',
            content: '身份信息已过期, 请重新登录',
            onConfirm: () => {
              useAuthStoreHook().clearToken()
              uni.redirectTo({ url: '/pages/login/login' })
              location.reload()
            }
          })
        } else if (code === 0) resolve(res.data as RequestResult<T>)
        else {
          uni.showToast({
            title: msg,
            icon: 'error'
          })
          reject(msg)
        }
      },
      // 请求失败
      fail(err) {
        uni.showToast({
          title: '网络错误，请稍后重试',
          icon: 'none'
        })
        reject(err)
      }
    })
  })
}

export const download = async (
  options: UniApp.RequestOptions,
  fileName?: string
): Promise<void> => {
  return new Promise((resolve, reject) => {
    uni.request({
      ...options,
      responseType: 'blod',
      success(response: UniApp.RequestSuccessCallbackResult) {
        // 提取文件名
        const _fileName =
          fileName ||
          response.header['content-disposition'].match(/filename=(.*)/)[1]
        // 将二进制流转为blob
        const blob = new Blob([response.data as ArrayBuffer], {
          type: 'application/octet-stream'
        })

        // 创建新的URL并指向File对象或者Blob对象的地址
        const blobURL = window.URL.createObjectURL(blob)
        // 创建a标签，用于跳转至下载链接
        const tempLink = document.createElement('a')
        tempLink.style.display = 'none'
        tempLink.href = blobURL
        tempLink.setAttribute('download', decodeURI(_fileName))
        // 兼容：某些浏览器不支持HTML5的download属性
        if (typeof tempLink.download === 'undefined') {
          tempLink.setAttribute('target', '_blank')
        }
        // 挂载a标签
        document.body.appendChild(tempLink)
        tempLink.click()
        document.body.removeChild(tempLink)
        // 释放blob URL地址
        window.URL.revokeObjectURL(blobURL)
        resolve()
      },
      // 请求失败
      fail() {
        uni.showToast({
          title: '下载失败',
          icon: 'none'
        })
        reject()
      }
    })
  })
}
