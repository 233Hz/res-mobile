export interface ColumnTree {
  id: number
  title: string
  grade: number
  children?: ColumnTree[]
}
