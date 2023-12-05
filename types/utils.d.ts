declare global {
  type _Optional<T, K> = Omit<T, K> & Partial<Pick<T, K>>
}

export {}
