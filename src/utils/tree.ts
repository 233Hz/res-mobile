/**
 * 树形结构转换
 */

export function convertNode<T extends Record<string, any>, K>(
  tree: T[],
  cb: (item: T) => K,
  childrenKey: keyof T = 'children' as keyof T
): K[] {
  function convert(innerNode: T): K {
    const convertedNode: K = cb(innerNode)

    if (innerNode[childrenKey] && Array.isArray(innerNode[childrenKey])) {
      convertedNode[childrenKey as keyof K] = innerNode[childrenKey].map(
        convert
      ) as any
    }

    return convertedNode
  }

  return tree.map(convert)
}

/**
 * 查找节点
 */
export function findNode<T extends Record<string, any>>(
  tree: T[],
  compareFn: (node: T) => boolean,
  childrenKey: keyof T = 'children' as keyof T
): T | null {
  for (const node of tree) {
    if (compareFn(node)) {
      return node
    }

    if (node[childrenKey]) {
      const found = findNode(node[childrenKey], compareFn, childrenKey)
      if (found) {
        return found
      }
    }
  }

  return null
}
