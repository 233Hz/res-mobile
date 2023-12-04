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
