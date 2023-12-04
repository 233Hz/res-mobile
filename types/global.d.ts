declare global {
  interface ViteEnv {
    VITE_BASE_API: string
    VITE_UPLOAD_BASE_API: string
  }

  interface TokenInfo {
    tokenName: string
    tokenValue: string
    isLogin: boolean
    loginId: string
    loginType: string
    tokenTimeout: number
    sessionTimeout: number
    tokenSessionTimeout: number
    tokenActiveTimeout: number
    loginDevice: string
    tag?: unknown
  }

  interface RequestResult<T> {
    code: number
    msg: string
    data: T
    tokenInfo?: TokenInfo
  }

  interface PageResult<T> {
    records: T[]
    total: number
    size: number
    current: number
    orders: any[]
    optimizeCountSql: boolean
    searchCount: boolean
    countId?: number
    maxLimit?: number
    pages: number
  }

  interface BasePage {
    current: number
    size: number
  }

  interface ValidataResult {
    valid: boolean
    message?: string
  }

  interface FormRuleItem<T> {
    required?: boolean
    message?: string
    validator?: (value: T) => ValidataResult | undefined
  }
  type FormRules<T = Record<string, any>> = {
    [P in keyof T]?: FormRuleItem<T[P]>[]
  }
}

export {}
