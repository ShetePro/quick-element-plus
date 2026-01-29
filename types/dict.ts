/**
 * 字典项类型
 */
export interface DictItem {
  label: string
  value: string | number
  [key: string]: any
}

/**
 * 字典数据类型
 */
export type DictData = DictItem[]
