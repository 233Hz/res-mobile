/**
 * 格式化资源大小
 * @param size number 资源大小
 * @returns
 */
export const formatFileSize = (size: number) => {
  return size < 1048576
    ? `${(size / 1024).toFixed(2)}KB`
    : `${(size / 1024 / 1024).toFixed(2)}MB`
}

/**
 * 格式化时间
 * @param time string 时间字符串
 * @param format YYYY-MM-DD hh:mm:ss 格式化格式
 * @returns
 */
export const formatDate = (
  time: string,
  format: string = 'YYYY-MM-DD hh:mm:ss'
) => {
  if (!time || time.length < 1) return null
  const date = new Date(time)

  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  const preArr = Array(10)
    .fill(null)
    .map((item, index) => (index < 10 ? '0' : '') + index)

  return format
    .replace(/YYYY/g, String(year))
    .replace(/MM/g, preArr[month] || String(month))
    .replace(/DD/g, preArr[day] || String(day))
    .replace(/hh/g, preArr[hour] || String(hour))
    .replace(/mm/g, preArr[minute] || String(minute))
    .replace(/ss/g, preArr[second] || String(second))
}

export const validata = (
  rules: FormRules,
  obj: Record<string, any>
): ValidataResult => {
  for (const key in rules) {
    const rule = rules[key]
    if (rule && rule.length) {
      for (let j = 0; j < rule.length; j++) {
        const ruleItem = rule[j] || {}
        console.log(obj[key])

        if (ruleItem.required && !obj[key])
          return {
            valid: false,
            message: ruleItem.message || '验证失败'
          }
        if (ruleItem.validator) {
          const validataResult = ruleItem.validator(obj[key])
          if (validataResult && !validataResult.valid) return validataResult
        }
      }
    }
  }
  return {
    valid: true,
    message: '验证通过'
  }
}
