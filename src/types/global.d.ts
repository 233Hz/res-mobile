export interface PageResult<T> {
  total: number
  current: number
  size: number
  records: T[]
}
