export interface BannerItem {
  id: number
  imgUrl: string
  hrefUrl: string
}

export interface CategoryItem {
  id: number
  iconUrl: string
  hrefUrl: string
  name: string
  count: number
}

export interface ResourcesItem {
  id: number
  title: string
  category: string
  unit: string
  issuer: string
  releaseTime: string
  countView: number
}
