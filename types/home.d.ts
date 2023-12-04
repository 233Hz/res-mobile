import type { ColumnTree } from './column'

export interface BannerItem {
  id: number
  imgUrl: string
  hrefUrl: string
}

export type ColumnItem = Omit<ColumnTree, 'grade' | 'children'>
