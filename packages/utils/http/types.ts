import type { AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from 'axios'

/**
 * 请求选项
 */
export interface RequestOptions {
  // 是否显示错误提示
  isShowErrorMessage?: boolean
  // 是否转换请求结果
  isTransformRequestResult?: boolean
  // 是否加入时间戳
  joinTime?: boolean
  // 格式化日期
  formatDate?: boolean
  // 错误提示方式
  errorMessageMode?: 'message' | 'modal' | 'none'
  // 成功提示
  successMessage?: string
  // 是否显示成功提示
  isShowSuccessMessage?: boolean
}

/**
 * 请求结果
 */
export interface Result<T = any> {
  code: number
  data: T
  message: string
  success: boolean
}

/**
 * 上传文件参数
 */
export interface UploadFileParams {
  // 其他参数
  data?: Record<string, any>
  // 文件对象的字段名
  name?: string
  // 文件
  file: File | Blob
  // 文件名
  filename?: string
}

/**
 * 上传文件配置
 */
export interface UploadFileConfig {
  // 是否携带 token
  withToken?: boolean
  // 上传进度回调
  onUploadProgress?: (progressEvent: any) => void
}
